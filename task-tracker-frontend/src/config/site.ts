export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vite + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItemsForEmployee: [
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
      label: "Tasks",
      href: "/tasks",
    },
    {
      label: "Employees",
      href: "/employees",
    },
  ],
  navItemsEmpty: [],

  links: {
    github: "https://github.com/CWxMaxX",
    linkedIn: "https://www.linkedin.com/in/chamith-wijesooriya-cwx/",
    website: "https://chamiths-wijesooriya.webflow.io/",
    login: "/login",
  },
};
