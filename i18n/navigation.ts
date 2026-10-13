import { createNavigation } from "next-intl/navigation";
import { locales } from "../data/locales";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation({ locales });
