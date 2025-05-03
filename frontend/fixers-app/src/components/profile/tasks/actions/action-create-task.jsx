export const ActionCreateTask = ({
  createTask,
  onSubmit,
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
