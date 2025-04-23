"use client";
import { useAddress } from "common/context/address_context";
import styles from "./dashboard.module.css";

import { useEffect, useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../routes/app_route";
import { OperationalAddressEntity } from "common/domain/entity/operational_address_entity";


export default function Dashboard() {
  const { addresses ,selectedAddresses } = useAddress();
  const { setSelectedAddresses } = useAddress();

  const navigate = useNavigate();


  const handleClick = (model: OperationalAddressEntity) => {
    navigate(`${APP_ROUTES.Address}/${model.Id}`, undefined);
  };

  const selectService = (model: OperationalAddressEntity) => {
    setSelectedAddresses(model);
    navigate(`${APP_ROUTES.Service.replace(":oprAddress", model.Id?.toString()??"") }`, undefined);
  };
  const addNewAdderss = () => {
    navigate(APP_ROUTES.Address, undefined);
  };



  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h1>Manage your Locations</h1>
        <button className={styles.newButtom} onClick={addNewAdderss}>
          ADD NEW ADDRESS
        </button>
      </div>
      <div>
        {addresses.map((address: OperationalAddressEntity, index) => (
          <div
            key={index}
            className={styles.addressItem}
            onClick={() => selectService(address)}
          >
            <div className={styles.inputIconButton}>
              <div className={styles.textContainer}>
                <span>{address.Name}</span>
                <p className={styles.addressInfo}>{address.Address}</p>
              </div>
              <LiaEdit
                className="icon"
                onClick={(event) => {
                  event.stopPropagation();
                  handleClick(address)
                }}
                size={26}
                style={{ color: "rgba(76, 142, 59, 1)" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
