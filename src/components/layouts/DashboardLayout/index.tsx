"use client";

import styles from "./index.module.css";
import { useAddress } from "common/context/address_context";
import { usePaybleInvoice } from "components/context_api/payable_invoice_context";
import { useCard } from "components/context_api/shopping_card_context";
import { useSignableContract } from "components/context_api/signable_contract_context";
import Header from "components/header/header";
import { useLoading } from "components/loading/loading_context";
import SideBar from "components/sidebar/sideBar";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const { refreshAdr, addresses, setSelectedAddresses } = useAddress();
  const { setLoading } = useLoading();
  const { refresh } = usePaybleInvoice();
  const { refresh: refreshSignableContract } = useSignableContract();
  const { refreshCard } = useCard();
  const navigate = useNavigate();
  const { oprAddress } = useParams();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Initial data fetch
    fetch();
  }, []);

  useEffect(() => {
    // Update selected address when `oprAddress` changes
    if (oprAddress && addresses.length > 0) {
      const selectedAddress = addresses.find(
        (e) => e.Id === Number(oprAddress)
      );
      if (selectedAddress) {
        setSelectedAddresses(selectedAddress);
      } else {
        // Redirect to a valid address or show an error if not found
        navigate("/dashboard/services");
      }
    }
  }, [oprAddress, addresses]);

  async function fetch() {
    setLoading(true);
    try {
      refresh();
      refreshSignableContract();
      refreshCard();
      await refreshAdr();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <Header toggleMenu={toggleMenu} />
      <div className={styles.bottom}>
        <div className={styles.menu}>
          <SideBar isOpen={isOpen} toggleMenu={toggleMenu} />
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
