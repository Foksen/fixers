import { backendFetch } from "./fetcher";

export async function getCategories() {
  return backendFetch("/api/tasks/categories/", {
    method: "GET",
  });
}

export async function getCategoriesInfos(accessToken) {
  return backendFetch("/api/tasks/categories-infos", {
    method: "GET",
    accessToken: accessToken,
  });
}

export async function getServiceCenters() {
  return backendFetch("/api/tasks/service-centers/", {
    method: "GET",
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
