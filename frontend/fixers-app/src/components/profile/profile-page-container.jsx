import { PROFILE_PAGES_TYPES } from "@/constants/profile-pages";
import { TaskContainer } from "./tasks/tasks-container";
import { SettingsContainer } from "./settings/settings-container";

export function ProfilePageContainer({ profilePage, session }) {
  switch (profilePage) {
    case PROFILE_PAGES_TYPES.MY_TASKS:
      return <TaskContainer session={session} />;
    case PROFILE_PAGES_TYPES.SETTINGS:
      return <SettingsContainer />;
    default:
      return null;
  }
}
