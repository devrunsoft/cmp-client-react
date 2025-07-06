"use client";
import styles from "./paymentForm.module.css";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CgInfo } from "react-icons/cg";
import { useLoading } from "components/loading/loading_context";
import { addBilling } from "data/api/register/bilingInformation/add";
import PaymentAddressCm from "cmp-core/src/Component/PaymentAddress/PaymentAddress.tsx";
import { NextButton } from "components/button/next/next";
import { useTerms } from "components/context_api/terms_and_conditions";
import SignUpStep from "uikit/src/Stepper";
import { Button, TextField, Typography, Divider } from "@mui/material";
import Gap from "uikit/src/Gap";
import {
  BillingInfromationCommand,
  InfromationCommand,
} from "common/domain/command/billing_information_command";
import MultiPaymentAddressCm from "./multiPayment";
import { useGetInformation } from "data/repository/billingInfromation";
import { mapBillingEntityToCommand } from "common/domain/entity/infromation_entity";

const PaymentForm = ({ onRegistrationSuccess, setIndex }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { setLoading } = useLoading();
  const { setOpen, isOpen } = useTerms();
  const [corporateAddress, setCorporateAddress] = useState("");
  const request = useGetInformation();

  const loadData = () => {
    request.call({
      onSuccess(result) {
        if (result.data.billingInformation) {
          setBillingList(
            result.data.billingInformation.map((e) =>
              mapBillingEntityToCommand(e)
            )
          );
        }
        setCorporateAddress(result.data.CorporateAddress ?? "");
      },
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const [billingList, setBillingList] = useState<BillingInfromationCommand[]>([
    {
      CardholderName: "",
      CardNumber: "",
      Expiry: 0,
      CVC: "",
      Address: "",
      City: "",
      State: "",
      ZIPCode: "",
      IsPaypal: false,
    },
  ]);

  const addNewPaymentMethod = () => {
    setBillingList([
      ...billingList,
      {
        CardholderName: "",
        CardNumber: "",
        Expiry: 0,
        CVC: "",
        Address: "",
        City: "",
        State: "",
        ZIPCode: "",
        IsPaypal: false,
      },
    ]);
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      const payload: InfromationCommand = {
        CorporateAddress: corporateAddress,
        BilingInformationInputs: billingList,
      };

      const result = await addBilling(payload);
      result.fold(
        (s) => {},
        (_) => onRegistrationSuccess()
      );
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = (index, field, value) => {
    const updated = [...billingList];
    updated[index][field] = value;
    setBillingList(updated);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <SignUpStep
          step={0}
          count={3}
          onTap={(s) => {
            setIndex!(s + 2);
          }}
        />

        <Gap />

        <Typography variant="h6" gutterBottom>
          Corporate Address
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter corporate address"
          value={corporateAddress}
          onChange={(e) => setCorporateAddress(e.target.value)}
        />

        <Gap />
        <Divider />
        <Gap />

        {billingList.map((entry, index) => (
          <div key={index} className={styles.paymentBlock}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600 }}
              gutterBottom
            >
              Billing Address #{index + 1}
            </Typography>
            <MultiPaymentAddressCm
              onSelectAddress={(address, lat, lng, city, postalCode, state) => {
                updateAddress(index, "Address", address);
                updateAddress(index, "City", city);
                updateAddress(index, "ZIPCode", postalCode);
                updateAddress(index, "State", state);
              }}
              // register={register}
              // setValue={setValue}
              // errors={errors}
              defaultValue={entry}
            />
            <Gap />
            <Divider />
            <Gap />
          </div>
        ))}

        <Button
          variant="contained"
          fullWidth
          onClick={addNewPaymentMethod}
          color="primary"
        >
          + Add Another Billing Address
        </Button>

        <Gap />

        <div className={styles.info}>
          <CgInfo style={{ minWidth: "18px" }} />
          <p className={styles.privacyPolicyText}>
            By clicking the button, you confirm that you have read and agree to
            Ecoenergy
            <a style={{ cursor: "pointer" }} onClick={() => setOpen(!isOpen)}>
              {" "}
              Terms and Conditions
            </a>{" "}
            and
            <a style={{ cursor: "pointer" }} onClick={() => setOpen(!isOpen)}>
              {" "}
              Privacy Policy.
            </a>
          </p>
        </div>

        <div className={styles.buttonLine}>
          <Button
            variant="text"
            color="default"
            onClick={onRegistrationSuccess}
          >
            Skip
          </Button>
          <NextButton onClick={null} />
        </div>
      </form>
    </>
  );
};

export default PaymentForm;
