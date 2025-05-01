"use client";

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

const categories = createListCollection({
  items: [{ label: "Телефон", value: "phone" }],
});

const CreateTaskDialog = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <Button>Создать заявку</Button>
    </Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title textStyle="2xl">Создание заявки</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body pb="4">
            <Fieldset.Root>
              <Fieldset.Content>
                <Field.Root>
                  <Field.Label>Категория</Field.Label>

                  <Select.Root collection={categories}>
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
                            <Select.Item item={category} key={category.value}>
                              {category.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Описание проблемы</Field.Label>
                  <Textarea />
                </Field.Root>
              </Fieldset.Content>
            </Fieldset.Root>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
              <Button variant="outline">Отменить</Button>
            </Dialog.ActionTrigger>
            <Button>Создать</Button>
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
  tasks,
  newCount,
  inProgressCount,
  finishedCount,
  ...props
}) {
  return (
    <VStack align="start" {...props} gap="7">
      <HStack w="full" justify="space-between">
        <SegmentGroup.Root defaultValue="new">
          <SegmentGroup.Indicator shadow="xs" borderWidth="1px" />

          <SegmentItem
            value="new"
            title={
              <HStack gap="2">
                <Text>Новые</Text>
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
            }
          />

          <SegmentItem
            value="repair"
            title={
              <HStack gap="2">
                <Text>В ремонте</Text>
                {{ inProgressCount } > 0 && (
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
            }
          />

          <SegmentItem
            value="closed"
            title={
              <HStack gap="2">
                <Text>Завершённые</Text>
                {{ finishedCount } > 0 && (
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
            }
          />
        </SegmentGroup.Root>

        <CreateTaskDialog />
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
