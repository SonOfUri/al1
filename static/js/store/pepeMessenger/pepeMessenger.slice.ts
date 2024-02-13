import { createSlice } from "@reduxjs/toolkit";
import { Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { TRootState } from "..";

export enum EMessengerAuthState {
  Login = "Login",
  Main = "Main",
}

export enum EMessengerUIState {
  Contacts = "Contacts",
  Chat = "Chat",
}

export enum EContactListType {
  All = "All",
  Friends = "Frens",
  Support = "Support",
}

type TMainDesktopState = {
  authState: EMessengerAuthState;
  uiState: EMessengerUIState;
  muted: boolean;
  recipient: string;
  contactListType: EContactListType;
  xmtp: any;
  recipientEns: string | null;
  recipientEnsAvatar: string | null;
  messengerError: string | null;
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  TRootState,
  unknown,
  Action<string>
>;

const initialState: TMainDesktopState = {
  authState: EMessengerAuthState.Login,
  uiState: EMessengerUIState.Contacts,
  muted: false,
  recipient: "",
  recipientEns: null,
  recipientEnsAvatar: null,
  contactListType: EContactListType.All,
  xmtp: null,
  messengerError: null,
};

export const pepeMessengerSlice = createSlice({
  name: "pepeMessenger",
  initialState,
  reducers: {
    setMessengerAuthState: (state, action) => {
      state.authState = action.payload;
    },
    setMessengerUIState: (state, action) => {
      state.uiState = action.payload;
    },
    setMessengerMuted: (state, action) => {
      state.muted = action.payload;
    },
    setMessengerRecipient: (state, action) => {
      state.recipient = action.payload;
    },
    setContactListType: (state, action) => {
      state.contactListType = action.payload;
    },
    setXMTP: (state, action) => {
      state.xmtp = action.payload;
    },
    setRecipientEns: (state, action) => {
      state.recipientEns = action.payload;
    },
    setRecipientEnsAvatar: (state, action) => {
      state.recipientEnsAvatar = action.payload;
    },
    setMessengerError: (state, action) => {
      state.messengerError = action.payload;
    },
  },
});

export const {
  setMessengerAuthState,
  setMessengerUIState,
  setMessengerMuted,
  setMessengerRecipient,
  setContactListType,
  setXMTP,
  setRecipientEns,
  setRecipientEnsAvatar,
  setMessengerError,
} = pepeMessengerSlice.actions;

export default pepeMessengerSlice.reducer;
