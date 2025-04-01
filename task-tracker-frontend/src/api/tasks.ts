import axios from "axios";

import { BASE_API_URL } from "./auth";

import { getAccessToken } from "@/utils/store";

export interface CreateTaskRequest {
  title: string;
  description: string;
  priority: string;
  dueDate: Date;
  assignee: string;
  assigneeId: number;
  status: string;
}

export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  assignee: string;
  assigneeId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const createTask = async (task: CreateTaskRequest): Promise<TaskResponse> => {
  const response = await axios.post<TaskResponse>(`${BASE_API_URL}/tasks`, task, {
    headers: {
      Authorization: getAccessToken(),
    },
  });

  return response.data;
};

export const fetchAllTasks = async (): Promise<TaskResponse[]> => {
  const response = await axios.get<TaskResponse[]>(`${BASE_API_URL}/tasks`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });

  return response.data;
};

export const fetchAllTasksWithAssignee = async (userId : number): Promise<TaskResponse[]> => {
  const response = await axios.get<TaskResponse[]>(`${BASE_API_URL}/tasks/with-assignee/${userId}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });

  return response.data;
};

export const updateTaskStatus = async (taskId: number, status: string): Promise<TaskResponse> => {
  console.log("Task Id : ", taskId);
  const response = await axios.post<TaskResponse>(
    `${BASE_API_URL}/tasks/update-status`,
    { id: taskId, status },
    {
      headers: {
        Authorization: getAccessToken(),
      },
    }
  );

  return response.data;
};
