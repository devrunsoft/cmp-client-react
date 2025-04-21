// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { UserType } from "types/user";

// type UserSliceType = {
//   user: UserType;
//   selectedRoleID: number;
// } | null;

// const UserSlice = createSlice({
//   name: "user",
//   initialState: null as UserSliceType,
//   reducers: {
//     setUser: (state, action: PayloadAction<UserType | null>): UserSliceType => {
//       const payload = action.payload;
//       if (payload === null) return null;
//       if (state === null) {
//         return {
//           user: payload,
//           selectedRoleID: payload.postStatementOrPositions[0].id as number,
//         };
//       }
//       return { ...state, user: { ...state, ...action.payload } as UserType };
//     },
//     logout: () => {
//       return null;
//     },
//     selectRole: (state, action: PayloadAction<number>) => {
//       const payload = action.payload;
//       if (!state?.user) return null;
//       const exists = state.user.postStatementOrPositions.find(
//         (i) => i.id === payload
//       );
//       if (exists) {
//         state.selectedRoleID = payload;
//       }
//     },
//   },
// });

// export const { logout, setUser, selectRole } = UserSlice.actions;

// export default UserSlice.reducer;
