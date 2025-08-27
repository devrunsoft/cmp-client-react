"use client";

import { useAddress } from "common/context/address_context";
import { Suspense, useEffect } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Services from "./services";
import { APP_ROUTES } from "../../routes/app_route";
import { setAddress } from "state/slice/address";
import { useAppDispatch } from "state/index";

export default function ServicesPage() {
  const { oprAddress } = useParams();

  var Id;
  if (oprAddress) {
    Id = Number(oprAddress);
  }
  return <ServicesPageCm Id={Id} />;
}

interface EditProjectProps {
  Id: number;
}
function ServicesPageCm(oprAddress: EditProjectProps) {
  const { selectedAddresses, addresses, setSelectedAddresses } = useAddress();
  const navigate = useNavigate();
  var dispatch = useAppDispatch();

  useEffect(() => {
    var data = addresses.find((e) => e.Id == oprAddress.Id);
    if (data) {
      setSelectedAddresses(data);
      dispatch(setAddress(data));
    } else if (addresses.length) {
      // var d = addresses[0];
      // setSelectedAddresses(d);
      // dispatch(setAddress(d));
      // if (oprAddress.Id == 0) {
      //   navigate(
      //     APP_ROUTES.Service.replace(":oprAddress", d?.Id?.toString() ?? ""),
      //     { replace: true }
      //   );
      // }
    }
  }, [addresses]);

  return <Services />;
}
