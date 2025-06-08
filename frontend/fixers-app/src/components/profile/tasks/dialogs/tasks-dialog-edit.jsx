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
import { useRef, useEffect } from "react";
import { TASK_STATUS } from "@/constants/tasks-status";
import { ACCENT_COLOR } from "@/constants/ui";
import { putTask } from "@/lib/api/tasks";

const statusList = createListCollection({
  items: Object.values(TASK_STATUS).map((status) => ({
    value: status,
    label: mapTaskStatusTitle(status),
  })),
});

function mapTaskStatusTitle(status) {
  switch (status) {
    case TASK_STATUS.NEW:
      return "Новая";
    case TASK_STATUS.RECEIVED:
      return "Принята";
    case TASK_STATUS.PROCESSING:
      return "В работе";
    case TASK_STATUS.COMPLETED:
      return "Завершена";
    case TASK_STATUS.CANCELED:
      return "Отменена";
    case TASK_STATUS.REJECTED:
      return "Отклонена";
    default:
      return "Неизвестно";
  }
}

const extractItems = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (data.results && Array.isArray(data.results)) return data.results;
  return [];
};

export function TasksDialogEdit({
  isEditDialogOpen,
  setEditDialogOpen,
  taskInfo,
  updateTaskInfo,
  session,
  initialCategories,
  initialServiceCenters,
  initialMasters,
  isDataLoading = false,
}) {
  const headerRef = useRef(null);
  
  const categoriesList = createListCollection({
    items: initialCategories?.map((category) => ({
      value: category.id,
      label: category.published === false ? `${category.name} (недоступно)` : category.name,
      published: category.published !== false
    })) || [],
  });

  const serviceCentersList = createListCollection({
    items: initialServiceCenters?.map((center) => ({
      value: center.id,
      label: center.published === false ? `${center.name} (недоступно)` : center.name,
      published: center.published !== false
    })) || [],
  });

  const mastersList = createListCollection({
    items: [
      { value: "null", label: "Не назначен" },
      ...(initialMasters?.map((master) => ({
        value: master.id,
        label: master.username,
        role: master.role
      })) || []),
    ],
  });

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
      (taskInfo && {
        description: taskInfo.description,
        status: [taskInfo.status],
        category: [taskInfo.category],
        service_center: [taskInfo.service_center],
        master: taskInfo.master ? [taskInfo.master] : ["null"],
      }) ||
      {},
  });

  useEffect(() => {
    if (taskInfo) {
      reset({
        description: taskInfo.description,
        status: [taskInfo.status],
        category: [taskInfo.category],
        service_center: [taskInfo.service_center],
        master: taskInfo.master ? [taskInfo.master] : ["null"],
      });
    }
  }, [taskInfo, reset]);

  const descriptionError = errors?.description?.message;
  const categoryError = errors?.category?.message;
  const serviceCenterError = errors?.service_center?.message;
  const isFormInvalid = descriptionError || categoryError || serviceCenterError;

  const onSubmit = handleSubmit(async (data) => {
    const description = data.description;
    const status = data.status[0];
    const categoryId = data.category[0];
    const serviceCenterId = data.service_center[0];
    const masterId = data.master[0] === "null" ? null : data.master[0];

    try {
      const response = await putTask(session.accessToken, taskInfo.id, {
        description: description,
        status: status,
        category: categoryId,
        service_center: serviceCenterId,
        master: masterId,
      });

      const category = initialCategories?.find(c => c.id === categoryId);
      const serviceCenter = initialServiceCenters?.find(c => c.id === serviceCenterId);
      const master = initialMasters?.find(m => m.id === masterId);

      updateTaskInfo(response.id, {
        id: response.id,
        description: response.description,
        status: response.status,
        category: response.category,
        category_name: category?.name || "",
        service_center: response.service_center,
        service_center_name: serviceCenter?.name || "",
        master: response.master,
        master_username: master?.username || null,
        modified_at: response.modified_at,
      });
      setEditDialogOpen(false);
      reset();
    } catch (error) {
      if (error?.data?.description) {
        setError("description", {
          message: error.data.description[0],
        });
      }
      if (error?.data?.category) {
        setError("category", {
          message: error.data.category[0],
        });
      }
      if (error?.data?.service_center) {
        setError("service_center", {
          message: error.data.service_center[0],
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
              <Dialog.Title textStyle="2xl">Изменить заявку</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Fieldset.Root invalid={isFormInvalid}>
                <Fieldset.Content gap="6">
                  <Field.Root invalid={descriptionError}>
                    <Field.Label>Описание</Field.Label>
                    <Textarea
                      {...register("description", {
                        required: "Введите описание",
                      })}
                      placeholder="Описание заявки"
                    />
                    <Field.ErrorText>{descriptionError}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={categoryError}>
                    <Field.Label>Вид ремонта</Field.Label>
                    <Controller
                      control={control}
                      name="category"
                      rules={{
                        required: "Выберите вид ремонта",
                      }}
                      render={({ field }) => {
                        return (
                          <Select.Root
                            name={field.name}
                            value={field.value}
                            onValueChange={({ value }) => field.onChange(value)}
                            onInteractOutside={() => field.onBlur()}
                            collection={categoriesList}
                            disabled={isDataLoading || categoriesList.items.length === 0}
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
                                  {categoriesList.items.map((category) => (
                                    <Select.Item item={category} key={category.value} disabled={!category.published}>
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
                    />
                    <Field.ErrorText>{categoryError}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={serviceCenterError}>
                    <Field.Label>Сервисный центр</Field.Label>
                    <Controller
                      control={control}
                      name="service_center"
                      rules={{
                        required: "Выберите сервисный центр",
                      }}
                      render={({ field }) => {
                        return (
                          <Select.Root
                            name={field.name}
                            value={field.value}
                            onValueChange={({ value }) => field.onChange(value)}
                            onInteractOutside={() => field.onBlur()}
                            collection={serviceCentersList}
                            disabled={isDataLoading || serviceCentersList.items.length === 0}
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
                                  {serviceCentersList.items.map((center) => (
                                    <Select.Item item={center} key={center.value} disabled={!center.published}>
                                      {center.label}
                                      <Select.ItemIndicator />
                                    </Select.Item>
                                  ))}
                                </Select.Content>
                              </Select.Positioner>
                            </Portal>
                          </Select.Root>
                        );
                      }}
                    />
                    <Field.ErrorText>{serviceCenterError}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Мастер</Field.Label>
                    <Controller
                      control={control}
                      name="master"
                      render={({ field }) => {
                        return (
                          <Select.Root
                            name={field.name}
                            value={field.value}
                            onValueChange={({ value }) => field.onChange(value)}
                            onInteractOutside={() => field.onBlur()}
                            collection={mastersList}
                            disabled={isDataLoading}
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
                                  {mastersList.items.map((master) => (
                                    <Select.Item item={master} key={master.value}>
                                      {master.label}
                                      <Select.ItemIndicator />
                                    </Select.Item>
                                  ))}
                                </Select.Content>
                              </Select.Positioner>
                            </Portal>
                          </Select.Root>
                        );
                      }}
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Статус</Field.Label>
                    <Controller
                      control={control}
                      name="status"
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
                            collection={statusList}
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
                                  {statusList.items.map((status) => (
                                    <Select.Item item={status} key={status.value}>
                                      {status.label}
                                      <Select.ItemIndicator />
                                    </Select.Item>
                                  ))}
                                </Select.Content>
                              </Select.Positioner>
                            </Portal>
                          </Select.Root>
                        );
                      }}
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
              <Button type="submit" colorPalette={ACCENT_COLOR} disabled={!isValid || isDataLoading}>
                Изменить
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
} 