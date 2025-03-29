import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type NavbarProps = {
  userType?: "employee" | "admin" | null;
};
