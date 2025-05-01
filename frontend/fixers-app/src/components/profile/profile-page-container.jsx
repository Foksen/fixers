import { PROFILE_PAGES_TYPES } from "@/constants/profile-pages";
import { TaskContainer } from "./tasks/tasks-container";
import { SettingsContainer } from "./settings/settings-container";
import { getUserTasks } from "@/lib/api/tasks";

const fetchTasks = async (session) => {
  try {
    const result = await getUserTasks(session.accessToken);
    return result.results;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export async function ProfilePageContainer({ profilePage, session }) {
  switch (profilePage) {
    case PROFILE_PAGES_TYPES.MY_TASKS:
      const initialTasks = await fetchTasks(session)
      return (
        <TaskContainer session={session} initialTasks={initialTasks} />
      );
    case PROFILE_PAGES_TYPES.SETTINGS:
      return <SettingsContainer />;
    default:
      return null;
  }
}
