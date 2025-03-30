import type { ButtonProps, CardProps } from "@heroui/react";

import React from "react";
import { ResponsiveContainer, RadialBarChart, RadialBar, Cell, PolarAngleAxis } from "recharts";
import { Card, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, cn } from "@heroui/react";
import { Icon } from "@iconify/react";
import { analyticsData } from "@/data/analyticsData";

type ChartData = {
  name: string;
  value: number;
  [key: string]: string | number;
};

type CircleChartProps = {
  name: string;
  color: ButtonProps["color"] | string;
  chartData: ChartData[];
  total: number;
  due: number;
  pending: number;
  completed: number;
  department: string;
};

const data: CircleChartProps[] = analyticsData.taskCompletionAnalyticsData;

export default function EmployeesCardSection() {
  return (
    <dl className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {data.map((item, index) => (
        <CircleChartCard key={index} {...item} />
      ))}
    </dl>
  );
}

const CircleChartCard = React.forwardRef<HTMLDivElement, Omit<CardProps, "children"> & CircleChartProps>(
  ({ className, name, color, chartData, total, due, completed, pending, department, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn("h-[250px] border border-transparent dark:border-default-100", className)}
        {...props}
      >
        <div className="flex flex-col gap-y-2 p-4 pb-0">
          <div className="flex items-center justify-between gap-x-2">
            <dt>
              <h3 className="text-small font-medium text-default-900">{name}</h3>
              <span className="text-tiny  text-default-500">{department}</span>
            </dt>
            <div className="flex items-center justify-end gap-x-2">
              <Dropdown
                classNames={{
                  content: "min-w-[120px]",
                }}
                placement="bottom-end"
              >
                <DropdownTrigger>
                  <Button isIconOnly radius="full" size="sm" variant="light">
                    <Icon height={16} icon="solar:menu-dots-bold" width={16} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  itemClasses={{
                    title: "text-tiny",
                  }}
                  variant="flat"
                >
                  <DropdownItem key="view-details">View Details</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full gap-x-3">
          <ResponsiveContainer className="[&_.recharts-surface]:outline-none" height="70%" width="100%">
            <RadialBarChart
              barSize={10}
              cx="50%"
              cy="50%"
              data={chartData}
              endAngle={-45}
              innerRadius={80}
              outerRadius={60}
              startAngle={225}
            >
              <PolarAngleAxis angleAxisId={0} domain={[0, total]} tick={false} type="number" />
              <RadialBar
                angleAxisId={0}
                animationDuration={1000}
                animationEasing="ease"
                background={{
                  fill: "hsl(var(--heroui-default-100))",
                }}
                cornerRadius={12}
                dataKey="value"
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`hsl(var(--heroui-${color === "default" ? "foreground" : color}))`}
                  />
                ))}
              </RadialBar>
              <g>
                <text textAnchor="middle" x="50%" y="48%">
                  <tspan className="fill-default-500 text-tiny" dy="-1em" x="50%">
                    {chartData[0].name}
                  </tspan>
                  <tspan className="fill-foreground text-large font-semibold" dy="1.5em" x="50%">
                    {`${((chartData[0].value / total) * 100).toFixed(2)}%`}
                  </tspan>
                </text>
              </g>
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="w-full grid grid-cols-2 gap-2 fill-default-500 text-tiny opacity-55">
            <div className="pl-3">Total : {total}</div>
            <div className="pl-3">Completed : {completed}</div>
            <div className="pl-3">Pending : {pending}</div>
            <div className="pl-3">Due : {due}</div>
          </div>
        </div>
      </Card>
    );
  }
);

CircleChartCard.displayName = "CircleChartCard";
