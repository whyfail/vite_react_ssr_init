import process from "node:process";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function requestJson<T>(url: string) {
  const response = await apiClient.get<T>(url);

  return response.data;
}
