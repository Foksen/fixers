import { backendFetch } from "./fetcher";

export async function loginUser(email, password) {
  return backendFetch("/api/users/login/", {
    method: "POST",
    data: { email, password },
  });
}

export async function googleLogin(idToken) {
  return backendFetch("/api/users/google-login/", {
    method: "POST",
    data: { id_token: idToken },
  });
}
