"use client";

import React, { useEffect, useState } from "react";
import styles from "./shoppingCard.module.css";
import { LiaEdit } from "react-icons/lia";
import { FiTrash } from "react-icons/fi";

import { AiTwotoneShopping } from "react-icons/ai";
import { MdAddShoppingCart, MdDone } from "react-icons/md";
import { useAddress } from "common/context/address_context";
import { useLoading } from "components/loading/loading_context";
import { useCard } from "components/context_api/shopping_card_context";
import { useNavigate } from "react-router-dom";
import { InvoiceEntity } from "common/domain/entity/invoice_entity";
import { AddServiceAppointmentCommand } from "common/domain/command/service_appointment/add_service_appointment_command";
import { CreateInvoiceApi } from "data/api/invoice/create_invoice_api";
import { toast } from "react-toastify";
import { APP_ROUTES } from "../../routes/app_route";
import { deleteShoppingCard } from "data/api/shopping_card/delete";
import { ButtonsForm } from "components/signUpButtons/signUpButtons";
import ShowInvoice from "components/Invoice/invoice_modal";

const ShoppingCard = () => {
  const { selectedAddresses } = useAddress();
  var { itemsCard, refreshCard } = useCard();
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const [invoiceModalIsOpen, setInvoiceModalIsOpen] = useState(false);
  const [invoiceModel, setInvoiceModel] = useState<InvoiceEntity | null>(null);

  useEffect(() => {
    refreshCard();
  }, []);

  async function creatInvoice() {
    try {
      setLoading(true);

      var commands = itemsCard.map((e) => {
        return new AddServiceAppointmentCommand(
          e.OperationalAddressId,
          e.ServicePriceCrmId,
          e.StartDate,
          e.FrequencyType,
          e.ServiceCrmId,
          e.ServiceKind
        );
      });

      var result = await CreateInvoiceApi(commands);
      await result.fold(
        (error) => {
          if (error.message) toast.error(error.message);
        },
        async (data) => {
          refreshCard();
          navigate(APP_ROUTES.Invoices);
        }
      );
    } finally {
      setLoading(false);
    }
  }
  const openInvoice = (data) => {
    setInvoiceModel(data);
    setInvoiceModalIsOpen(true);
  };

  async function unregisterService(Id: number) {
    try {
      setLoading(true);

      var result = await deleteShoppingCard(Id);
      result.fold(
        (error) => {
          if (error.message) toast.error(error.message);
        },
        (data) => {
          refreshCard();
        }
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    // <a className='pagecontent'>
    //     <TitleBack title={"Shopping Cart"} icon={"/invoices_and_payments_logo.svg"} />
    //     {
    itemsCard.length > 0 ? (
      <div className={styles.cardContainer}>
        <div className={styles.itemsContainer}>
          {itemsCard.map((item, index) => (
            <div className={styles.form} key={index}>
              <div className={styles.fakeInput}>
                {item.AddressName}
                <br />
                {item.Name} - {item.PriceName}
                <div className={styles.inputIconButton}>
                  <button
                    type="button"
                    onClick={() => unregisterService(item.Id)}
                  >
                    <FiTrash
                      size={22}
                      style={{ color: "rgba(76, 142, 59, 1)" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {invoiceModel && (
          <ShowInvoice
            isOpen={invoiceModalIsOpen}
            onClose={() => {
              setInvoiceModalIsOpen(false);
            }}
            model={invoiceModel}
          />
        )}
        <div className={styles.buttonContainer}>
          <ButtonsForm
            // hasCancel={false}
            isActive={true}
            nameOfButton={"Add another service"}
            icon={<MdAddShoppingCart size={24} />}
            status={""}
            onClick={() => {
              navigate(
                APP_ROUTES.Service.replace(
                  "{oprAddress}",
                  selectedAddresses?.Id?.toString() ?? ""
                ),
                { replace: true }
              );
            }}
            children={
              <ButtonsForm
                isActive={true}
                hasCancel={false}
                nameOfButton={"Submit"}
                status={""}
                icon={<MdDone size={24} />}
                onClick={() => {
                  creatInvoice();
                }}
              />
            }
          />
        </div>
      </div>
    ) : (
      <div className={styles.buttonContainer}>
        <AiTwotoneShopping size={400} color="rgb(241, 237, 237)" />
      </div>
    )
    //     }
    // </a>
  );
};

export default ShoppingCard;
