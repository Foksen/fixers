import { useState } from "react";
import { ACCENT_COLOR, SETTINGS_ACTION_BUTTON_VARIANT } from "@/constants/ui";
import { patchUser } from "@/lib/api/user";
import {
  Button,
  Dialog,
  Field,
  Fieldset,
  Input,
  Portal,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";

function mapUsernameError(error) {
  console.log(error);
  const errorLc = error.toLowerCase();
  if (errorLc.includes("a user with that username already exists")) {
    return "Пользователь с таким именем уже существует";
  }
  if (errorLc.includes("enter a valid username")) {
    return "Введено некорректное имя";
  }
  return "Ошибка при сохранении имени";
}

export function SettingsActionChangeUsername({ session, setUsername }) {
  // const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isValid, errors },
  } = useForm({ mode: "onSubmit" });

  const usernameError = errors?.username?.message;

  const onSubmit = handleSubmit(async (data) => {
    const username = data.username;

    try {
      await patchUser(session.accessToken, session.user.id, {
        username,
      });
      // TODO: Рефактор аутентификации, сделать получение user из БД, можно будет убрать из JWT всё кроме ID
      // router.refresh();
      setUsername(username);
      setOpen(false);
      reset();
    } catch (error) {
      const responseUsernameError = error?.data?.username[0];
      if (responseUsernameError) {
        setError("username", {
          message: mapUsernameError(responseUsernameError),
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
          Сменить имя
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content as="form" onSubmit={onSubmit}>
            <Dialog.Header>
              <Dialog.Title textStyle="2xl">Сменить имя</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Fieldset.Root>
                <Fieldset.Content>
                  <Field.Root invalid={usernameError}>
                    <Field.Label>Новое имя</Field.Label>
                    <Input
                      {...register("username", {
                        required: "Введите имя",
                      })}
                      placeholder="Сергей Иванов"
                    />
                    <Field.ErrorText>{usernameError}</Field.ErrorText>
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
                Сменить имя
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
