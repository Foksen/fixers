import { useState } from "react";
import { SignInForm } from "./sign-in-form";
import { AUTH_PAGE } from "@/constants/auth-types";
import { SignUpForm } from "./sign-up-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerUser } from "@/lib/api/auth";
import { toaster } from "../ui/toaster";
import { mapCredentialsError } from "@/util/map-errors";

export function AuthContainer() {
  const router = useRouter();

  const [authType, setAuthType] = useState(AUTH_PAGE.SIGN_IN);
  const [isLoginSubmitLoading, setIsLoginSubmitLoading] = useState(false);
  const [isLogin2faOpen, setIsLogin2faOpen] = useState(false);

  const {
    register: loginForm,
    handleSubmit: handleSubmitLogin,
    setError: setLoginError,
    reset: resetLoginForm,
    resetField: resetLoginField,
    control: loginControl,
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
    mode: "onSubmit",
  });

  const onLoginSubmit = handleSubmitLogin(async (data) => {
    setIsLoginSubmitLoading(true);

    const email = data.email;
    const password = data.password;
    const code = data.code?.join("");

    if (!code) {
      setIsLogin2faOpen(false);
    }

    const params = {
      redirect: false,
      email,
      password,
    };
    if (code) {
      params.code = code;
    }

    const result = await signIn("credentials", {
      ...params,
    });

    if (result?.ok) {
      router.push("/profile");
    } else {
      const errorData = JSON.parse(decodeURIComponent(result.error)).data;

      const emailError = errorData?.email;
      const passwordError = errorData?.password;
      const errorDetail = errorData?.detail;

      var isProblemDetected = false;

      if (emailError) {
        setLoginError("email", {
          type: result?.status,
          message: "Введите корректную почту",
        });
        isProblemDetected = true;
      }

      if (passwordError) {
        setLoginError("password", {
          type: result?.status,
          message: "Введите корректный пароль",
        });
        isProblemDetected = true;
      }

      switch (errorDetail) {
        case "Invalid credentials":
          setLoginError("root", {
            type: result?.status,
            message: "Почта не найдена или неверный пароль",
          });
          isProblemDetected = true;
          break;
        case "2fa_required":
          setIsLogin2faOpen(true);
          isProblemDetected = true;
          break;
        case "No code generated":
          setLoginError("root", {
            type: result?.status,
            message:
              "Не удалось сгенерировать код для двухфакторной аутентификации. Попробуйте войти позднее",
          });
          isProblemDetected = true;
          break;
        case "Invalid code":
          setLoginError("code", {
            type: result?.status,
            message: "Неверный код",
          });
          isProblemDetected = true;
          break;
      }

      if (!isProblemDetected) {
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
      setAuthType(AUTH_PAGE.SIGN_IN);
      toaster.create({
        description: "Вы успешно зарегистрировались! Теперь можете войти",
        type: "success",
        duration: 5000,
      });
    } catch (error) {
      console.error("Registration failed with unknown error");

      const usernameErrors = error?.data?.username;
      const emailErrors = error?.data?.email;
      const passwordErrors = error?.data?.password;

      if (usernameErrors) {
        setRegisterError("username", {
          message: mapCredentialsError(usernameErrors[0]),
        });
      }

      if (emailErrors) {
        setRegisterError("email", {
          message: mapCredentialsError(emailErrors[0]),
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
      authType === AUTH_PAGE.SIGN_IN ? AUTH_PAGE.SIGN_UP : AUTH_PAGE.SIGN_IN
    );
    resetLoginForm();
    resetRegisterForm();
  };

  return authType === AUTH_PAGE.SIGN_IN ? (
    <SignInForm
      handleToggleForm={handleToggleForm}
      login={loginForm}
      loginControl={loginControl}
      resetField={resetLoginField}
      onSubmit={onLoginSubmit}
      errors={loginErrors}
      isValid={isLoginValid}
      isLoginSubmitLoading={isLoginSubmitLoading}
      handleGoogleSignIn={() => signIn("google", { callbackUrl: "/profile" })}
      handleGitHubSignIn={() => signIn("github", { callbackUrl: "/profile" })}
      isLogin2faOpen={isLogin2faOpen}
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
