// src/app/store.ts
import userInterface from "./userInterface/userInterface";
import userAccount from "./userAccount/userAccount";
import pepeOSSlice from "./osState/pepeOS.slice";
import pepeMessengerSlice from "./pepeMessenger/pepeMessenger.slice";
import xmtpSlice from "./xmtp/xmtp.slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  userInterface,
  userAccount,
  pepeOSSlice,
  pepeMessengerSlice,
  xmtpSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;
