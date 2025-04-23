import React from "react";

import { Home, LucideProps } from "lucide-react";
import { APP_ROUTES } from "../../routes/app_route";

export enum LinkEnum {
  Home = 1,
  Address = 2,
  AddAddress = 3,
  Services= 4,
  EnroolServices= 5
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
    icon: "",
    href: `${APP_ROUTES.Enrollservice}`,
  },
};

export type SidebarGroupType = { key: LinkEnum; children: LinkEnum[] };

export const sidebarTree: SidebarGroupType[] = [
  { key: LinkEnum.Home, children: [] },
  { key: LinkEnum.Services, children: [] },
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
