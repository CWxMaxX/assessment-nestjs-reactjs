type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  department: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userType: string;
};

export function getUserData(propertyName: keyof User | string): any {
  const userData = localStorage.getItem("user");

  if (!userData) {
    return null;
  }

  try {
    const user = JSON.parse(userData);

    return user[propertyName] ?? null;
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);

    return null;
  }
}

export const getAccessToken = () => {
  const access_token = localStorage.getItem("access_token");

  if (access_token) {
    return `Bearer ${access_token}`;
  }

  return "";
};
