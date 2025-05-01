import { backendFetch } from "./fetcher";

export async function getUserTasks(accessToken) {
  return backendFetch("/api/tasks/", {
    method: "GET",
    accessToken,
  });
}

export async function createTask(accessToken, taskData) {
  return backendFetch("/api/tasks/", {
    method: "POST",
    accessToken: accessToken,
    data: taskData,
  });
}
