import {
  Button,
  Dialog,
  Field,
  Fieldset,
  Input,
  Portal,
  Switch,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { putServiceCenter } from "@/lib/api/tasks";
import { useEffect, useRef } from "react";
import { mapServiceCenterNameError } from "@/util/map-errors";
import { ACCENT_COLOR } from "@/constants/ui";

export function ServiceCentersDialogEdit({
  isEditDialogOpen,
  setEditDialogOpen,
  serviceCenterInfo,
  updateServiceCenterInfo,
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
      (serviceCenterInfo && {
        name: serviceCenterInfo.name,
        published: serviceCenterInfo.published,
      }) ||
      {},
  });

  useEffect(() => {
    if (serviceCenterInfo) {
      reset({
        name: serviceCenterInfo.name,
        published: serviceCenterInfo.published,
      });
    }
  }, [serviceCenterInfo, reset]);

  const nameError = errors?.name?.message;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await putServiceCenter(
        session.accessToken,
        serviceCenterInfo.id,
        data
      );
      updateServiceCenterInfo(response.id, response);
      setEditDialogOpen(false);
      reset();
    } catch (error) {
      const responseNameError = error?.data?.name[0];
      if (responseNameError) {
        setError("name", {
          message: mapServiceCenterNameError(responseNameError),
        });
      } else {
        console.log(error);
      }
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
              <Dialog.Title textStyle="2xl">
                Изменить сервисный центр
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Fieldset.Root>
                <Fieldset.Content gap="6">
                  <Field.Root invalid={nameError}>
                    <Field.Label>Название</Field.Label>
                    <Input
                      {...register("name", {
                        required: "Введите название",
                      })}
                      placeholder="ТЦ Avenue, м. Юго-Западная"
                    />
                    <Field.ErrorText>{nameError}</Field.ErrorText>
                  </Field.Root>

                  <Controller
                    name="published"
                    control={control}
                    render={({ field }) => (
                      <Field.Root>
                        <Switch.Root
                          name={field.name}
                          checked={field.value}
                          onCheckedChange={({ checked }) =>
                            field.onChange(checked)
                          }
                          gap="4"
                          colorPalette={ACCENT_COLOR}
                        >
                          <Switch.HiddenInput onBlur={field.onBlur} />
                          <Switch.Control />
                          <Switch.Label>Доступен</Switch.Label>
                        </Switch.Root>
                      </Field.Root>
                    )}
                  />
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
