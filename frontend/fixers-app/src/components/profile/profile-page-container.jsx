import { PROFILE_COMMON_PAGE, PROFILE_PAGE } from "@/constants/profile-pages";
import { SettingsContainer } from "./settings/settings-container";
import {
  getCategories,
  getCategoriesInfos,
  getServiceCenters,
  getServiceCentersInfos,
  getTasks,
} from "@/lib/api/tasks";
import { TasksContainer } from "./tasks/containers/tasks-container";
import { ClientTasksContainer } from "./tasks/containers/client-tasks-container";
import { WorkingTasksContainer } from "./tasks/containers/working-tasks-container";
import { UsersContainer } from "./users/users-conainter";
import { getUserInfos, getUsers } from "@/lib/api/user";
import { CategoriesContainer } from "./categories/categories-container";
import { ServiceCentersContainer } from "./service-centers/service-centers-container";
import { NotificationsContainer } from "./notifications/notifications-container";
import { USER_ROLE } from "@/constants/user-roles";
import { getNotifications } from "@/lib/api/notifications";

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

const fetchCategoriesIfNeeded = async (session) => {
  if (session.user.role === USER_ROLE.MODERATOR || session.user.role === USER_ROLE.MASTER) {
    try {
      const result = await getCategories();
      return result.results;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }
  return [];
};

const fetchPublishedCategories = async () => {
  try {
    const result = await getCategories({ published: true });
    return result.results;
  } catch (error) {
    console.error("Error fetching published categories:", error);
    return [];
  }
};

const fetchServiceCentersIfNeeded = async (session) => {
  if (session.user.role === USER_ROLE.MODERATOR || session.user.role === USER_ROLE.MASTER) {
    try {
      const result = await getServiceCenters();
      return result.results;
    } catch (error) {
      console.error("Error fetching service centers:", error);
      return [];
    }
  }
  return [];
};

const fetchPublishedServiceCenters = async () => {
  try {
    const result = await getServiceCenters({ published: true });
    return result.results;
  } catch (error) {
    console.error("Error fetching published service centers:", error);
    return [];
  }
};

const fetchUserInfos = async (session) => {
  try {
    const result = await getUserInfos(session.accessToken);
    return result.results;
  } catch (error) {
    console.error("Error fetching user infos: ", error);
  }
};

const fetchCategoriesInfos = async (session) => {
  try {
    const result = await getCategoriesInfos(session.accessToken);
    return result.results;
  } catch (error) {
    console.error("Error fetching categories infos: ", error);
  }
};

const fetchServiceCentersInfos = async (session) => {
  try {
    const result = await getServiceCentersInfos(session.accessToken);
    return result.results;
  } catch (error) {
    console.error("Error fetching service centers infos: ", error);
  }
};

const fetchMasters = async (session) => {
  if (session.user.role === USER_ROLE.MODERATOR) {
    try {
      const result = await getUsers(session.accessToken, { role: USER_ROLE.MASTER });
      return result.results;
    } catch (error) {
      console.error("Error fetching masters: ", error);
      return [];
    }
  }
  return [];
};

const fetchNotifications = async (session) => {
  try {
    const result = await getNotifications(session.accessToken);
    return result.results;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

export async function ProfilePageContainer({ profilePage, session }) {
  switch (profilePage) {
    case PROFILE_PAGE.TASKS:
      return (
        <TasksContainer
          session={session}
          initialTasks={await fetchTasks(session)}
          initialCategories={await fetchCategoriesIfNeeded(session)}
          initialServiceCenters={await fetchServiceCentersIfNeeded(session)}
          initialMasters={await fetchMasters(session)}
          publishedCategories={await fetchPublishedCategories()}
          publishedServiceCenters={await fetchPublishedServiceCenters()}
        />
      );

    case PROFILE_PAGE.CLIENT_TASKS:
      const initialClientTasks = await fetchTasks(session);
      return (
        <ClientTasksContainer
          session={session}
          initialTasks={initialClientTasks}
          initialCategories={await fetchCategoriesIfNeeded(session)}
          initialServiceCenters={await fetchServiceCentersIfNeeded(session)}
          initialMasters={await fetchMasters(session)}
        />
      );

    case PROFILE_PAGE.WORKING_TASTS:
      return (
        <WorkingTasksContainer
          session={session}
          initialTasks={await fetchMasterTasks(session)}
          initialCategories={await fetchCategoriesIfNeeded(session)}
          initialServiceCenters={await fetchServiceCentersIfNeeded(session)}
        />
      );

    case PROFILE_PAGE.USERS:
      return (
        <UsersContainer
          initialUserInfos={await fetchUserInfos(session)}
          session={session}
        />
      );

    case PROFILE_PAGE.CATEGORIES:
      return (
        <CategoriesContainer
          session={session}
          initialCategoriesInfos={await fetchCategoriesInfos(session)}
        />
      );

    case PROFILE_PAGE.SERVICE_CENTERS:
      return (
        <ServiceCentersContainer
          session={session}
          initialServiceCentersInfos={await fetchServiceCentersInfos(session)}
        />
      );

    case PROFILE_COMMON_PAGE.SETTINGS:
      return <SettingsContainer session={session} />;

    case PROFILE_COMMON_PAGE.NOTIFICATIONS:
      return <NotificationsContainer 
        initialNotifications={await fetchNotifications(session)} 
        session={session} 
      />;

    default:
      return null;
  }
}
