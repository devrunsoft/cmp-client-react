import { configureStore, Tuple } from "@reduxjs/toolkit";

import logger from "redux-logger";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import configReducer from "./slice/config";
import representationlice from "./slice/representation";

export const makeStore = () => {
  return configureStore({
    reducer: {
      representation: representationlice,
      config: configReducer,
    },
    middleware: () => new Tuple(logger),
  });
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
