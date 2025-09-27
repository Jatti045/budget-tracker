import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";

// Prefer Expo's public env var which is injected at build time by EAS/app build.
// Fallback to legacy names for local testing and finally to a sensible default.
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || process.env.API_URL || process.env.API_BASE_URL || "http://localhost:3000";

if (!process.env.EXPO_PUBLIC_API_URL) {
  // Log a gentle warning in development so it's obvious if builds don't have the right value.
  // Avoid noisy logs in production builds (check NODE_ENV).
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "Warning: EXPO_PUBLIC_API_URL is not set — using fallback:",
      API_BASE_URL
    );
  }
}

// Configure axios defaults
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

// Attach token before each request if available
apiClient.interceptors.request.use(
  async (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);

    // Attach auth token (await AsyncStorage)
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.error("Error reading auth token from storage:", err);
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Log responses and handle global errors
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  async (error) => {
    // Normalize error object so callers can rely on a `message` property.
    // Axios errors may include server payloads under error.response.data.
    const defaultMsg = "An unexpected error occurred.";
    const normalized: any = {
      message: error?.response?.data?.message || error?.message || defaultMsg,
      status: error?.response?.status,
      data: error?.response?.data,
    };

    console.error(`API Error: ${error.config?.url}`, normalized);

    // If unauthorized, clear stored auth data. Navigation should be
    // performed by the UI layer instead of the API client to avoid
    // surprising side-effects during background requests.
    if (normalized.status === 401) {
      try {
        await AsyncStorage.multiRemove(["authToken", "userData"]);
      } catch (e) {
        console.error("Failed to clear auth storage:", e);
      }
    }

    // Reject with a normalized error object so thunks can extract message
    return Promise.reject(normalized);
  }
);

export default apiClient;
