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
import { useState, useRef } from "react";
import { createServiceCenter } from "@/lib/api/tasks";
import { mapServiceCenterNameError } from "@/util/map-errors";
import { ACCENT_COLOR } from "@/constants/ui";

export function ServiceCentersActionCreate({ session, addServiceCenterInfo }) {
  const headerRef = useRef(null);

  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { isValid, errors },
  } = useForm({ mode: "onSubmit", defaultValues: { published: true } });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await createServiceCenter(session.accessToken, {
        name: data.name,
        published: data.published,
      });
      addServiceCenterInfo({
        id: response.id,
        name: response.name,
        published: response.published,
        tasks_count: 0,
      });
      setOpen(false);
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

  const nameError = errors?.name?.message;

  return (
    <Dialog.Root
      initialFocusEl={() => headerRef.current}
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Dialog.Trigger asChild>
        <Button colorPalette={ACCENT_COLOR}>Создать сервисный центр</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content as="form" onSubmit={onSubmit}>
            <Dialog.Header ref={headerRef} tabIndex="-1" outline="none">
              <Dialog.Title textStyle="2xl">
                Создание сервисного центра
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
                Создать
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
