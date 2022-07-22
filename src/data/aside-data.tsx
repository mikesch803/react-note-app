import React from "react";
import { ArchiveIcon, HomeIcon, TrashIcon, UserIcon } from "../assests/icons";

type AsideDataTypes = {
  to: string;
  text: string;
  icon: React.ReactNode;
}[];

export const asideData: AsideDataTypes = [
  { to: "/home", text: "home", icon: <HomeIcon /> },
  { to: "/archive", text: "archive", icon: <ArchiveIcon /> },
  { to: "/trash", text: "trash", icon: <TrashIcon /> },
  { to: "/profile", text: "profile", icon: <UserIcon /> },
];
