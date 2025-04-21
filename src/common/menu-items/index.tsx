import React from "react";

import { Home, LucideProps } from "lucide-react";

export enum LinkEnum {
  Home = 1,
  Profile = 2,
  Invoice = 3,
  Manifest = 4,
}

export type LinkInfo = {
  title: string;
  icon: React.FunctionComponent<LucideProps> | null;
  href: string;
  breadCrumb?: boolean;
  countKey?: string;
};

export const mapLinkInfo: Record<LinkEnum, LinkInfo> = {
  [LinkEnum.Home]: {
    title: "HOME",
    icon: Home,
    href: "/",
  },
  [LinkEnum.Profile]: {
    title: "PROFILE",
    icon: Home,
    href: "/profile",
  },
  [LinkEnum.Invoice]: {
    title: "INVOICE",
    icon: Home,
    href: "/invoice",
  },
  [LinkEnum.Manifest]: {
    title: "MANIFEST",
    icon: Home,
    href: "/manifest",
  },
};

export type SidebarGroupType = { key: LinkEnum; children: LinkEnum[] };

export const sidebarTree: SidebarGroupType[] = [
  { key: LinkEnum.Home, children: [] },
  { key: LinkEnum.Profile, children: [] },
  // { key: LinkEnum.Invoice, children: [] },
  { key: LinkEnum.Manifest, children: [] },
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
