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
import TitleBack from "components/title/title_back";
import Gap from "uikit/src/Gap";
import { mapBillingEntityToNameAndValue } from "common/domain/entity/infromation_entity";
import { NameAndValue } from "core/src/types/nameAndValue";
import { useGetInformation } from "data/repository/billingInfromation";
import { AppDropDown } from "uikit/src/DropDown";
import { Box } from "@mui/material";
import { AppTitle } from "uikit/src/TitleBack";
import { ArrowBack } from "@mui/icons-material";

const ShoppingCard = () => {
  const { selectedAddresses } = useAddress();
  var { itemsCard, refreshCard } = useCard();
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const request = useGetInformation();
  const [billingList, setBillingList] = useState<NameAndValue[]>([]);
  const [selectedBilling, setselectedBilling] = useState<number | null>(
    null
  );
  const loadData = () => {
    request.call({
      onSuccess(result) {
        if (result.data.billingInformation) {
          setBillingList(
            result.data.billingInformation.map((e) =>
              mapBillingEntityToNameAndValue(e)
            )
          );
        }
      },
    });
  };

  useEffect(() => {
    refreshCard();
    loadData();
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

      var result = await CreateInvoiceApi(commands, selectedBilling!);
      await result.fold(
        (error) => {
          if (error.message) toast.error(error.message);
        },
        async (data) => {
          refreshCard();
          navigate(APP_ROUTES.Requests);
        }
      );
    } finally {
      setLoading(false);
    }
  }

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
  function handleChange(status: number) {
    setselectedBilling(status);
  }
  return (
    <div className="pagecontent">
      <Box className="flex justify-between">
        <AppTitle title={"Shopping Cart"} icon={<></>} />
        <AppDropDown
          hint="Please select a billing address"
          handleChange={handleChange}
          options={billingList}
          selected={selectedBilling}
        />
      </Box>
      {itemsCard.length > 0 ? (
        <div className={styles.cardContainer}>
          <div className={styles.itemsContainer}>
            {itemsCard.map((item, index) => (
              <div className={styles.form} key={index}>
                <div className={styles.fakeInput}>
                  {item.AddressName}
                  <br />
                  {item.Name} - {item.PriceName}
                  <br />
                  Quantity: {item.Qty}
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

          <div className={styles.buttonContainer}>
            <ButtonsForm
              // hasCancel={false}
              nameOfButton={"Add another service"}
              icon={<MdAddShoppingCart size={24} />}
              status={""}
              onClick={() => {
                navigate(
                  APP_ROUTES.Service.replace(
                    ":oprAddress",
                    selectedAddresses?.Id?.toString() ?? ""
                  ),
                  { replace: true }
                );
              }}
              children={
                <ButtonsForm
                  isActive={!!selectedBilling}
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
      )}
    </div>
  );
};

export default ShoppingCard;
