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

export const fetchAllUsers = async (): Promise<UserResponse[]> => {
  try {
    const response = await axios.get<UserResponse[]>(`${BASE_API_URL}/users`, {
      headers: {
        Authorization: getAccessToken(),
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const createUser = async (userData: Partial<UserResponse>): Promise<UserResponse> => {
  try {
    const response = await axios.post<UserResponse>(`${BASE_API_URL}/users`, userData, {
      headers: {
        Authorization: getAccessToken(),
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUserStatus = async (id: number, status: "Active" | "Deactivated"): Promise<UserResponse> => {
  try {
    const response = await axios.post<UserResponse>(
      `${BASE_API_URL}/users/update-status`,
      { id, status },
      {
        headers: {
          Authorization: getAccessToken(),
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating user status:", error);
    throw error;
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_API_URL}/users/${id}`, {
      headers: {
        Authorization: getAccessToken(),
      },
    });
    console.log(`User with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
