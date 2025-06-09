import { backendFetch } from "./fetcher";

export async function registerUser(data) {
  return backendFetch("/users/register/", {
    method: "POST",
    data: data,
  });
}

export async function loginUser(email, password, code) {
  const data = { email, password };
  if (code) {
    data.code = code;
  }
  return backendFetch("/users/login/", {
    method: "POST",
    data: data,
  });
}
