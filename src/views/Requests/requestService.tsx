"use client";
import React, { useEffect } from "react";
import styles from "../invoices/invoicesTable/invoicesTable.module.css";
import { useState } from "react";
import { IoCardOutline, IoTrash } from "react-icons/io5";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { InvoiceEntity } from "common/domain/entity/invoice_entity";
import { useLoading } from "components/loading/loading_context";
import { GetAllInvoiceRequestApi } from "data/api/invoice/get_all_invoice_request_api";
import { InvoiceStatus } from "common/domain/enum/invoice_enum";
import { toast } from "react-toastify";
import { DeleteInvoiceApi } from "data/api/invoice/delete_invoice_api";
import ShowInvoice from "components/Invoice/invoice_modal";

export default function RequestServices() {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [invoices, setinvoices] = useState<InvoiceEntity[]>([]);
  const { setLoading } = useLoading();
  const [invoiceModalIsOpen, setInvoiceModalIsOpen] = useState(false);
  const [invoiceModel, setInvoiceModel] = useState<InvoiceEntity | null>(null);

  const handleClick = () => {
    setButtonClicked(true);
    console.log("Кнопка нажата");
  };

  useEffect(() => {
    fetchInvoice();
  }, []);

  async function fetchInvoice() {
    try {
      setLoading(true);
      var result = await GetAllInvoiceRequestApi();
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
  function invoiceHandler(model: InvoiceEntity) {
    switch (model.Status) {
      case InvoiceStatus.Draft:
        // openInvoice(model);
        toast.success(`Your request has been submitted!
                We’ll review it, prepare the contract, and send it to you ASAP.
                Thank you!`);
        break;
      // case InvoiceStatus.SentForPay:
      //   openInvoice(model);
      //   break;

      default:
        break;
    }
  }

  const openInvoice = (data) => {
    if (data.Status == "draft") return;
    setInvoiceModel(data);
    setInvoiceModalIsOpen(true);
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
          fetchInvoice();
        }
      );
    } finally {
    }
  }

  let closeDialog;

  const confirmDelete = (model: InvoiceEntity) => {
    confirmAlert({
      title: "Confirm to cancel",
      message: "Are you sure you want to cancel this request?",
      buttons: [
        {
          label: "Yes",
          onClick: () => Delete(model),
        },
        {
          label: "No",
          onClick: () => console.log("Delete canceled"),
        },
      ],
      customUI: ({ onClose }) => {
        closeDialog = onClose; // Capture onClose to programmatically close
        return (
          <div className="react-confirm-alert">
            <div />
            <div className="react-confirm-alert-body">
              <h1>Confirm to cancel</h1>
              <p>Are you sure you want to cancel this request?</p>
              <div className={styles.container}>
                <button
                  className={styles.cancelService}
                  onClick={() => {
                    onClose();
                    Delete(model);
                  }}
                >
                  Yes
                </button>
                <button className={styles.signUp} onClick={onClose}>
                  No
                </button>
              </div>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <div className={styles.table_container}>
      {invoiceModel && (
        <ShowInvoice
          open={invoiceModalIsOpen}
          onClose={() => {
            setInvoiceModalIsOpen(false);
          }}
          refresh={() => {
            fetchInvoice();
          }}
          model={invoiceModel}
        />
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <button className={styles.sortButton} onClick={handleClick}>
                <p>Number</p>
                <img src="/assets/sort.svg" />
              </button>
            </th>
            <th>
              {" "}
              <button className={styles.sortButton}>
                <p>Date</p>
                <img src="/assets/sort.svg" />
              </button>
            </th>
            <th>
              <button className={styles.sortButton}>
                <p>Amount</p> <img src="/assets/sort.svg" />
              </button>
            </th>
            <th>
              <button className={styles.sortButton}>
                <p>Status</p> <img src="/assets/sort.svg" />
              </button>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((item, index) => (
            <tr key={index}>
              <td>{item.RequestNumber}</td>
              <td>
                {new Date(item.CreatedAt).toLocaleDateString() +
                  " " +
                  new Date(item.CreatedAt).toLocaleTimeString()}
              </td>

              {item.Status == InvoiceStatus.Draft ? (
                <td>---</td>
              ) : (
                <td>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(item.Amount)}
                </td>
              )}

              <td>
                {(() => {
                  switch (item.InvoiceStatus) {
                    case InvoiceStatus.Canceled:
                    case InvoiceStatus.Deleted:
                      return (
                        <div
                          className={styles.statusPaid}
                          style={{ color: "#d42d2d", textAlign: "center" }}
                        >
                          {/* <MdDone size={"24px"} /> */}
                          {item.InvoiceStatus}
                        </div>
                      );
                    // case "sent":
                    //   return (
                    //     <div className={styles.buttonsDraft}>
                    //       <a
                    //         onClick={() => confirmDelete(item)}
                    //         className={styles.buttonDelete}
                    //       >
                    //         <IoTrash size={"24px"} />
                    //         Cancel
                    //       </a>
                    //       <a
                    //         onClick={() => invoiceHandler(item)}
                    //         className={styles.buttonPayable}
                    //       >
                    //         <IoCardOutline size={"24px"} />
                    //         {"pay"}
                    //       </a>
                    //     </div>
                    //   );
                    case InvoiceStatus.Draft:
                      return (
                        <div className={styles.buttonsDraft}>
                          <a
                            onClick={() => confirmDelete(item)}
                            className={styles.buttonDelete}
                          >
                            <IoTrash size={"24px"} />
                            Cancel
                          </a>
                          <a
                            onClick={() => invoiceHandler(item)}
                            className={styles.buttonPay}
                          >
                            <IoCardOutline size={"24px"} />
                            Draft
                          </a>
                        </div>
                      );
                    default:
                      return (
                        <a
                          onClick={() => invoiceHandler(item)}
                          className={styles.buttonPay}
                        >
                          <IoCardOutline size={"24px"} />
                          {item.InvoiceStatus.toString().replace(/_/g, " ")}
                        </a>
                      );
                  }
                })()}
              </td>

              <td>
                {item.InvoiceStatus === InvoiceStatus.Complete ? (
                  <img
                    src="/assets/download_icon_dark.svg"
                    onClick={() => openInvoice(item)}
                    width={"24"}
                    height={"24"}
                    alt="download icon"
                  />
                ) : (
                  <img
                    src="/assets/download_icon_grey.svg"
                    width={"24"}
                    height={"24"}
                    alt="download icon"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
