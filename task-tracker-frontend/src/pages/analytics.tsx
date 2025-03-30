import React from "react";
import { Divider } from "@heroui/react";

import DefaultLayout from "@/layouts/default";
import StatCard from "@/components/statCard";
import EmployeesCardSection from "@/components/employeesCardSection";

const Analytics: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
          <StatCard color="primary" description="All Tasks" icon="solar:clipboard-list-broken" title="30" />
          <StatCard color="success" description="Completed Tasks" icon="ic:outline-task" title="16" />
          <StatCard color="secondary" description="Pending Tasks" icon="ic:round-pending-actions" title="8" />
          <StatCard color="warning" description="Due Tasks" icon="pajamas:calendar-overdue" title="2" />
        </div>
      </div>
      <Divider className="my-4" />
      <div>
        <h1 className="mb-5">Task Completion Analytics</h1>
        <EmployeesCardSection />
      </div>
    </DefaultLayout>
  );
};

export default Analytics;
