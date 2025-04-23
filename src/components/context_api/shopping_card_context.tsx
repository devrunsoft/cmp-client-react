"use client";
import { UnAuthorize } from "common/core/either";
import { ShoppingCardEntity } from "common/domain/entity/shopping_card_entity";
import { getAllShoppingCardApi } from "data/api/shopping_card/get_all";
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { APP_ROUTES } from "../../routes/app_route";

interface ShoppingCardContextType {
  itemsCard: ShoppingCardEntity[];
  setitemsCard: React.Dispatch<React.SetStateAction<ShoppingCardEntity[]>>;
  refreshCard: () => Promise<void>;
}

const ShoppingCardContext = createContext<ShoppingCardContextType | undefined>(
  undefined
);

export const ShoppingCardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [itemsCard, setitemsCard] = React.useState<ShoppingCardEntity[]>([]);
  const navigate = useNavigate();

  async function refreshCard() {
    try {
      var result = await getAllShoppingCardApi();
      result.fold(
        (error) => {
          if (error.message) toast.error(error.message);
          if (error instanceof UnAuthorize) {
            navigate(APP_ROUTES.Login, { replace: true });
          }
        },
        (data) => {
          setitemsCard(data);
        }
      );
    } finally {
    }
  }

  return (
    <ShoppingCardContext.Provider
      value={{ itemsCard, setitemsCard, refreshCard }}
    >
      {children}
    </ShoppingCardContext.Provider>
  );
};

export const useCard = () => {
  const context = useContext(ShoppingCardContext);
  if (context === undefined) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
};
