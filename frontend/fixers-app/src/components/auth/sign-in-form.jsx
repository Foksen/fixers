import {
  Button,
  ButtonGroup,
  Dialog,
  Field,
  Fieldset,
  Heading,
  Input,
  Link,
  PinInput,
  Portal,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import { ACCENT_COLOR } from "@/constants/ui";

const Dialog2fa = ({ control, codeError, onSubmit, resetField }) => (
  <Dialog.Root defaultOpen={true} onExitComplete={() => resetField("code")}>
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title textStyle="2xl">Подтверждение входа</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <VStack gap="4">
              <Text>
                Для обеспечения безопасности вашего аккаунта мы отправили
                одноразовый код на вашу почту. Введите его чтобы войти
              </Text>
              <Text>
                Если письмо долго не приходит попробуйте ещё раз или обратитесь
                в службу поддержки
              </Text>
              <Field.Root
                mt="4"
                alignItems="center"
                gap="4"
                invalid={codeError}
              >
                <Controller
                  control={control}
                  name="code"
                  render={({ field }) => (
                    <PinInput.Root
                      size="xl"
                      placeholder="o"
                      value={field.value}
                      onValueChange={(e) => {
                        field.onChange(e.value);

                        const code = e.value.join("");
                        if (code.length == 6) {
                          onSubmit();
                        }
                      }}
                    >
                      <PinInput.HiddenInput />
                      <PinInput.Control>
                        <PinInput.Input index={0} />
                        <PinInput.Input index={1} />
                        <PinInput.Input index={2} />
                        <PinInput.Input index={3} />
                        <PinInput.Input index={4} />
                        <PinInput.Input index={5} />
                      </PinInput.Control>
                    </PinInput.Root>
                  )}
                />
                <Field.ErrorText>{codeError}</Field.ErrorText>
              </Field.Root>
            </VStack>
          </Dialog.Body>
          <Dialog.Footer></Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
);

export function SignInForm({
  handleToggleForm,
  login,
  loginControl,
  resetField,
  onSubmit,
  errors,
  isValid,
  isLoginSubmitLoading,
  handleGoogleSignIn,
  handleGitHubSignIn,
  isLogin2faOpen,
}) {
  const rootError = errors?.root?.message;
  const emailError = errors?.email?.message;
  const passwordError = errors?.password?.message;
  const codeError = errors?.code?.message;

  return (
    <VStack w="md" mb="10" as="form" onSubmit={onSubmit}>
      <Heading size="3xl" mb="3">
        Вход
      </Heading>
      <Fieldset.Root invalid={rootError}>
        <Fieldset.Content>
          <Field.Root invalid={emailError}>
            <Field.Label>Почта</Field.Label>
            <Input
              {...login("email", {
                required: "Введите почту",
              })}
              placeholder="email@example.com"
              type="email"
            />
            <Field.ErrorText>{emailError}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={passwordError}>
            <Field.Label>Пароль</Field.Label>
            <PasswordInput
              {...login("password", {
                required: "Введите пароль",
              })}
              placeholder="qwerty123"
            />
            <Field.ErrorText>{passwordError}</Field.ErrorText>
          </Field.Root>

          <Button
            mt="8"
            type="submit"
            disabled={!isValid}
            loading={isLoginSubmitLoading || null}
            loadingText="Войти"
            colorPalette={ACCENT_COLOR}
          >
            Войти
          </Button>
        </Fieldset.Content>

        <Fieldset.ErrorText alignSelf="center">{rootError}</Fieldset.ErrorText>
      </Fieldset.Root>

      <Text mt="4" fontWeight="medium" textStyle="sm" alignSelf="center">
        Ещё нет аккаунта?&nbsp;
        <Link variant="underline" onClick={handleToggleForm}>
          Зарегистрироваться
        </Link>
      </Text>

      {/* <Separator my="4" w="full" />

      <ButtonGroup grow>
        <Button variant="subtle" onClick={handleGoogleSignIn} disabled>
          <FcGoogle />
          Войти через Google
        </Button>

        <Button variant="subtle" onClick={handleGitHubSignIn} disabled>
          <FaGithub />
          Войти через GitHub
        </Button>
      </ButtonGroup> */}

      {isLogin2faOpen && (
        <Dialog2fa
          control={loginControl}
          codeError={codeError}
          onSubmit={onSubmit}
          resetField={resetField}
        />
      )}
    </VStack>
  );
}
