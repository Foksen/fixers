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
import { putCategory } from "@/lib/api/tasks";
import { useEffect, useRef } from "react";
import { mapCategoryNameError } from "@/util/map-errors";
import { ACCENT_COLOR } from "@/constants/ui";

export function CategoriesDialogEdit({
  isEditDialogOpen,
  setEditDialogOpen,
  categoryInfo,
  updateCategoryInfo,
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
      (categoryInfo && {
        name: categoryInfo.name,
        published: categoryInfo.published,
      }) ||
      {},
  });

  useEffect(() => {
    if (categoryInfo) {
      reset({ name: categoryInfo.name, published: categoryInfo.published });
    }
  }, [categoryInfo, reset]);

  const nameError = errors?.name?.message;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await putCategory(
        session.accessToken,
        categoryInfo.id,
        data
      );
      updateCategoryInfo(response.id, response);
      setEditDialogOpen(false);
      reset();
    } catch (error) {
      const responseNameError = error?.data?.name[0];
      if (responseNameError) {
        setError("name", {
          message: mapCategoryNameError(responseNameError),
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
              <Dialog.Title textStyle="2xl">Изменить вид ремонта</Dialog.Title>
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
                      placeholder="Замена экрана телефона"
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
