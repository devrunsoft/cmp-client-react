import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClientRepresentationEntity } from "common/domain/entity/client_representation_response";
import { OperationalAddressEntity } from "common/domain/entity/operational_address_entity";
import { useAppDispatch } from "..";

const AddressSlice = createSlice({
  name: "addressSlice",
  initialState: {} as OperationalAddressEntity,
  reducers: {
    setAddress: (_, action: PayloadAction<OperationalAddressEntity>) => {
      const payload = action.payload;
      return payload;
    },
    refreshMenu: (state) => state,
  },
});

export const { setAddress, refreshMenu } = AddressSlice.actions;

export default AddressSlice.reducer;

// export const setSelectAddress = (model: OperationalAddressEntity) => {
//   var dispatch = useAppDispatch();
//   dispatch(setAddress(model));
// };
