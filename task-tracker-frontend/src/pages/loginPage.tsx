import React from "react";
import { Button, Input, Checkbox, Form, Image } from "@heroui/react";
import { Icon } from "@iconify/react";

import DefaultLayout from "@/layouts/default";
import { login } from "@/api/auth";

export default function Component() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const response = await login(username, password);

      if (response) {
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("user", JSON.stringify(response.user));
        if (response.user?.userType === "admin") {
          window.location.href = "/analytics";
        } else if (response.user?.userType === "employee") {
          window.location.href = "/tasks";
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <DefaultLayout>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 ">
          <div className="w-full flex justify-center items-center">
            <Image src="/assets/logo.png" width={100} />
          </div>
          <p className="pb-0 text-center text-2xl font-semibold">Task Management System</p>
          <p className="pb-4 text-center font-thin">
            <span className="">Welcome Back!</span>
            <br />
            <span className="text-xs">Stay organized and get things done efficiently.</span>
          </p>
          <Form className="flex flex-col gap-4" validationBehavior="native" onSubmit={handleSubmit}>
            <Input
              isRequired
              label="Username"
              labelPlacement="outside"
              name="username"
              placeholder="Enter your username"
              type="username"
              variant="bordered"
            />
            <Input
              isRequired
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <Icon className="pointer-events-none text-2xl text-default-400" icon="solar:eye-closed-linear" />
                  ) : (
                    <Icon className="pointer-events-none text-2xl text-default-400" icon="solar:eye-bold" />
                  )}
                </button>
              }
              label="Password"
              labelPlacement="outside"
              name="password"
              placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
              variant="bordered"
            />
            <div className="flex w-full items-center justify-between px-1 py-2">
              <Checkbox defaultSelected name="remember" size="sm">
                Remember me
              </Checkbox>
            </div>
            <Button className="w-full" color="primary" type="submit">
              Log In
            </Button>
          </Form>
        </div>
      </div>
    </DefaultLayout>
  );
}
