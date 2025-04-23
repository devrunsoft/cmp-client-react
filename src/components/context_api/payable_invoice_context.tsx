"use client";
import { UnAuthorize } from "common/core/either";
import { InvoiceEntity } from "common/domain/entity/invoice_entity";
import { GetAllInvoicePayableApi } from "data/api/invoice/get_all_invoice_payable_api";
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { APP_ROUTES } from "../../routes/app_route";

interface ShoppingCardContextType {
  model: InvoiceEntity[];
  setModel: React.Dispatch<React.SetStateAction<InvoiceEntity[]>>;
  refresh: () => Promise<void>;
}

const InvoicePayableContext = createContext<
  ShoppingCardContextType | undefined
>(undefined);

export const InvoicePayableProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [model, setModel] = React.useState<InvoiceEntity[]>([]);
  const navigate = useNavigate();

  async function refresh() {
    try {
      var result = await GetAllInvoicePayableApi();
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
    <InvoicePayableContext.Provider value={{ model, setModel, refresh }}>
      {children}
    </InvoicePayableContext.Provider>
  );
};

export const usePaybleInvoice = () => {
  const context = useContext(InvoicePayableContext);
  if (context === undefined) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
};
