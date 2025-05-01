import { useState } from "react";
import { SignInForm } from "./sign-in-form";
import { AUTH_TYPES } from "@/constants/auth-types";
import { SignUpForm } from "./sign-up-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

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

  const handleToggleForm = () => {
    setAuthType(
      authType === AUTH_TYPES.SIGN_IN ? AUTH_TYPES.SIGN_UP : AUTH_TYPES.SIGN_IN
    );
    resetLoginForm();
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
    <SignUpForm handleToggleForm={handleToggleForm} />
  );
}
