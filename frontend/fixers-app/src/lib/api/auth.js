import { backendFetch } from "./fetcher";

export async function registerUser(data) {
  return backendFetch("/api/users/register/", {
    method: "POST",
    data: data,
  });
}

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
