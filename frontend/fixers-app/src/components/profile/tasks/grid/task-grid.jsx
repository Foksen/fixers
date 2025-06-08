import { Box, Grid, HStack, Icon } from "@chakra-ui/react";
import { TaskGridItem } from "./task-grid-item";
import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";
import { TasksDialogEdit } from "../dialogs/tasks-dialog-edit";
import { TasksDialogDelete } from "../dialogs/tasks-dialog-delete";

export function TaskGrid({ 
  tasks, 
  session, 
  initialCategories, 
  initialServiceCenters, 
  initialMasters, 
  updateTaskInList,
  ...props 
}) {
  const [tasksList, setTasksList] = useState(tasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Keep local state in sync with props
  useEffect(() => {
    setTasksList(tasks);
  }, [tasks]);

  const removeTaskInfo = (taskId) => {
    setTasksList((prev) => prev.filter((task) => task.id !== taskId));
  };

  const updateTaskInfo = (id, newTaskInfo) => {
    setTasksList((prev) => 
      prev.map((task) => task.id === id ? newTaskInfo : task)
    );
    
    if (updateTaskInList) {
      updateTaskInList(id, newTaskInfo);
    }
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setEditDialogOpen(true);
  };

  const handleStatusChange = (updatedTask) => {
    updateTaskInfo(updatedTask.id, updatedTask);
  };

  const handleDeleteTask = (task) => {
    setSelectedTask(task);
    setDeleteDialogOpen(true);
  };

  return (
    <Box {...props}>
      {tasksList == null || tasksList.length == 0 ? (
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
          {tasksList.map((task) => (
            <TaskGridItem 
              task={task} 
              session={session} 
              key={task.id}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onStatusChange={handleStatusChange}
            />
          ))}
        </Grid>
      )}

      <TasksDialogEdit
        isEditDialogOpen={isEditDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        taskInfo={selectedTask}
        updateTaskInfo={updateTaskInfo}
        session={session}
        initialCategories={initialCategories}
        initialServiceCenters={initialServiceCenters}
        initialMasters={initialMasters}
        isDataLoading={isLoading}
      />

      <TasksDialogDelete
        isDeleteDialogOpen={isDeleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        taskInfo={selectedTask}
        removeTaskInfo={removeTaskInfo}
        session={session}
      />
    </Box>
  );
}
