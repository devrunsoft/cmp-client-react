"use client";
import { UnAuthorize } from "common/core/either";
import { ShoppingCardEntity } from "common/domain/entity/shopping_card_entity";
import { getAllShoppingCardApi } from "data/api/shopping_card/get_all";
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { APP_ROUTES } from "../../routes/app_route";
import { useTermsAndCondition } from "data/repository/termsAndCondition";

interface Type {
  isOpen: boolean;
  terms: String | null;
  setOpen: (loading: boolean) => void;
}

const TermsAndConditionContext = createContext<Type | undefined>(undefined);

export const TermsAndConditionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [terms, setTerms] = React.useState<String | null>(null);
  const [isOpen, setOpen] = useState(false);
  const request = useTermsAndCondition();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    request.call({
      onSuccess: (res) => {
        setTerms(res.data);
      },
    });
  }

  return (
    <TermsAndConditionContext.Provider
      value={{ terms, isOpen, setOpen }}
    >
      {children}
    </TermsAndConditionContext.Provider>
  );
};

export const useTerms = () => {
  const context = useContext(TermsAndConditionContext);
  if (context === undefined) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
};
