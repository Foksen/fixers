import { Portal, Select } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

export function TaskFilter({ filterControl, taskFilter }) {
  return (
    <Controller
      control={filterControl}
      name={taskFilter.name}
      render={({ field }) => (
        <Select.Root
          w="48"
          multiple
          name={field.name}
          value={field.value}
          onValueChange={({ value }) => field.onChange(value)}
          onInteractOutside={() => field.onBlur()}
          collection={taskFilter.collection}
        >
          <Select.HiddenSelect />
          <Select.Label>{taskFilter.title}</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Все" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {taskFilter.collection.items.map((filterItem) => (
                  <Select.Item
                    item={filterItem}
                    key={filterItem.value}
                    cursor="pointer"
                  >
                    {filterItem.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      )}
    ></Controller>
  );
}
