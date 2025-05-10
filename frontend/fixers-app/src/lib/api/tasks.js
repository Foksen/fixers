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

export async function createCategory(accessToken, categoryData) {
  return backendFetch("/api/tasks/categories/", {
    method: "POST",
    accessToken: accessToken,
    data: categoryData,
  });
}

export async function putCategory(accessToken, categoryId, categoryData) {
  return backendFetch(`/api/tasks/categories/${categoryId}/`, {
    method: "PUT",
    accessToken: accessToken,
    data: categoryData,
  });
}

export async function deleteCategory(accessToken, categoryId) {
  return backendFetch(`/api/tasks/categories/${categoryId}/`, {
    method: "DELETE",
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

export async function createServiceCenter(accessToken, serviceCenterData) {
  return backendFetch("/api/tasks/service-centers/", {
    method: "POST",
    accessToken: accessToken,
    data: serviceCenterData,
  });
}

export async function putServiceCenter(
  accessToken,
  serviceCenterId,
  serviceCenterData
) {
  return backendFetch(`/api/tasks/service-centers/${serviceCenterId}/`, {
    method: "PUT",
    accessToken: accessToken,
    data: serviceCenterData,
  });
}

export async function deleteServiceCenter(accessToken, serviceCenterId) {
  return backendFetch(`/api/tasks/service-centers/${serviceCenterId}/`, {
    method: "DELETE",
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
