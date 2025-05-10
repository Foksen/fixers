import { ACCENT_COLOR } from "@/constants/ui";
import { createTask } from "@/lib/api/tasks";
import {
  Button,
  createListCollection,
  Dialog,
  Field,
  Fieldset,
  Portal,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";

export const TasksActionCreate = ({
  session,
  initialCategories,
  initialServiceCenters,
  filterTasks,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isValid },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    reset();

    const category = data.category[0];
    const service_center = data.serviceCenter[0];
    const description = data.description;

    const result = await createTask(session.accessToken, {
      category,
      service_center,
      description,
    });

    filterTasks();
  });

  const categories = createListCollection({
    items: initialCategories.map((item) => ({
      value: item.id,
      label: item.name,
    })),
  });

  const serviceCenters = createListCollection({
    items: initialServiceCenters.map((item) => ({
      value: item.id,
      label: item.name,
    })),
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button colorPalette={ACCENT_COLOR}>Создать заявку</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content as="form" onSubmit={onSubmit}>
            <Dialog.Header>
              <Dialog.Title textStyle="2xl">Создание заявки</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Fieldset.Root>
                <Fieldset.Content>
                  <Field.Root>
                    <Field.Label>Вид ремонта</Field.Label>

                    <Controller
                      control={control}
                      name="category"
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
                            collection={categories}
                          >
                            <Select.HiddenSelect />
                            <Select.Control>
                              <Select.Trigger>
                                <Select.ValueText placeholder="Выберите категорию" />
                              </Select.Trigger>
                              <Select.IndicatorGroup>
                                <Select.Indicator />
                              </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                              <Select.Positioner>
                                <Select.Content zIndex="popover">
                                  {categories.items.map((category) => (
                                    <Select.Item
                                      item={category}
                                      key={category.value}
                                    >
                                      {category.label}
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

                  <Field.Root>
                    <Field.Label>Сервисный центр</Field.Label>

                    <Controller
                      control={control}
                      name="serviceCenter"
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
                            collection={serviceCenters}
                          >
                            <Select.HiddenSelect />
                            <Select.Control>
                              <Select.Trigger>
                                <Select.ValueText placeholder="Выберите сервисный центр" />
                              </Select.Trigger>
                              <Select.IndicatorGroup>
                                <Select.Indicator />
                              </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                              <Select.Positioner>
                                <Select.Content zIndex="popover">
                                  {serviceCenters.items.map((serviceCenter) => (
                                    <Select.Item
                                      item={serviceCenter}
                                      key={serviceCenter.value}
                                    >
                                      {serviceCenter.label}
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

                  <Field.Root>
                    <Field.Label>Описание проблемы</Field.Label>
                    <Textarea
                      {...register("description", {
                        required: "Введите описание",
                      })}
                      placeholder="Подробно опишите что сломалось"
                      minH="20"
                    />
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
              <Dialog.ActionTrigger asChild disabled={!isValid}>
                <Button type="submit" colorPalette={ACCENT_COLOR}>
                  Создать
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
