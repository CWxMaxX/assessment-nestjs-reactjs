/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { SVGProps, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Checkbox,
} from "@heroui/react";

import DefaultLayout from "@/layouts/default";
import { ChevronDownIcon, EyeIcon, PlusIcon, TableSearchIcon } from "@/components/icons";
import CommonModal from "@/components/commonModal";
import CreateTaskForm from "@/components/createTaskForm";
import { fetchAllTasks, fetchAllTasksWithAssignee, TaskResponse, updateTaskStatus } from "@/api/tasks";
import TaskView from "@/components/taskView";
import { getUserData } from "@/utils/store";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const columns = [
  { name: "Task ID", uid: "id", sortable: true },
  { name: "Title", uid: "title", sortable: false },
  { name: "Description", uid: "description", sortable: false },
  { name: "Priority", uid: "priority", sortable: true },
  { name: "Due Date", uid: "dueDate", sortable: true },
  { name: "Assignee", uid: "assignee", sortable: true },
  { name: "Status", uid: "status", sortable: true },
  { name: "Actions", uid: "actions" },
];

export const statusOptions = [
  { name: "Todo", uid: "todo" },
  { name: "Done", uid: "done" },
];

export const priorityLevelMap: Record<string, string> = {
  l1: "High",
  l2: "Medium",
  l3: "Low",
};
export const priorityColorMap: Record<string, ChipProps["color"]> = {
  l1: "danger",
  l2: "warning",
  l3: "success",
};

export const statusColorMap: Record<string, ChipProps["color"]> = {
  done: "success",
  todo: "primary",
};

const INITIAL_VISIBLE_COLUMNS = ["id", "title", "description", "priority", "dueDate", "status", "actions"];

export default function TasksPage() {
  const [tasks, setTasks] = React.useState<TaskResponse[]>([]);
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "status",
    direction: "descending",
  });

  const [page, setPage] = React.useState(1);
  const userType = getUserData("userType");
  const userId = getUserData("id");
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...tasks];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((task) =>
        (task.id + " " + task.title + " " + task.description).toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((task) => Array.from(statusFilter).includes(task.status));
    }

    return filteredUsers;
  }, [tasks, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: TaskResponse, b: TaskResponse) => {
      const first = a[sortDescriptor.column as keyof TaskResponse] as number;
      const second = b[sortDescriptor.column as keyof TaskResponse] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const handleUpdateTaskStatus = async (taskId: number, status: "todo" | "done") => {
    try {
      const toggledStatus = status === "todo" ? "done" : "todo";

      await updateTaskStatus(taskId, toggledStatus);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const renderCell = React.useCallback((task: TaskResponse, columnKey: React.Key) => {
    const cellValue = task[columnKey as keyof TaskResponse];

    switch (columnKey) {
      case "description":
        return <div className="opacity-55">{task.description}</div>;
      case "dueDate":
        return <div>{task.dueDate.split("T")[0]}</div>;
      case "priority":
        return (
          <Chip className="capitalize" color={priorityColorMap[task.priority]} size="sm" variant="flat">
            {priorityLevelMap[task.priority]}
          </Chip>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[task.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-4">
            <div
              className="z-10"
              role="button"
              onClick={() => {
                console.log("Checked clicked");
                handleUpdateTaskStatus(task.id, task.status as "todo" | "done");
              }}
            >
              <Checkbox
                className="hover:opacity-55 -z-10"
                isSelected={task.status === "todo" ? false : true}
                name="remember"
                size="sm"
                onClick={() => {
                  handleUpdateTaskStatus(task.id, task.status as "todo" | "done");
                }}
              />
            </div>
            <CommonModal
              actionFunction={() => {
                handleUpdateTaskStatus(task.id, task.status as "todo" | "done");
              }}
              actionTitle={task.status === "todo" ? "Mark as done" : "Mark as todo"}
              body={<TaskView taskDetails={task} />}
              button={
                <div className="p-2">
                  <EyeIcon className="hover:opacity-55 " size={20} />
                </div>
              }
              title={task.id + " - " + task.title}
            />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const fetchTasks = React.useCallback(async () => {
    try {
      const fetchedTasks = userType === "admin" ? await fetchAllTasks() : await fetchAllTasksWithAssignee(userId);

      fetchedTasks.sort((a, b) => {
        if (a.status === "done" && b.status !== "done") return 1;
        if (a.status !== "done" && b.status === "done") return -1;

        return 0;
      });
      setTasks(fetchedTasks);
      setPage(1);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by id, title, description..."
            startContent={<TableSearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {userType === "admin" && (
              <CommonModal
                body={<CreateTaskForm onTaskCreated={fetchTasks} />}
                button={
                  <Button className="-z-10" color="primary" endContent={<PlusIcon />}>
                    Add New
                  </Button>
                }
                title="Create New Task"
              />
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {tasks.length} tasks</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select className="bg-transparent outline-none text-default-400 text-small" onChange={onRowsPerPageChange}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, statusFilter, visibleColumns, onSearchChange, onRowsPerPageChange, tasks.length, hasSearchFilter]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <div className="hidden sm:flex w-[30%] justify-start gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
        </div>
        <div className="flex justify-center flex-row w-full">
          <Pagination isCompact showControls showShadow color="primary" page={page} total={pages} onChange={setPage} />
        </div>
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <DefaultLayout>
      <Table
        isHeaderSticky
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[60vh] sm:max-h-[54vh] 2xl:max-h-[60vh]",
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No tasks found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
          )}
        </TableBody>
      </Table>
    </DefaultLayout>
  );
}
