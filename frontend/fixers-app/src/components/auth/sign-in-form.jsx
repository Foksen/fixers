import {
  Button,
  ButtonGroup,
  Field,
  Fieldset,
  Heading,
  Input,
  Link,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

export function SignInForm({
  handleToggleForm,
  login,
  onSubmit,
  errors,
  isValid,
  isLoginSubmitLoading,
  handleGoogleSignIn,
  handleGitHubSignIn,
}) {
  return (
    <VStack w="md" mb="10" as="form" onSubmit={onSubmit}>
      <Heading size="3xl" mb="3">
        Вход
      </Heading>
      <Fieldset.Root invalid={errors?.root}>
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Почта</Field.Label>
            <Input
              {...login("email", {
                required: "Введите почту",
              })}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Пароль</Field.Label>
            <PasswordInput
              {...login("password", {
                required: "Введите пароль",
              })}
            />
          </Field.Root>

          <Button
            mt="8"
            type="submit"
            disabled={!isValid}
            loading={isLoginSubmitLoading || null}
            loadingText="Войти"
          >
            Войти
          </Button>
        </Fieldset.Content>

        <Fieldset.ErrorText alignSelf="center">
          {errors?.root?.message}
        </Fieldset.ErrorText>
      </Fieldset.Root>

      <Text mt="4" fontWeight="medium" textStyle="sm" alignSelf="center">
        Ещё нет аккаунта?&nbsp;
        <Link variant="underline" onClick={handleToggleForm}>
          Зарегистрироваться
        </Link>
      </Text>

      <Separator my="4" w="full" />

      <ButtonGroup grow>
        <Button variant="subtle" onClick={handleGoogleSignIn} disabled>
          <FcGoogle />
          Войти через Google
        </Button>

        <Button variant="subtle" onClick={handleGitHubSignIn} disabled>
          <FaGithub />
          Войти через GitHub
        </Button>
      </ButtonGroup>
    </VStack>
  );
}
