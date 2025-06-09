import { backendFetch } from "./fetcher";

export async function getUserInfos(accessToken) {
  return backendFetch("/users/infos/", {
    method: "GET",
    accessToken: accessToken,
  });
}

export async function getUsers(accessToken, filters) {
  return backendFetch("/users/users/", {
    method: "GET",
    accessToken: accessToken,
    params: filters,
  });
}

export async function patchUser(accessToken, userId, data) {
  return backendFetch(`/users/users/${userId}/`, {
    method: "PATCH",
    accessToken: accessToken,
    data: data,
  });
}

export async function deleteUser(accessToken, userId) {
  return backendFetch(`/users/users/${userId}/`, {
    method: "DELETE",
    accessToken: accessToken,
  });
}
