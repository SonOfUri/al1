import { createSlice } from "@reduxjs/toolkit";
import { TNullableString } from "@base/types/common";

type TUserAccountState = {
  accountAddress: TNullableString;
  ensName: TNullableString;
  ensAvatar: TNullableString;
  isGuest: boolean | null;
  isLoading: boolean;
  pepecoinBalance: TNullableString;
};

const defaultState: TUserAccountState = {
  isGuest: null,
  isLoading: false,
  accountAddress: localStorage.getItem("accountAddress") || null,
  ensName: localStorage.getItem("ensName") || null,
  ensAvatar: localStorage.getItem("ensAvatar") || null,
  pepecoinBalance: null,
};

export const userAccountSlice = createSlice({
  name: "userAccount",
  initialState: defaultState,
  reducers: {
    setIsGuest: (state, action) => {
      state.isGuest = action.payload;
    },
    setEnsDataLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAccountAddress: (state, action) => {
      state.accountAddress = action.payload;
    },
    setEnsName: (state, action) => {
      state.ensName = action.payload;
    },
    setEnsAvatar: (state, action) => {
      state.ensAvatar = action.payload;
    },
    setPepecoinBalance: (state, action) => {
      state.pepecoinBalance = action.payload;
    },
  },
});
export const {
  setAccountAddress,
  setEnsName,
  setEnsAvatar,
  setIsGuest,
  setEnsDataLoading,
  setPepecoinBalance,
} = userAccountSlice.actions;

export default userAccountSlice.reducer;
