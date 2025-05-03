import { PROFILE_COMMON_PAGE, PROFILE_PAGE } from "@/constants/profile-pages";
import { SettingsContainer } from "./settings/settings-container";
import { getCategories, getServiceCenters, getTasks } from "@/lib/api/tasks";
import { TasksContainer } from "./tasks/containers/tasks-container";
import { ClientTasksContainer } from "./tasks/containers/client-tasks-container";
import { WorkingTasksContainer } from "./tasks/containers/working-tasks-container";
import { UsersContainer } from "./users/users-conainter";

const fetchTasks = async (session) => {
  try {
    const result = await getTasks(session.accessToken);
    return result.results;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

const fetchMasterTasks = async (session) => {
  try {
    const masterId = session?.user?.id;
    if (!masterId) {
      throw new Error("Cannot get master id from session");
    }
    const result = await getTasks(session.accessToken, { master: masterId });
    return result.results;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

const fetchCategories = async () => {
  try {
    const result = await getCategories();
    return result.results;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const fetchServiceCenters = async () => {
  try {
    const result = await getServiceCenters();
    return result.results;
  } catch (error) {
    console.error("Error fetching service centers:", error);
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
          initialCategories={await fetchCategories()}
          initialServiceCenters={await fetchServiceCenters()}
        />
      );

    case PROFILE_PAGE.WORKING_TASTS:
      return (
        <WorkingTasksContainer
          session={session}
          initialTasks={await fetchMasterTasks(session)}
          initialCategories={await fetchCategories()}
          initialServiceCenters={await fetchServiceCenters()}
        />
      );

    case PROFILE_PAGE.USERS:
      return <UsersContainer />;

    case PROFILE_COMMON_PAGE.SETTINGS:
      return <SettingsContainer />;

    default:
      return null;
  }
}
