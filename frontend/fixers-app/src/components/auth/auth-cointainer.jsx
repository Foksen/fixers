import { useState } from "react";
import { SignInForm } from "./sign-in-form";
import { AUTH_TYPES } from "@/constants/auth-types";
import { SignUpForm } from "./sign-up-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerUser } from "@/lib/api/auth";
import { toaster } from "../ui/toaster";

function convertAuthErrorMsg(message) {
  if (message == null) {
    return "Неизвестная ошибка";
  }
  if (message.includes("user with that username already exists")) {
    return "Указанное имя уже занято";
  }
  if (message.includes("user with this email already exists")) {
    return "Указананя почта уже занята";
  }
  return message;
}

export function AuthContainer() {
  const router = useRouter();

  const [authType, setAuthType] = useState(AUTH_TYPES.SIGN_IN);
  const [isLoginSubmitLoading, setIsLoginSubmitLoading] = useState(false);

  const {
    register: loginForm,
    handleSubmit: handleSubmitLogin,
    setError: setLoginError,
    reset: resetLoginForm,
    formState: { errors: loginErrors, isValid: isLoginValid },
  } = useForm({
    mode: "onSubmit",
  });

  const {
    register: registerForm,
    handleSubmit: handleSubmitRegister,
    setError: setRegisterError,
    reset: resetRegisterForm,
    formState: { errors: registerErrors, isValid: isRegisterValid },
  } = useForm({
    mode: "onChange",
  });

  const onLoginSubmit = handleSubmitLogin(async (data) => {
    setIsLoginSubmitLoading(true);

    const email = data.email;
    const password = data.password;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      router.push("/profile");
    } else {
      if (result?.status == 401) {
        setLoginError("root", {
          type: result?.status,
          message: "Почта не найдена или неверный пароль",
        });
      } else {
        console.error(
          "Authentication failed with unknown error",
          result?.error
        );
        setLoginError("root", {
          type: result?.status,
          message: "Неизвестная ошибка",
        });
      }
      setIsLoginSubmitLoading(false);
    }
  });

  const onRegisterSubmit = handleSubmitRegister(async (data) => {
    const username = data.username;
    const email = data.email;
    const password = data.password;
    const repeatedPassword = data.repeatedPassword;

    if (password !== repeatedPassword) {
      setRegisterError("repeatedPassword", {
        message: "Пароли не совпадают",
      });
      return;
    }

    try {
      await registerUser({ email, username, password });
      resetRegisterForm();
      setAuthType(AUTH_TYPES.SIGN_IN);
      toaster.create({
        description: "Вы успешно зарегистрировались! Теперь можете войти",
        type: "success",
        duration: 5000,
      });
    } catch (error) {
      console.error("Registration failed with unknown error");
      console.log(error.data);

      const usernameErrors = error?.data?.username;
      const emailErrors = error?.data?.email;
      const passwordErrors = error?.data?.password;

      if (usernameErrors) {
        setRegisterError("username", {
          message: convertAuthErrorMsg(usernameErrors[0]),
        });
      }

      if (emailErrors) {
        setRegisterError("email", {
          message: convertAuthErrorMsg(emailErrors[0]),
        });
      }

      if (passwordErrors) {
        setRegisterError("password", {
          message: "Пароль должен быть от 8 до 16 символов",
        });
      }

      if (!(usernameErrors || emailErrors || passwordErrors)) {
        setRegisterError("root", {
          message: "Неизвестная ошибка",
        });
      }
    }
  });

  const handleToggleForm = () => {
    setAuthType(
      authType === AUTH_TYPES.SIGN_IN ? AUTH_TYPES.SIGN_UP : AUTH_TYPES.SIGN_IN
    );
    resetLoginForm();
    resetRegisterForm();
  };

  return authType === AUTH_TYPES.SIGN_IN ? (
    <SignInForm
      handleToggleForm={handleToggleForm}
      login={loginForm}
      onSubmit={onLoginSubmit}
      errors={loginErrors}
      isValid={isLoginValid}
      isLoginSubmitLoading={isLoginSubmitLoading}
      handleGoogleSignIn={() => signIn("google", { callbackUrl: "/profile" })}
      handleGitHubSignIn={() => signIn("github", { callbackUrl: "/profile" })}
    />
  ) : (
    <SignUpForm
      handleToggleForm={handleToggleForm}
      register={registerForm}
      onSubmit={onRegisterSubmit}
      errors={registerErrors}
      isValid={isRegisterValid}
    />
  );
}
