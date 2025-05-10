import {
  Button,
  createListCollection,
  Dialog,
  Field,
  Fieldset,
  Input,
  Portal,
  Select,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { useRef, useEffect } from "react";
import { roleToView, USER_ROLE } from "@/constants/user-roles";
import { patchUser } from "@/lib/api/user";
import { mapCredentialsError } from "@/util/map-errors";
import { ACCENT_COLOR } from "@/constants/ui";

const rolesList = createListCollection({
  items: Object.values(USER_ROLE).map((role) => ({
    value: role,
    label: roleToView(role),
  })),
});

export function UsersDialogEdit({
  isEditDialogOpen,
  setEditDialogOpen,
  userInfo,
  updateUserInfo,
  session,
}) {
  const headerRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { isValid, errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues:
      (userInfo && {
        username: userInfo.username,
        email: userInfo.email,
        role: [userInfo.role],
      }) ||
      {},
  });

  useEffect(() => {
    if (userInfo) {
      reset({
        username: userInfo.username,
        email: userInfo.email,
        role: [userInfo.role],
      });
    }
  }, [userInfo, reset]);

  const usernameError = errors?.username?.message;
  const emailError = errors?.email?.message;
  const isFormInvalid = usernameError || emailError;

  const onSubmit = handleSubmit(async (data) => {
    const username = data.username;
    const email = data.email;
    const role = data.role[0];

    try {
      const response = await patchUser(session.accessToken, userInfo.id, {
        username: username,
        email: email,
        role: role,
      });
      updateUserInfo(response.id, {
        id: response.id,
        username: response.username,
        email: response.email,
        role: response.role,
      });
      setEditDialogOpen(false);
      reset();
    } catch (error) {
      const responseErrorUsername = error?.data?.username?.[0];
      const responseErrorEmail = error?.data?.email?.[0];

      if (responseErrorUsername) {
        setError("username", {
          message: mapCredentialsError(responseErrorUsername),
        });
      }

      if (responseErrorEmail) {
        setError("email", {
          message: mapCredentialsError(responseErrorEmail),
        });
      }

      console.error(error);
    }
  });

  return (
    <Dialog.Root
      lazyMount
      open={isEditDialogOpen}
      onOpenChange={(e) => setEditDialogOpen(e.open)}
      initialFocusEl={() => headerRef.current}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content as="form" onSubmit={onSubmit}>
            <Dialog.Header ref={headerRef} tabIndex="-1" outline="none">
              <Dialog.Title textStyle="2xl">Изменить пользователя</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Fieldset.Root invalid={isFormInvalid}>
                <Fieldset.Content gap="6">
                  <Field.Root invalid={usernameError}>
                    <Field.Label>Имя</Field.Label>
                    <Input
                      {...register("username", {
                        required: "Введите имя",
                      })}
                      placeholder="Сергей Иванов"
                    />
                    <Field.ErrorText>{usernameError}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={emailError}>
                    <Field.Label>Почта</Field.Label>
                    <Input
                      {...register("email", {
                        required: "Введите почту",
                      })}
                      placeholder="email@example.com"
                    />
                    <Field.ErrorText>{emailError}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Роль</Field.Label>

                    <Controller
                      control={control}
                      name="role"
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => {
                        return (
                          <Select.Root
                            name={field.name}
                            value={field.value}
                            onValueChange={({ value }) => field.onChange(value)}
                            onInteractOutside={() => field.onBlur()}
                            collection={rolesList}
                          >
                            <Select.HiddenSelect />
                            <Select.Control>
                              <Select.Trigger>
                                <Select.ValueText />
                              </Select.Trigger>
                              <Select.IndicatorGroup>
                                <Select.Indicator />
                              </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                              <Select.Positioner>
                                <Select.Content zIndex="popover">
                                  {rolesList?.items?.map((role) => (
                                    <Select.Item item={role} key={role.value}>
                                      {role.label}
                                      <Select.ItemIndicator />
                                    </Select.Item>
                                  ))}
                                </Select.Content>
                              </Select.Positioner>
                            </Portal>
                          </Select.Root>
                        );
                      }}
                    ></Controller>
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
                Изменить
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
