"use client";
import styles from "./sideBar.module.css";
import MenuLink from "./menuLink/menuLink";
import { useSignableContract } from "components/context_api/signable_contract_context";
import { APP_ROUTES } from "../../routes/app_route";

export default function SideBar({ isOpen, toggleMenu }) {
  var { model } = useSignableContract();
  var menuItems = [
    {
      title: "Home",
      path: "/dashboard",
      // status: "red",
      status: "",
      quantity: 2,
      icon: "",
      type: "",
      count: 0,
    },
    {
      title: "Services",
      path: APP_ROUTES.Service,
      status: "",
      icon: "/sideIcons/white_services_icon.svg",
      type: "",
      count: 0,
    },
    {
      title: "Request service",
      path: APP_ROUTES.Requests,
      status: "",
      icon: "/sideIcons/request_icon.svg",
      type: "",
      count: model.Requests,
    },
    {
      title: "Invoices and Payments",
      path: "/dashboard/invoices",
      // status: "yellow",
      status: "",
      quantity: 2,
      icon: "/sideIcons/invoices_icon.svg",
      type: "Invoices",
      count: model.Invoice,
    },
    {
      title: "Contract",
      path: "/dashboard/contract",
      // status: "yellow",
      status: "",
      quantity: 2,
      icon: "/sideIcons/invoices_icon.svg",
      type: "Contract",
      count: model.Contract,
    },
    {
      title: "Inbox",
      path: APP_ROUTES.Service,
      // status: "yellow",
      status: "",
      quantity: 2,
      icon: "",
      type: "",
      count: 0,
    },
    {
      title: "Statistics",
      path: APP_ROUTES.Service,
      status: "",
      icon: "/sideIcons/statistic_icon.svg",
      type: "",
      count: 0,
    },
    {
      title: "Help",
      path: APP_ROUTES.Service,
      status: "",
      icon: "/sideIcons/chat_icon.svg",
      type: "",
      count: 0,
    },
  ];
  return (
    <>
      <div className={`${styles.sideBar} ${isOpen ? styles.open : ""}`}>
        <nav>
          <ul className={styles.list}>
            {menuItems.map((cat, index) => (
              <div className={styles.iconContainer} key={index}>
                <MenuLink item={cat} />
                {cat && cat.count! > 0 && (
                  <span className={styles.badge}>{cat.count}</span>
                )}
              </div>
            ))}
          </ul>
        </nav>
        <div className={styles.mobileNavigation}>
          <div className={styles.navigSec}>
            <button className={styles.notifiButton}>
              <img
                src="/heroicons_bell.svg"
                alt="jsdnchusld"
                width={"24"}
                height={"24"}
              />
            </button>
            <img
              src="/avatar.png"
              alt="avatar"
              width={54}
              height={54}
              style={{ borderRadius: "50%" }}
            />
          </div>
          {/* <ButtonChangeUser /> */}
        </div>
      </div>
      <div
        className={`${styles.cover} ${isOpen ? styles.coverOpen : ""}`}
        onClick={toggleMenu}
      ></div>
    </>
  );
}
