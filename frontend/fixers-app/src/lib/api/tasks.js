import { backendFetch } from "./fetcher";

export async function getCategories(filters) {
  return backendFetch("/api/tasks/categories/", {
    method: "GET",
    params: filters,
  });
}

export async function getCategoriesInfos(accessToken) {
  return backendFetch("/api/tasks/categories-infos", {
    method: "GET",
    accessToken: accessToken,
  });
}

export async function getServiceCenters(filters) {
  return backendFetch("/api/tasks/service-centers/", {
    method: "GET",
    params: filters,
  });
}

export async function getServiceCentersInfos(accessToken) {
  return backendFetch("/api/tasks/service-centers-infos/", {
    method: "GET",
    accessToken: accessToken,
  });
}

export async function getTasks(accessToken, filters) {
  return backendFetch("/api/tasks/tasks", {
    method: "GET",
    accessToken: accessToken,
    params: filters,
  });
}

export async function createTask(accessToken, taskData) {
  return backendFetch("/api/tasks/tasks/", {
    method: "POST",
    accessToken: accessToken,
    data: taskData,
  });
}
