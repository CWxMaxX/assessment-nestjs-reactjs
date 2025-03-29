import { Route, Routes } from "react-router-dom";

import TasksPage from "@/pages/tasksPage";
import Employees from "@/pages/employees";
import Analytics from "@/pages/analytics";
import LoginPage from "@/pages/loginPage";
import IndexPage from "@/pages/index";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<TasksPage />} path="/tasks" />
      <Route element={<Employees />} path="/employees" />
      <Route element={<Analytics />} path="/analytics" />
    </Routes>
  );
}

export default App;
