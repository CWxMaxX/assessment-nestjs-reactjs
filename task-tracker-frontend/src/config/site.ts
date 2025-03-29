export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vite + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItemsForEmployee: [
    {
      label: "Analytics",
      href: "/analytics",
    },
    {
      label: "Tasks",
      href: "/tasks",
    },
  ],
  navItemsForAdmin: [
    {
      label: "Analytics",
      href: "/analytics",
    },
    {
      label: "Employees",
      href: "/employees",
    },
  ],
  navItemsEmpty: [],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/CWxMaxX",
    linkedIn: "https://www.linkedin.com/in/chamith-wijesooriya-cwx/",
    website: "https://chamiths-wijesooriya.webflow.io/",
    login: "/login",
  },
};
