import React from "react";

import { Home, Inbox, LucideProps } from "lucide-react";
import { APP_ROUTES } from "../../routes/app_route";

export enum LinkEnum {
  Home = 1,
  Address = 2,
  AddAddress = 3,
  Services = 4,
  EnroolServices = 5,
  EmergencyServices = 6,
  Requestservice = 7,
  invoices = 8,
  Contract = 9,
  Inbox = 10,
  Statistics = 11,
  Help = 12,
  Profile = 13,
  ShoppingCard = 14,
  Activation = 15,
}

export type LinkInfo = {
  title: string;
  icon: React.FunctionComponent<LucideProps> | null | string;
  href: string;
  breadCrumb?: boolean;
  countKey?: string;
};

export const mapLinkInfo: Record<LinkEnum, LinkInfo> = {
  [LinkEnum.Home]: {
    title: "Home",
    icon: Home,
    href: "/",
  },
  [LinkEnum.Address]: {
    title: "ADDRESS",
    icon: Home,
    href: `${APP_ROUTES.Address}/:oprAddress`,
  },
  [LinkEnum.AddAddress]: {
    title: "ADDRESS",
    icon: Home,
    href: `${APP_ROUTES.Address}`,
  },
  [LinkEnum.Services]: {
    title: "Services",
    icon: "/src/assets/sideIcons/white_services_icon.svg",
    href: `${APP_ROUTES.Service}`,
  },
  [LinkEnum.EnroolServices]: {
    title: "Services",
    icon: "/src/assets/sideIcons/white_services_icon.svg",
    href: `${APP_ROUTES.Enrollservice}`,
  },
  [LinkEnum.Requestservice]: {
    title: "Request service",
    icon: "/src/assets/sideIcons/request_icon.svg",
    href: `${APP_ROUTES.Requests}`,
    countKey: "Requests",
  },
  [LinkEnum.invoices]: {
    title: "Invoices and Payments",
    icon: "/src/assets/sideIcons/invoices_icon.svg",
    href: `${APP_ROUTES.Invoices}`,
    countKey: "Invoice",
  },
  [LinkEnum.EmergencyServices]: {
    title: "Emergency service",
    icon: "",
    href: `${APP_ROUTES.EnrollEmergencyService}`,
  },
  [LinkEnum.Contract]: {
    title: "Contract",
    icon: "/src/assets/sideIcons/invoices_icon.svg",
    href: "/dashboard/contract",
    countKey: "Contract",
  },
  [LinkEnum.Inbox]: {
    title: "Inbox",
    icon: Inbox,
    href: "/dashboard/inbox",
  },
  [LinkEnum.Statistics]: {
    title: "Statistics",
    icon: "/src/assets/sideIcons/statistic_icon.svg",
    href: "/dashboard/statistics",
  },
  [LinkEnum.Help]: {
    title: "Help",
    icon: "/src/assets/sideIcons/chat_icon.svg",
    href: "/dashboard/help",
  },
  [LinkEnum.Profile]: {
    title: "Profile",
    icon: "",
    href: `${APP_ROUTES.EditProfile}`,
  },
  [LinkEnum.ShoppingCard]: {
    title: "Shopping Card",
    icon: "",
    href: `${APP_ROUTES.ShoppingCard}`,
  },
  [LinkEnum.Activation]: {
    title: "Activation",
    icon: "",
    href: `${APP_ROUTES.Activation}`,
  },
};

export type SidebarGroupType = { key: LinkEnum; children: LinkEnum[] };

export const sidebarTree: SidebarGroupType[] = [
  { key: LinkEnum.Home, children: [] },
  { key: LinkEnum.Services, children: [] },
  { key: LinkEnum.Requestservice, children: [] },
  { key: LinkEnum.invoices, children: [] },
  { key: LinkEnum.Contract, children: [] },
  { key: LinkEnum.Inbox, children: [] },
  { key: LinkEnum.Statistics, children: [] },
  { key: LinkEnum.Help, children: [] },
];

export function getSidebarChildrenFromParent(
  l: LinkEnum
): SidebarGroupType | undefined {
  return sidebarTree.find((i) => i.key === l);
}

export function getLinkInfo(l: LinkEnum): LinkInfo {
  return mapLinkInfo[l];
}

export function getPath(l: LinkEnum): LinkInfo["href"] {
  return getLinkInfo(l).href;
}

export function isActiveLink(l: LinkEnum, currentHref: string): boolean {
  const isList = getSidebarChildrenFromParent(l)?.children?.length;
  const info = mapLinkInfo[l];
  if (isList) return currentHref.startsWith(info.href);
  return info.href === currentHref;
}

export function getBreadcrumbFromPath(
  href: string
): { parent: LinkInfo; info: LinkInfo } | undefined {
  let parent: LinkInfo | undefined;
  let info: LinkInfo | undefined;
  loop1: for (const group of sidebarTree) {
    for (const item of group.children) {
      const itemInfo = mapLinkInfo[item];
      if (itemInfo.href === href) {
        parent = mapLinkInfo[group.key];
        info = itemInfo;
        break loop1;
      }
    }
  }
  if (info && parent) return { parent, info };
  return undefined;
}
