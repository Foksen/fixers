import { PROFILE_COMMON_PAGE, PROFILE_PAGE } from "@/constants/profile-pages";
import { SettingsContainer } from "./settings/settings-container";
import { getTasks } from "@/lib/api/tasks";
import { TasksContainer } from "./tasks/tasks-container";
import { ClientTasksContainer } from "./tasks/client-tasks-container";
import { WorkingTasksContainer } from "./tasks/working-tasks-container";

const fetchTasks = async (session) => {
  try {
    const result = await getTasks(session.accessToken);
    return result.results;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export async function ProfilePageContainer({ profilePage, session }) {
  switch (profilePage) {
    case PROFILE_PAGE.TASKS:
      const initialTasks = await fetchTasks(session);
      return <TasksContainer session={session} initialTasks={initialTasks} />;

    case PROFILE_PAGE.CLIENT_TASKS:
      const initialClientTasks = await fetchTasks(session);
      return (
        <ClientTasksContainer
          session={session}
          initialTasks={initialClientTasks}
        />
      );

    case PROFILE_PAGE.WORKING_TASTS:
      const initialWorkingTasks = await fetchTasks(session);
      return (
        <WorkingTasksContainer
          session={session}
          initialTasks={initialWorkingTasks}
        />
      );

    case PROFILE_COMMON_PAGE.SETTINGS:
      return <SettingsContainer />;

    default:
      return null;
  }
}
