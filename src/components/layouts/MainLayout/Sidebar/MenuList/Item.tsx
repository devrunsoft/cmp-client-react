import { isActiveLink, LinkEnum, mapLinkInfo } from "common/menu-items";
import { Link, useLocation } from "react-router-dom";

import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import Badge from "@mui/material/Badge"; // Import Badge component

import styles from "./index.module.scss";
import useRoleAccess from "hooks/useRoleAccess";

export default function ItemLink({
  item,
  isGroup,
  isChild,
  onClick,
  groupSelect,
}: // count = 0, // Pass the count of items dynamically
{
  groupSelect?: boolean;
  item: LinkEnum;
  isGroup?: boolean;
  isChild?: boolean;
  // count?: number; // Badge count
  onClick?: () => void;
}) {
  const info = mapLinkInfo[item];
  const I = info.icon;
  const { pathname } = useLocation();
  const linkActive = isActiveLink(item, pathname);
  const selected = linkActive || groupSelect;
  const { hasAccessMenu, checkCount } = useRoleAccess();

  // if (!hasAccessMenu(item)) return null;

  const textColor = true
    ? isGroup
      ? "primary.contrastText"
      : "primary.contrastText"
    : isGroup
    ? "grey.500"
    : "text.primary";

  return (
    <ListItemButton
      {...(!isGroup || info.href === "/"
        ? { to: info.href, component: Link }
        : {})}
      onClick={onClick}
      className={`
        ${styles.container} 
        ${isGroup ? styles.group_item : ""} 
        ${linkActive ? styles.selected : ""}
      `}
      disableRipple
      selected={selected}
    >
      <Typography
        flexGrow="1"
        textAlign="center"
        variant="labelSm"
        color={textColor}
        className="flex items-center"
        lineHeight="20px"
        sx={{
          paddingLeft: isChild ? "10px" : "",
          gap: "6px",
        }}
      >
        {!!I && <I size={24} />}

        {/* Badge for the item count */}
        <Badge
          badgeContent={checkCount(item)} // Display count here
          color="primary"
          sx={{ ml: 1 }}
        >
          {info.title}
        </Badge>
      </Typography>
    </ListItemButton>
  );
}
