export async function backendFetch(
  url,
  { method = "GET", data = null, accessToken = null, params = null } = {}
) {
  // Use different base URLs for server-side and client-side rendering
  const isServer = typeof window === 'undefined';
  let baseUrl = isServer
    ? (process.env.BACKEND_URL || "http://backend:8000")
    : (process.env.NEXT_PUBLIC_CLIENT_BACKEND_URL || "http://localhost");
  
  // Ensure baseUrl ends with a slash if not already
  if (!baseUrl.endsWith('/')) {
    baseUrl = baseUrl + '/';
  }

  // Remove leading slash to avoid double slashes
  const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
  
  // НОВЫЙ КОД: Добавляем префикс api/ если его еще нет
  const apiUrl = cleanUrl.startsWith('api/') ? cleanUrl : 'api/' + cleanUrl;

  // Construct full URL with api prefix
  let fullUrl = new URL(baseUrl + apiUrl);

  if (params && typeof params === "object") {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        const multipleFieldsKey = `${value}`.includes(",") ? `${key}__in` : key;
        fullUrl.searchParams.append(multipleFieldsKey, value);
      }
    });
  }

  const headers = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
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
    throw error;
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
