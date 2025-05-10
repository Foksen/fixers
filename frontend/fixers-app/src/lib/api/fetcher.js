export async function backendFetch(
  url,
  { method = "GET", data = null, accessToken = null, params = null } = {}
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const headers = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let fullUrl = new URL(baseUrl + url);

  if (params && typeof params === "object") {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        const multipleFieldsKey = `${value}`.includes(",") ? `${key}__in` : key;
        fullUrl.searchParams.append(multipleFieldsKey, value);
      }
    });
  }

  const response = await fetch(fullUrl.toString(), {
    method,
    headers,
    body: data && method !== "GET" ? JSON.stringify(data) : null,
    credentials: "include",
  });

  if (!response.ok) {
    const error = new Error("Request error");
    error.data = await response.json();
    console.error("Error during request: ", error.data);
    throw error;
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
