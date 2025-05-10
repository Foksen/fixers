import {
  Button,
  Field,
  Fieldset,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import { ACCENT_COLOR } from "@/constants/ui";

export function SignUpForm({
  handleToggleForm,
  register,
  onSubmit,
  errors,
  isValid,
}) {
  const usernameError = errors?.username?.message;
  const emailError = errors?.email?.message;
  const passwordError = errors?.password?.message;
  const repeatedPasswordError = errors?.repeatedPassword?.message;

  return (
    <VStack w="md" mb="10" as="form" onSubmit={onSubmit}>
      <Heading size="3xl" mb="3">
        Регистрация
      </Heading>

      <Fieldset.Root invalid={true}>
        <Fieldset.Content>
          <Field.Root invalid={usernameError}>
            <Field.Label>Как к вам обращаться?</Field.Label>
            <Input
              name="username"
              placeholder="Сергей Иванов"
              {...register("username", {
                required: "Введите своё имя",
              })}
            />
            <Field.ErrorText>{usernameError}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={emailError}>
            <Field.Label>Почта</Field.Label>
            <Input
              name="email"
              type="email"
              placeholder="email@example.com"
              {...register("email", {
                required: "Введите свою почту",
              })}
            />
            <Field.ErrorText>{emailError}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={passwordError}>
            <Field.Label>Пароль</Field.Label>
            <PasswordInput
              name="password"
              placeholder="qwerty123"
              {...register("password", {
                required: "Введите пароль",
              })}
            />
            <Field.ErrorText>{passwordError}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={repeatedPasswordError}>
            <Field.Label>Повторите пароль</Field.Label>
            <PasswordInput
              name="repeatedPassword"
              placeholder="qwerty123"
              {...register("repeatedPassword", {
                required: "Введите пароль",
              })}
            />
            <Field.ErrorText>{repeatedPasswordError}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>

        <Button mt="8" type="submit" disabled={!isValid} colorPalette={ACCENT_COLOR}>
          Зарегистрироваться
        </Button>

        <Fieldset.ErrorText alignSelf="center">
          {errors?.root?.message}
        </Fieldset.ErrorText>
      </Fieldset.Root>

      <Text mt="4" fontWeight="medium" textStyle="sm" alignSelf="center">
        Уже есть аккаунт?&nbsp;
        <Link variant="underline" onClick={handleToggleForm}>
          Войти
        </Link>
      </Text>
    </VStack>
  );
}
