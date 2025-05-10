import { PasswordInput } from "@/components/ui/password-input";
import { ACCENT_COLOR, SETTINGS_ACTION_BUTTON_VARIANT } from "@/constants/ui";
import { patchUser } from "@/lib/api/user";
import { Button, Dialog, Field, Fieldset, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

function mapPasswordError(error) {
  return "Ошибка при сохранении пароля";
}

export function SettingsActionChangePassword({ session }) {
  // const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isValid, errors },
  } = useForm({ mode: "onSubmit" });

  const passwordError = errors?.password?.message;
  const repeatedPasswordError = errors?.repeatedPassword?.message;

  const onSubmit = handleSubmit(async (data) => {
    const password = data.password;
    const repeatedPassword = data.repeatedPassword;

    if (password !== repeatedPassword) {
      setError("repeatedPassword", {
        message: "Пароли не совпадают",
      });
      return;
    }

    try {
      await patchUser(session.accessToken, session.user.id, {
        password,
      });
      // TODO: Рефактор аутентификации, сделать получение user из БД, можно будет убрать из JWT всё кроме ID
      // router.refresh();
      setOpen(false);
      reset();
    } catch (error) {
      const responsePasswordError = error?.data?.password[0];
      if (responsePasswordError) {
        setError("password", {
          message: mapPasswordError(responsePasswordError),
        });
      } else {
        console.log(error);
      }
    }
  });

  return (
    <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button size="sm" variant={SETTINGS_ACTION_BUTTON_VARIANT}>
          Сменить пароль
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content as="form" onSubmit={onSubmit}>
            <Dialog.Header>
              <Dialog.Title textStyle="2xl">Сменить пароль</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Fieldset.Root>
                <Fieldset.Content>
                  <Field.Root invalid={passwordError}>
                    <Field.Label>Новый пароль</Field.Label>
                    <PasswordInput
                      {...register("password", {
                        required: "Введите пароль",
                      })}
                      placeholder="qwerty123"
                    />
                    <Field.ErrorText>{passwordError}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={repeatedPasswordError}>
                    <Field.Label>Повторите пароль</Field.Label>
                    <PasswordInput
                      {...register("repeatedPassword", {
                        required: "Повторите новый пароль",
                      })}
                      placeholder="qwerty123"
                    />
                    <Field.ErrorText>{repeatedPasswordError}</Field.ErrorText>
                  </Field.Root>
                </Fieldset.Content>
              </Fieldset.Root>
            </Dialog.Body>
            <Dialog.Footer pb="8">
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={() => reset()}>
                  Отменить
                </Button>
              </Dialog.ActionTrigger>
              <Button type="submit" colorPalette={ACCENT_COLOR} disabled={!isValid}>
                Сменить пароль
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
