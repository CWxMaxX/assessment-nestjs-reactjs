import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import { Button, Image } from "@heroui/react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  GithubIcon,
  LinkedinIcon,
  GlobeIcon,
  LogoutIcon,
} from "@/components/icons";
import { NavbarProps } from "@/types";

export const Navbar = (props: NavbarProps) => {
  const currentUrl = window.location.pathname;
  const handleLogout = () => {
    window.location.href = "/login";
    window.history.replaceState(null, "", "/login");
  };

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Image alt="logo" src="/assets/logo.png" width={35} />
            <p className="font-bold text-inherit">Task Management System</p>
          </Link>
        </NavbarBrand>
        {props.userType && (
          <div className="hidden lg:flex gap-4 justify-start ml-2">
            {(props.userType === "admin"
              ? siteConfig.navItemsForAdmin
              : props.userType === "employee"
                ? siteConfig.navItemsForEmployee
                : siteConfig.navItemsEmpty
            ).map((item) => (
              <NavbarItem key={item.href}>
                <Link
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    currentUrl === item.href ? "text-red-500 font-medium" : "",
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
          </div>
        )}
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-3">
          <ThemeSwitch />
          <Link isExternal href={siteConfig.links.linkedIn} title="Twitter">
            <LinkedinIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.website} title="Discord">
            <GlobeIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link>
          {props.userType && (
            <Button isIconOnly variant="light" onPress={handleLogout}>
              <LogoutIcon />
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        {props.userType && <NavbarMenuToggle />}
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
