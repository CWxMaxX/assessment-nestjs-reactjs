import React from "react";
import { Button, Input, Form, Select, SelectItem } from "@heroui/react";

import { createUser } from "@/api/users";

interface CreateUserFormProps {
  onUserCreated: () => void;
}

export default function CreateUserForm(props: CreateUserFormProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const userRequest = {
      username: formData.get("username") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      department: formData.get("department") as string,
      password: formData.get("password") as string,
      status: "Active",
      userType: "employee",
    };

    try {
      await createUser(userRequest);
      props.onUserCreated();
      (document.querySelector('button[aria-label="Close"]') as HTMLButtonElement)?.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form className="flex flex-col gap-4 pb-4" validationBehavior="native" onSubmit={handleSubmit}>
      <Input
        isRequired
        label="First Name"
        labelPlacement="outside"
        name="firstName"
        placeholder="Enter first name"
        type="text"
        variant="bordered"
      />
      <Input
        isRequired
        label="Last Name"
        labelPlacement="outside"
        name="lastName"
        placeholder="Enter last name"
        type="text"
        variant="bordered"
      />
      <Input
        isRequired
        label="Username"
        labelPlacement="outside"
        name="username"
        placeholder="Enter username"
        type="text"
        variant="bordered"
      />
      <Input
        isRequired
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder="Enter password"
        type="text"
        variant="bordered"
      />
      <Select isRequired label="Department" labelPlacement="outside" name="department" placeholder="Select Department">
        <SelectItem key="Engineering" data-value="Engineering">
          Engineering
        </SelectItem>
        <SelectItem key="Sales" data-value="Sales">
          Sales
        </SelectItem>
        <SelectItem key="HR" data-value="HR">
          HR
        </SelectItem>
        <SelectItem key="Finance" data-value="Finance">
          Finance
        </SelectItem>
      </Select>
      <Button className="w-full" color="primary" type="submit">
        Create User
      </Button>
    </Form>
  );
}
