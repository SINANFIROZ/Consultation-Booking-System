const BASE_URL = "http://localhost:5000";

export async function apiRequest(path, method = "GET", body, email) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-user-email": email,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return res.json();
}
