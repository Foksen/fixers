import {
  Button,
  Center,
  createListCollection,
  Dialog,
  Field,
  Fieldset,
  Grid,
  HStack,
  Icon,
  Portal,
  SegmentGroup,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { TaskItem } from "./task-item";
import { IoSearch } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import { createTask } from "@/lib/api/tasks";

const categories = createListCollection({
  items: [
    { label: "Телефон", value: 1 },
    { label: "Ноутбук", value: 2 },
  ],
});

const CreateTaskDialog = ({
  createTask,
  onSubmit,
  errors,
  isValid,
  control,
}) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <Button>Создать заявку</Button>
    </Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content as="form" onSubmit={onSubmit}>
          <Dialog.Header>
            <Dialog.Title textStyle="2xl">Создание заявки</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body pb="4">
            <Fieldset.Root>
              <Fieldset.Content>
                <Field.Root>
                  <Field.Label>Категория</Field.Label>

                  <Controller
                    control={control}
                    name="category"
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
                  <Field.Label>Описание проблемы</Field.Label>
                  <Textarea
                    {...createTask("description", {
                      required: "Введите описание",
                    })}
                  />
                </Field.Root>
              </Fieldset.Content>
            </Fieldset.Root>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
              <Button variant="outline">Отменить</Button>
            </Dialog.ActionTrigger>
            <Dialog.ActionTrigger asChild>
              <Button type="submit" disabled={!isValid}>
                Создать
              </Button>
            </Dialog.ActionTrigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
);

const SegmentItem = ({ value, title }) => (
  <SegmentGroup.Item value={value} cursor="pointer">
    <SegmentGroup.ItemText>{title}</SegmentGroup.ItemText>
    <SegmentGroup.ItemHiddenInput />
  </SegmentGroup.Item>
);

export function TasksGrid({
  accessToken,
  tasks,
  appendTask,
  newCount,
  inProgressCount,
  finishedCount,
  ...props
}) {
  const {
    register: createTaskForm,
    handleSubmit: handleSubmitCreateTask,
    setError: setCreateTaskError,
    reset: resetCreateTaskForm,
    control: createTaskControl,
    formState: { errors: createTaskFormErrors, isValid: isCreateTaskValid },
  } = useForm({
    mode: "onChange",
  });

  const onCreateTaskSubmit = handleSubmitCreateTask(async (data) => {
    resetCreateTaskForm();

    const category = data.category[0];
    const description = data.description;

    const result = await createTask(accessToken, { category, description });

    appendTask(result);
  });

  return (
    <VStack align="start" {...props} gap="7">
      <HStack w="full" justify="space-between">
        <SegmentGroup.Root defaultValue="new">
          <SegmentGroup.Indicator shadow="xs" borderWidth="1px" />
          <SegmentGroup.Items
            cursor="pointer"
            items={[
              {
                value: "new",
                label: (
                  <HStack>
                    Новые
                    {newCount > 0 && (
                      <Center
                        rounded="full"
                        bg="bg.emphasized"
                        w="6"
                        h="6"
                        fontWeight="medium"
                      >
                        {newCount}
                      </Center>
                    )}
                  </HStack>
                ),
              },
              {
                value: "inProgress",
                label: (
                  <HStack>
                    В ремонте
                    {inProgressCount > 0 && (
                      <Center
                        rounded="full"
                        bg="bg.emphasized"
                        w="6"
                        h="6"
                        fontWeight="medium"
                      >
                        {inProgressCount}
                      </Center>
                    )}
                  </HStack>
                ),
              },
              {
                value: "finished",
                label: (
                  <HStack>
                    Завершённые
                    {finishedCount > 0 && (
                      <Center
                        rounded="full"
                        bg="bg.emphasized"
                        w="6"
                        h="6"
                        fontWeight="medium"
                      >
                        {finishedCount}
                      </Center>
                    )}
                  </HStack>
                ),
              },
            ]}
          />
        </SegmentGroup.Root>

        <CreateTaskDialog
          createTask={createTaskForm}
          onSubmit={onCreateTaskSubmit}
          errors={createTaskFormErrors}
          isValid={isCreateTaskValid}
          control={createTaskControl}
        />
      </HStack>

      {tasks == null || tasks.length == 0 ? (
        <Center w="full" h="20" textStyle="xl" fontWeight="medium">
          <Icon mr="3">
            <IoSearch />
          </Icon>{" "}
          Заявки не найдены
        </Center>
      ) : (
        <Grid
          w="full"
          templateColumns={{
            base: "repeat(1, 1fr)",
            lg: "repeat(2, 1fr)",
            "2xl": "repeat(3, 1fr)",
          }}
          gap="4"
        >
          {tasks.map((task, index) => (
            <TaskItem task={task} key={index} />
          ))}
        </Grid>
      )}
    </VStack>
  );
}
