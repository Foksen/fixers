import { backendFetch } from "./fetcher";

export async function getMyProfile(accessToken) {
  return backendFetch("/api/users/me", {
    method: "GET",
    accessToken,
  });
}

export async function getUserInfos(accessToken) {
  return backendFetch("/api/users/infos/", {
    method: "GET",
    accessToken: accessToken,
  });
}
