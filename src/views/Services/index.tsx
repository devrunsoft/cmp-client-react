'use client'

import { useAddress } from "common/context/address_context";
import { Suspense, useEffect } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import Services from "./services";


export default function ServicesPage() {
    const { oprAddress } = useParams();

    var Id;
    if (oprAddress) {
      Id = Number(oprAddress);
    }
    return (
        <Suspense>
            <ServicesPageCm Id={Id} />
        </Suspense>
    );
}

interface EditProjectProps {
    Id: number;
  }
  function ServicesPageCm(oprAddress : EditProjectProps){

    const { selectedAddresses , addresses, setSelectedAddresses } = useAddress();

    useEffect(() => {
        var data = addresses.find((e)=>e.Id==((oprAddress.Id)));
        if(data)
        setSelectedAddresses(data);
    }, [addresses]);

    return(
        <Services/>
    )
}
