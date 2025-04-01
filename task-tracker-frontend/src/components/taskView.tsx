import React from "react";
import { Chip } from "@heroui/react";

import { priorityColorMap, priorityLevelMap, statusColorMap } from "./../pages/tasksPage";

import { TaskResponse } from "@/api/tasks";

interface TaskViewProps {
  taskDetails: TaskResponse;
}

const TaskView: React.FC<TaskViewProps> = (props) => {
  return (
    <div className="pb-4">
      <div className="w-full">
        <div className="w-full opacity-55 text-sm">Description :</div>
        <div>{props.taskDetails.description}</div>
      </div>
      <div className="w-full flex flex-row">
        <div className="w-1/2 pt-4 flex flex-row items-center justify-between pr-5">
          <div className="opacity-55 text-sm">Priority :</div>
          <div className="ml-4">
            <Chip className="capitalize" color={priorityColorMap[props.taskDetails.priority]} size="sm" variant="flat">
              {priorityLevelMap[props.taskDetails.priority]}
            </Chip>
          </div>
        </div>
        <div className="w-1/2 pt-4 flex flex-row items-center justify-between">
          <div className="opacity-55 text-sm">Due date :</div>
          <div className="ml-4">
            <div className="">{props.taskDetails.dueDate.split("T")[0]}</div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row">
        <div className="w-1/2 pt-4 flex flex-row items-center justify-between pr-5">
          <div className="opacity-55 text-sm">Assignee :</div>
          <div className="ml-4">
            <div className="">{props.taskDetails.assignee}</div>
          </div>
        </div>
        <div className="w-1/2 pt-4 flex flex-row items-center justify-between">
          <div className="opacity-55 text-sm">Status :</div>
          <div className="ml-4">
            <div className="">
              <Chip className="capitalize" color={statusColorMap[props.taskDetails.status]} size="sm" variant="flat">
                {props.taskDetails.status}
              </Chip>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row">
        <div className="w-full pt-4 flex flex-row items-center pr-5">
          <div className="opacity-55 text-sm">Created date :</div>
          <div className="ml-4">
            <div className="">{props.taskDetails.createdAt.split("T")[0]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskView;
