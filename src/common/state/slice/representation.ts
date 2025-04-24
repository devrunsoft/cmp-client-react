import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClientRepresentationEntity } from "common/domain/entity/client_representation_response";


const Representationlice = createSlice({
  name: "representationlice",
  initialState: {} as ClientRepresentationEntity,
  reducers: {
    setRepresentation: (_, action: PayloadAction<ClientRepresentationEntity>) => {
      const payload = action.payload;
      return payload;
    },
    refreshMenu: (state) => state,
  },
});

export const { setRepresentation, refreshMenu } = Representationlice.actions;

export default Representationlice.reducer;
