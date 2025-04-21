import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const PAGE_SIZE_STORAGE_KEY = "_datatable_page_size";
const DEFAULT_PAGE_SIZE = 15;
function getInitPageSize(): number {
  const storage = localStorage.getItem(PAGE_SIZE_STORAGE_KEY);
  return storage && !isNaN(+storage) ? +storage : DEFAULT_PAGE_SIZE;
}

type ConfigSliceType = {
  pageSize: number; // Datatable page size
};

const INITIAL_STATE: ConfigSliceType = {
  pageSize: getInitPageSize(),
};

const ConfigSlice = createSlice({
  name: "menu",
  initialState: INITIAL_STATE,
  reducers: {
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      localStorage.setItem(PAGE_SIZE_STORAGE_KEY, action.payload.toString());
      return state;
    },
  },
});

export const { setPageSize } = ConfigSlice.actions;

export default ConfigSlice.reducer;
