import { backendFetch } from "./fetcher";

export async function getUserInfos(accessToken) {
  return backendFetch("/api/users/infos/", {
    method: "GET",
    accessToken: accessToken,
  });
}

export async function patchUser(accessToken, userId, data) {
  return backendFetch(`/api/users/users/${userId}/`, {
    method: "PATCH",
    accessToken: accessToken,
    data: data,
  });
}

export async function deleteUser(accessToken, userId) {
  return backendFetch(`/api/users/users/${userId}/`, {
    method: "DELETE",
    accessToken: accessToken,
  });
}
