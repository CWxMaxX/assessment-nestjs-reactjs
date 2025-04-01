import axios from "axios";

import { BASE_API_URL, UserResponse } from "./auth";

import { getAccessToken } from "@/utils/store";

export const fetchActiveUsers = async (): Promise<UserResponse[]> => {
  try {
    const response = await axios.get<UserResponse[]>(`${BASE_API_URL}/users/active`, {
      headers: {
        Authorization: getAccessToken(),
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching active users:", error);
    throw error;
  }
};
