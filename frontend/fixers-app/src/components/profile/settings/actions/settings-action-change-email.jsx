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

function mapEmailError(error) {
  console.log(error);
  const errorLc = error.toLowerCase();
  if (errorLc.includes("user with this email already exists")) {
    return "Пользователь с такой почтой уже существует";
  }
  if (errorLc.includes("enter a valid email")) {
    return "Введена некорректная почта";
  }
  return "Ошибка при сохранении почты";
}

export function SettingsActionChangeEmail({ session, setEmail }) {
  // const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isValid, errors },
  } = useForm({ mode: "onSubmit" });

  const emailError = errors?.email?.message;

  const onSubmit = handleSubmit(async (data) => {
    const email = data.email;

    try {
      await patchUser(session.accessToken, session.user.id, {
        email,
      });
      // TODO: Рефактор аутентификации, сделать получение user из БД, можно будет убрать из JWT всё кроме ID
      // router.refresh();
      setEmail(email);
      setOpen(false);
      reset();
    } catch (error) {
      const responseEmailError = error?.data?.email[0];
      if (responseEmailError) {
        setError("email", {
          message: mapEmailError(responseEmailError),
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
          Сменить почту
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content as="form" onSubmit={onSubmit}>
            <Dialog.Header>
              <Dialog.Title textStyle="2xl">Сменить почту</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Fieldset.Root>
                <Fieldset.Content>
                  <Field.Root invalid={emailError}>
                    <Field.Label>Новая почта</Field.Label>
                    <Input
                      {...register("email", {
                        required: "Введите почту",
                      })}
                      placeholder="email@example.com"
                    />
                    <Field.ErrorText>{emailError}</Field.ErrorText>
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
                Сменить почту
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
