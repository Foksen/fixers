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
import { getUserInfos } from "@/lib/api/user";
import { CategoriesContainer } from "./categories/categories-container";
import { ServiceCentersContainer } from "./service-centers/service-centers-container";
import { NotificationsContainer } from "./notifications/notifications-container";

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

const fetchCategories = async (filters) => {
  try {
    const result = await getCategories(filters);
    return result.results;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const fetchServiceCenters = async (filters) => {
  try {
    const result = await getServiceCenters(filters);
    return result.results;
  } catch (error) {
    console.error("Error fetching service centers:", error);
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

const notifications = [
  {
    id: 1,
    task_id: 1,
    user_id: 1,
    sender_id: 1,
    title: "Статус заявки изменён",
    message:
      'Мастер Иван изменил статус вашей заявки (Сломался экран телефона) на "В работе"',
    is_new: false,
    created_at: "05.05.2025 14:30",
  },
  {
    id: 1,
    task_id: 1,
    user_id: 1,
    sender_id: 1,
    title: "Статус заявки изменён",
    message:
      'Мастер Иван изменил статус вашей заявки (Сломался экран телефона) на "В работе"',
    is_new: false,
    created_at: "01.01.1970 00:00",
  },
  {
    id: 1,
    task_id: 1,
    user_id: 1,
    sender_id: 1,
    title: "Статус заявки изменён",
    message:
      'Мастер Иван изменил статус вашей заявки (Сломался экран телефона) на "В работе"',
    is_new: false,
    created_at: "06.05.2025 14:20",
  },
];

export async function ProfilePageContainer({ profilePage, session }) {
  switch (profilePage) {
    case PROFILE_PAGE.TASKS:
      return (
        <TasksContainer
          session={session}
          initialTasks={await fetchTasks(session)}
          initialCategories={await fetchCategories({ published: true })}
          initialServiceCenters={await fetchServiceCenters({ published: true })}
        />
      );

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
      return <NotificationsContainer initialNotifications={notifications} />;

    default:
      return null;
  }
}
