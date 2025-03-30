import type { CardProps } from "@heroui/react";

import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/react";

export type StatCardProps = CardProps & {
  icon: string;
  title: string;
  color?: "primary" | "secondary" | "warning" | "danger" | "success";
  description: string;
};

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ color, title, icon, description, children, className, ...props }, ref) => {
    const colors = React.useMemo(() => {
      switch (color) {
        case "primary":
          return {
            card: "border-primary-300",
            iconWrapper: "bg-primary-50 border-primary-100",
            icon: "text-primary",
          };
        case "secondary":
          return {
            card: "border-secondary-300",
            iconWrapper: "bg-secondary-50 border-secondary-100",
            icon: "text-secondary",
          };
        case "warning":
          return {
            card: "border-warning-300",
            iconWrapper: "bg-warning-50 border-warning-100",
            icon: "text-warning",
          };
        case "danger":
          return {
            card: "border-danger-300",
            iconWrapper: "bg-danger-50 border-danger-100",
            icon: "text-danger",
          };
        case "success":
          return {
            card: "border-success-300",
            iconWrapper: "bg-success-50 border-success-100",
            icon: "text-success",
          };

        default:
          return {
            card: "border-default-300",
            iconWrapper: "bg-default-50 border-default-100",
            icon: "text-default",
          };
      }
    }, [color]);

    return (
      <Card ref={ref} className={cn("border-small", colors?.card, className)} shadow="sm" {...props}>
        <CardBody className="flex h-full flex-row items-start gap-3 p-4">
          <div className={cn("item-center flex rounded-medium border p-2", colors?.iconWrapper)}>
            <Icon className={colors?.icon} icon={icon} width={24} />
          </div>
          <div className="flex flex-col">
            <p className="text-medium">{title}</p>
            <p className="text-small text-default-400">{description || children}</p>
          </div>
        </CardBody>
      </Card>
    );
  }
);

StatCard.displayName = "StatCard";

export default StatCard;
