import { Box, Grid, HStack, Icon } from "@chakra-ui/react";
import { TaskGridItem } from "./task-grid-item";
import { IoSearch } from "react-icons/io5";

export function TaskGrid({ tasks, ...props }) {
  return (
    <Box {...props}>
      {tasks == null || tasks.length == 0 ? (
        <HStack textStyle="lg" fontWeight="medium">
          <Icon mr="3">
            <IoSearch />
          </Icon>{" "}
          Заявки не найдены
        </HStack>
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
            <TaskGridItem task={task} key={index} />
          ))}
        </Grid>
      )}
    </Box>
  );
}
