import { backendFetch } from "./fetcher";

export async function getTasks(accessToken, filters) {
  return backendFetch("/api/tasks/tasks/", {
    method: "GET",
    accessToken: accessToken,
    filters: filters,
  });
}

export async function createTask(accessToken, taskData) {
  return backendFetch("/api/tasks/tasks/", {
    method: "POST",
    accessToken: accessToken,
    data: taskData,
  });
}
