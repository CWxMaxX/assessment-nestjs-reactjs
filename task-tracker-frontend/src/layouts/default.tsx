import { Link } from "@heroui/link";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://chamiths-wijesooriya.webflow.io/"
          target="_blank"
          title="profile"
        >
          <span className="text-default-600">Chamith Wijesooriya | </span>
          <p className="text-primary">chamithwijesooriya@gmail.com</p>
        </Link>
      </footer>
    </div>
  );
}
