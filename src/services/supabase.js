export const mainUrl = "https://api.taskiit.com";
export const backUrl = "https://api.taskiit.com/api/v1";

// export const mainUrl = "http://10.90.154.4:3000";
// export const backUrl = "http://10.90.154.4:3000/api/v1";

export const SUPABASE_URL = "";

export const supabase = {};

export const adminAuthClient = {};

export async function globalGetQueryURL({ url }) {
  try {
    const result = await fetch(`${backUrl}${url}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const contentType = result.headers.get("content-type");

    if (!result.ok) {
      // 🔐 SESSION EXPIRED HANDLING
      if (result.status === 401) {
        console.warn("⚠️ Session expired, logging out...");
        // window.location.href = "/member/auth"; // or use react-router navigate
        return;
      }

      throw new Error(`Request failed: ${result.status}`);
    }

    if (contentType && contentType.includes("application/json")) {
      const response = await result.json();

      if (response.status === "error" || response.status === "fail") {
        throw new Error(response?.message);
      }

      return response.data;
    } else {
      throw new Error("Unexpected response type");
    }
  } catch (err) {
    console.error("❌ API Error:", err);
  }
}

export async function globalPostQueryURL({ data, url }) {
  const result = await fetch(`${backUrl}${url}`, {
    method: "POST",
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response = await result.json();

  if (response.status === "error" || response.status === "fail") {
    throw new Error(response?.message);
  }

  return response.data;
}
