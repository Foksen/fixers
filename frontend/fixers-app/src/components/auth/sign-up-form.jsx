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

export function SignUpForm({ handleToggleForm }) {
  return (
    <VStack w="md" mb="10">
      <Heading size="3xl" mb="3">
        Регистрация
      </Heading>

      <Fieldset.Root>
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Ваше ФИО</Field.Label>
            <Input name="name" placeholder="Иванов Иван Иванович" />
          </Field.Root>

          <Field.Root>
            <Field.Label>Логин</Field.Label>
            <Input name="username" />
          </Field.Root>

          <Field.Root>
            <Field.Label>Почта</Field.Label>
            <Input name="email" type="email" />
          </Field.Root>

          <Field.Root>
            <Field.Label>Пароль</Field.Label>
            <PasswordInput />
          </Field.Root>
        </Fieldset.Content>

        <Button mt="8" type="submit">
          Зарегистрироваться
        </Button>
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
