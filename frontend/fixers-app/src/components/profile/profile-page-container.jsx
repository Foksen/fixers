import {
  PROFILE_COMMON_PAGE,
  PROFILE_PAGE,
  PROFILE_PAGE_AUTHORITIES,
} from "@/constants/profile-pages";
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
    case PROFILE_PAGE.TASKS:
      const initialTasks = await fetchTasks(session);
      return <TaskContainer session={session} initialTasks={initialTasks} />;
    case PROFILE_COMMON_PAGE.SETTINGS:
      return <SettingsContainer />;
    default:
      return null;
  }
}
