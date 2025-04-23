"use client";
import { UnAuthorize } from "common/core/either";
import { ClientRepresentationEntity } from "common/domain/entity/client_representation_response";
import { GetAllCompanyRepresantationApi } from "data/api/contract/get_all_contract_signable_api";
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { APP_ROUTES } from "../../routes/app_route";

interface ShoppingCardContextType {
  model: Partial<ClientRepresentationEntity>;
  setModel: React.Dispatch<React.SetStateAction<Partial<ClientRepresentationEntity>>>;
  refresh: () => Promise<void>;
}

const SignableContractContext = createContext<
  ShoppingCardContextType | undefined
>(undefined);

export const SignableContractProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [model, setModel] = React.useState<Partial<ClientRepresentationEntity>>(
    {}
  );
  const navigate = useNavigate();

  async function refresh() {
    try {
      var result = await GetAllCompanyRepresantationApi();
      result.fold(
        (error) => {
          if (error.message) toast.error(error.message);
          if (error instanceof UnAuthorize) {
            navigate(APP_ROUTES.Login, { replace: true });
          }
        },
        (data) => {
          setModel(data);
        }
      );
    } finally {
    }
  }

  return (
    <SignableContractContext.Provider value={{ model, setModel, refresh }}>
      {children}
    </SignableContractContext.Provider>
  );
};

export const useSignableContract = () => {
  const context = useContext(SignableContractContext);
  if (context === undefined) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
};
