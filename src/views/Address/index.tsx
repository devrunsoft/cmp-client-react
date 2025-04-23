"use client";

import FormFrame from "components/formFrame/formFrame";
import TitleBack from "components/title/title_back";
import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import AddNewAddressForm from "./addNewAddress";

export default function NewAddressPage() {
  return <AddNewAddressFormCm />;
}

const AddNewAddressFormCm = () => {
  const { oprAddress } = useParams();

  var Id;
  if (oprAddress) {
    Id = Number(oprAddress);
  }
  return (
    <div className="pagecontent">
      <TitleBack
        title={"Add New Address"}
        icon={"/src/assets/emergency_serc_icon.svg"}
      ></TitleBack>
      <FormFrame>
        <AddNewAddressForm Id={Id} />
      </FormFrame>
    </div>
  );
};
