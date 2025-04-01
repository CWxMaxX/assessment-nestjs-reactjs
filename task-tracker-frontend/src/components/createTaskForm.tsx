import React, { useEffect } from "react";
import { Button, Input, Form, Textarea, Select, SelectItem, DatePicker } from "@heroui/react";
import { parseDate } from "@internationalized/date";

import { fetchActiveUsers } from "@/api/users";
import { UserResponse } from "@/api/auth";
import { createTask } from "@/api/tasks";

interface CreateTaskFormProps {
  onTaskCreated: () => void; // Callback to refetch tasks
}

export default function CreateTaskForm(props: CreateTaskFormProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const assigneeId = parseInt((formData.get("assigneeId") as string) || "0");
    const assignee =
      assigneesList.find((user) => user.id === assigneeId)?.firstName +
        " " +
        assigneesList.find((user) => user.id === assigneeId)?.lastName || "";

    const taskRequest = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      priority: formData.get("priority") as string,
      dueDate: new Date(formData.get("dueDate") as string),
      status: "todo",
      assigneeId,
      assignee,
    };

    try {
      await createTask(taskRequest);
      props.onTaskCreated();
      (document.querySelector('button[aria-label="Close"]') as HTMLButtonElement)?.click();
    } catch (error) {
      console.error(error);
    }
  };

  const [assigneesList, setAssigneesList] = React.useState<UserResponse[]>([]);

  useEffect(() => {
    const fetchAssignees = async () => {
      try {
        const users = await fetchActiveUsers();

        setAssigneesList(users);
      } catch (error) {
        console.error("Failed to fetch active users:", error);
      }
    };

    fetchAssignees();
  }, []);

  return (
    <Form className="flex flex-col gap-4 pb-4" validationBehavior="native" onSubmit={handleSubmit}>
      <Select isRequired label="Assignee" labelPlacement="outside" name="assigneeId" placeholder="Select Assignee">
        {assigneesList.map((assignee) => (
          <SelectItem key={assignee.id} data-value={assignee.id.toString()}>
            {`${assignee.firstName} ${assignee.lastName}`}
          </SelectItem>
        ))}
      </Select>
      <Input
        isRequired
        label="Title"
        labelPlacement="outside"
        name="title"
        placeholder="Enter your task title"
        type="text"
        variant="bordered"
      />
      <Textarea
        isRequired
        label="Description"
        labelPlacement="outside"
        name="description"
        placeholder="Enter your task description"
        type="text"
        variant="bordered"
      />
      <Select isRequired defaultSelectedKeys={["l1"]} label="Priority" labelPlacement="outside" name="priority">
        <SelectItem key="l1" data-value="l1">
          High
        </SelectItem>
        <SelectItem key="l2" data-value="l2">
          Medium
        </SelectItem>
        <SelectItem key="l3" data-value="l3">
          Low
        </SelectItem>
      </Select>
      <DatePicker
        isRequired
        defaultValue={parseDate(new Date().toISOString().split("T")[0])}
        label="Due Date"
        labelPlacement="outside"
        name="dueDate"
      />
      <Button className="w-full" color="primary" type="submit">
        Create Task
      </Button>
    </Form>
  );
}
