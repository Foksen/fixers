import { backendFetch } from "./fetcher";

export async function getUserTasks(accessToken) {
  return backendFetch("/api/tasks/tasks/", {
    method: "GET",
    accessToken,
  });
}

export async function createTask(accessToken, taskData) {
  return backendFetch("/api/tasks/tasks/", {
    method: "POST",
    accessToken: accessToken,
    data: taskData,
  });
}
