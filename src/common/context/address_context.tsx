"use client";
import { OperationalAddressEntity } from "common/domain/entity/operational_address_entity";
import { useGetAllOperationalAddress } from "data/repository/operationalAddress";
import React, { createContext, useContext, ReactNode } from "react";

interface AddressContextType {
  addresses: OperationalAddressEntity[];
  setAddresses: React.Dispatch<
    React.SetStateAction<OperationalAddressEntity[]>
  >;
  refreshAdr: () => Promise<void>;
  selectedAddresses: Partial<OperationalAddressEntity>;
  setSelectedAddresses: React.Dispatch<
    React.SetStateAction<Partial<OperationalAddressEntity>>
  >;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{
  children: ReactNode;
  defaultAddress: Partial<OperationalAddressEntity>;
  address: OperationalAddressEntity[];
}> = ({ children, address, defaultAddress }) => {
  const [addresses, setAddresses] =
    React.useState<OperationalAddressEntity[]>(address);
  const [selectedAddresses, setSelectedAddresses] =
    React.useState<Partial<OperationalAddressEntity>>(defaultAddress);
  const requestPrice = useGetAllOperationalAddress();

  async function refreshAdr() {
    requestPrice.call({
      onSuccess: (res) => {
        setAddresses(res.data);
      },
    });
  }

  return (
    <AddressContext.Provider
      value={{
        addresses,
        setAddresses,
        selectedAddresses,
        setSelectedAddresses,
        refreshAdr,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
};
