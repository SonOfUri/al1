import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TETHAddress } from "@helpers/string";
import { CachedMessageWithId } from "@xmtp/react-sdk";

export type TRecipientState = "invalid" | "loading" | "error" | "valid";
export type TRecipientAddress = TETHAddress | null;

type TXmtpState = {
  loadingConversations: boolean;
  clientName: string | null;
  clientAvatar: string | null;
  recipientInput: string;
  recipientAddress: TRecipientAddress;
  recipientName: string | null;
  recipientAvatar: string | null;
  recipientState: TRecipientState;
  recipientOnNetwork: boolean;
  conversationTopic?: string;
  startedFirstMessage: boolean;
  attachmentError: string;
  activeMessage?: CachedMessageWithId;
};

const initialState: TXmtpState = {
  loadingConversations: false,
  clientName: null,
  clientAvatar: null,
  recipientInput: "",
  recipientAddress: null,
  recipientName: null,
  recipientAvatar: null,
  recipientState: "invalid",
  recipientOnNetwork: false,
  conversationTopic: "",
  startedFirstMessage: false,
  attachmentError: "",
  activeMessage: undefined,
};

export const xmtpSlice = createSlice({
  name: "xmtp",
  initialState,
  reducers: {
    setLoadingConversations: (state, action: PayloadAction<boolean>) => {
      state.loadingConversations = action.payload;
    },
    setClientName: (state, action: PayloadAction<string | null>) => {
      state.clientName = action.payload;
    },
    setClientAvatar: (state, action: PayloadAction<string | null>) => {
      state.clientAvatar = action.payload;
    },
    setRecipientInput: (state, action: PayloadAction<string>) => {
      state.recipientInput = action.payload;
    },
    setRecipientAddress: (state, action: PayloadAction<TRecipientAddress>) => {
      state.recipientAddress = action.payload;
    },
    setRecipientName: (state, action: PayloadAction<string | null>) => {
      state.recipientName = action.payload;
    },
    setRecipientAvatar: (state, action: PayloadAction<string | null>) => {
      state.recipientAvatar = action.payload;
    },
    setRecipientState: (state, action: PayloadAction<TRecipientState>) => {
      state.recipientState = action.payload;
    },
    setRecipientOnNetwork: (state, action: PayloadAction<boolean>) => {
      state.recipientOnNetwork = action.payload;
    },
    setConversationTopic: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.conversationTopic = action.payload;
    },
    setStartedFirstMessage: (state, action: PayloadAction<boolean>) => {
      state.startedFirstMessage = action.payload;
    },
    setAttachmentError: (state, action: PayloadAction<string>) => {
      state.attachmentError = action.payload;
    },
    setActiveMessage: (
      state,
      action: PayloadAction<CachedMessageWithId | undefined>
    ) => {
      state.activeMessage = action.payload;
    },
    resetXmtpState: (state) => {
      state = initialState;
    },
    resetRecipient: (state) => {
      state.recipientInput = "";
      state.recipientAddress = null;
      state.recipientName = null;
      state.recipientAvatar = null;
      state.recipientState = "invalid";
    },
  },
});

export const {
  setLoadingConversations,
  setClientName,
  setClientAvatar,
  setRecipientInput,
  setRecipientAddress,
  setRecipientName,
  setRecipientAvatar,
  setRecipientState,
  setRecipientOnNetwork,
  setConversationTopic,
  setStartedFirstMessage,
  setAttachmentError,
  setActiveMessage,
  resetXmtpState,
  resetRecipient,
} = xmtpSlice.actions;

export default xmtpSlice.reducer;
