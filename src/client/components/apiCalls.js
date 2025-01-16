// api.js
const API_BASE_URL = "http://localhost:3000/api";

export const fetchUserData = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Login failed");
    }

    return result;
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

export const fetchCommunities = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/communities`);

    if (!response.ok) {
      throw new Error("Failed to fetch communities.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching communities:", error.message);
    throw error;
  }
};
