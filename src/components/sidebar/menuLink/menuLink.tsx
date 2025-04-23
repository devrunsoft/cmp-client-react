"use client";

import { useAddress } from "common/context/address_context";
import styles from "./menuLink.module.css";
import { GoHome } from "react-icons/go";
import { GoInbox } from "react-icons/go";
import { Link } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function MenuLinks({ item }) {
  const { selectedAddresses } = useAddress();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <li className={styles.cat} key={item.index}>
      <Link
        href={item.path.replace(
          "{oprAddress}",
          selectedAddresses?.Id?.toString()??""
        )}
        className={`${styles.container} ${
          pathname == item.path && styles.active
        }`}
      >
        {item.icon ? (
          <img src={item.icon} width={24} height={24} alt="icon" />
        ) : item.title === "Home" ? (
          <GoHome size={24} />
        ) : (
          <GoInbox size={"24"} />
        )}

        <div className={styles.categoryText}>{item.title}</div>

        {item.status === "" ? null : (
          <div
            className={`${styles.statusCircle} ${
              item.status === "red" ? styles.warning : styles.message
            }`}
          >
            {item.quantity}
          </div>
        )}
      </Link>
    </li>
  );
}
