import { USER_ROLE } from "./user-roles";

export const PROFILE_COMMON_PAGE = {
  SETTINGS: "settings",
  NOTIFICATIONS: "notifications",
};

export const PROFILE_PAGE = {
  TASKS: "tasks",
  CLIENT_TASKS: "client-tasks",
  WORKING_TASTS: "working-tasks",
  MASTERS: "masters",
  USERS: "users",
  SERVICE_CENTERS: "service-centers",
  CATEGORIES: "categories",
};

export const PROFILE_PAGE_AUTHORITIES = {};

PROFILE_PAGE_AUTHORITIES[USER_ROLE.CLIENT] = [
  PROFILE_PAGE.TASKS,
  PROFILE_PAGE.MASTERS,
];

PROFILE_PAGE_AUTHORITIES[USER_ROLE.MASTER] = [
  PROFILE_PAGE.CLIENT_TASKS,
  PROFILE_PAGE.WORKING_TASTS,
];

PROFILE_PAGE_AUTHORITIES[USER_ROLE.MODERATOR] = [
  PROFILE_PAGE.CLIENT_TASKS,
  PROFILE_PAGE.USERS,
  PROFILE_PAGE.CATEGORIES,
  PROFILE_PAGE.SERVICE_CENTERS,
];
