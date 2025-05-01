export function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("JWT parsing error:", e);
    return null;
  }
}
