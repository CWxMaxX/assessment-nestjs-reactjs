import axios from "axios";
export const BASE_API_URL = "http://localhost:3000";

export interface UserResponse {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  department: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userType: string;
}

export interface LoginResponse {
  access_token: string;
  user: UserResponse;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${BASE_API_URL}/auth/login`, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Login API call failed:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");
};
