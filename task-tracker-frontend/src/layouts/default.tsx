import { Link } from "@heroui/link";
import { useEffect } from "react";

import { Navbar } from "@/components/navbar";
import { getUserData } from "@/utils/store";
import { logout } from "@/api/auth";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  const userType = getUserData("userType");

  useEffect(() => {
    if (!userType && window.location.pathname !== "/login") {
      logout();
      window.location.href = "/login";
      window.history.replaceState(null, "", "/login");
    }
  }, []);

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar userType={userType} />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">{children}</main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://chamiths-wijesooriya.webflow.io/"
          target="_blank"
          title="profile"
        >
          <span className="text-xs font-extralight opacity-45">Developed by Chamith Wijesooriya</span>
        </Link>
      </footer>
    </div>
  );
}
