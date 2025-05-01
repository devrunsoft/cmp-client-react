"use client";
import React, { useEffect } from "react";
import styles from "../invoices/invoicesTable/invoicesTable.module.css";
import { useState } from "react";
import { MdDone, MdWatch } from "react-icons/md";
import { IoCardOutline, IoTrash } from "react-icons/io5";

import "react-confirm-alert/src/react-confirm-alert.css";

import SignContract from "./signContract/signContract";

import { CgLock } from "react-icons/cg";
import { GoClock } from "react-icons/go";
import { CompanyContractEntity } from "common/domain/entity/contract_entity";
import { useLoading } from "components/loading/loading_context";
import { useSignableContract } from "components/context_api/signable_contract_context";
import { GetAllCompanyContractApi } from "data/api/contract/get_all_contract_api";
import { GetCompanyContractApi } from "data/api/contract/get_contract_api";
import { DeleteInvoiceApi } from "data/api/invoice/delete_invoice_api";
import { InvoiceEntity } from "common/domain/entity/invoice_entity";
import { toast } from "react-toastify";
import { ContractStatis } from "common/domain/enum/contract_status";

export default function ContractTable({ contractId }: { contractId?: number }) {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [invoices, setinvoices] = useState<CompanyContractEntity[]>([]);
  const { setLoading } = useLoading();
  const [invoiceModel, setInvoiceModel] =
    useState<CompanyContractEntity | null>(null);
  const { refresh } = useSignableContract();

  const handleClick = () => {
    setButtonClicked(true);
    console.log("Кнопка нажата");
  };

  useEffect(() => {
    fetchContract();
    if (contractId) {
      fetchContractById(contractId);
    }
  }, []);

  async function fetchContract() {
    try {
      setLoading(true);
      var result = await GetAllCompanyContractApi();
      result.fold(
        (error) => {},
        (data) => {
          setinvoices(data);
        }
      );
    } finally {
      setLoading(false);
    }
  }

  async function fetchContractById(Id: number) {
    try {
      setLoading(true);
      var result = await GetCompanyContractApi(Id);
      result.fold(
        (error) => {},
        (data) => {
          setInvoiceModel(data);
        }
      );
    } finally {
      setLoading(false);
    }
  }

  const openContract = (data) => {
    // if (data.Status == 3) return;
    setInvoiceModel(data);
    // setInvoiceModalIsOpen(true);
  };

  async function Delete(model: InvoiceEntity) {
    try {
      //
      const overlay = document.querySelector(".react-confirm-alert-overlay");
      if (overlay) {
        overlay.remove();
      }
      //
      setLoading(true);
      var result = await DeleteInvoiceApi(model.Id);
      result.fold(
        (error) => {
          if (error.message) toast.error(error.message);
          setLoading(false);
        },
        (data) => {
          fetchContract();
        }
      );
    } finally {
    }
  }
  return (
    <div className={styles.table_container}>
      {invoiceModel && (
        <SignContract
          isOpen={!!invoiceModel}
          onClose={() => {
            setInvoiceModel(null);
          }}
          onSubmit={() => {
            refresh();
            fetchContract();
          }}
          model={invoiceModel}
        />
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <button className={styles.sortButton} onClick={handleClick}>
                <p>Contract Number</p>
                <img src="/assets/sort.svg" />
              </button>
            </th>
            <th>
              <button className={styles.sortButton}>
                <p>Create At</p> <img src="/assets/sort.svg" />
              </button>
            </th>
            <th>
              <button className={styles.sortButton}>
                <p>Status</p> <img src="/assets/sort.svg" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((item, index) => (
            <tr key={index}>
              <td>{item.ContractNumber}</td>
              <td>
                {new Date(item.CreatedAt).toLocaleDateString() +
                  " " +
                  new Date(item.CreatedAt).toLocaleTimeString()}
              </td>

              {/* {item.Status == InvoiceEnum.Draft ? (
                <td>---</td>
              ) : (
                <td>${item.Amount}</td>
              )} */}

              <td>
                {(() => {
                  switch (item.Status) {
                    case ContractStatis.Send:
                      return (
                        <div className={styles.buttonsDraft}>
                          <a
                            onClick={() => openContract(item)}
                            className={styles.buttonPay}
                          >
                            <IoCardOutline size={"24px"} />
                            Ready for Sign
                          </a>
                        </div>
                      );
                    case ContractStatis.Visit:
                      return (
                        <div className={styles.buttonsDraft}>
                          <a
                            onClick={() => openContract(item)}
                            className={styles.buttonPay}
                          >
                            <IoCardOutline size={"24px"} />
                            Ready for Sign
                          </a>
                        </div>
                      );
                    case ContractStatis.Signed:
                      return (
                        <a
                          onClick={() => openContract(item)}
                          className={styles.statusPaid}
                        >
                          <MdDone size={"24px"} />
                          Signed
                        </a>
                      );
                    case ContractStatis.NeedsAdminSignature:
                      return (
                        <a
                          onClick={() => openContract(item)}
                          style={{ color: "orange" }}
                          className={styles.statusPaid}
                        >
                          <GoClock size={"24px"} />
                          Pending
                        </a>
                      );
                    default:
                      return (
                        <a
                          onClick={() => openContract(item)}
                          className={styles.buttonPay}
                        >
                          <IoCardOutline size={"24px"} />
                          ---
                        </a>
                      );
                  }
                })()}
              </td>

              {/* <td>
                {item.InvoiceStatus === "paid" ? (
                  <Image
                    src="/download_icon_dark.svg"
                    onClick={() => openInvoice(item)}
                    width={"24"}
                    height={"24"}
                    alt="download icon"
                  />
                ) : (
                  <Image
                    src="/download_icon_grey.svg"
                    width={"24"}
                    height={"24"}
                    alt="download icon"
                  />
                )}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
