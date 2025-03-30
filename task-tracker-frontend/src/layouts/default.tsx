import { Link } from "@heroui/link";

import { Navbar } from "@/components/navbar";
import { NavbarProps } from "@/types";

export default function DefaultLayout({
  children,
  navBarProps,
}: {
  children: React.ReactNode;
  navBarProps?: NavbarProps | null;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar userType={"admin"} />
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
