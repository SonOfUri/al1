import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useConversation, useStartConversation } from "@xmtp/react-sdk";
import { getRecipientInputSubtext, shortAddress } from "../helpers";
import { useAddressInput } from "../hooks/useAddressInput";
import AddressInput from "@PepeOS/apps/Messenger/components/AddressInput";
import { TRootState } from "@store/index";
import {
  resetRecipient,
  setConversationTopic,
  setRecipientInput,
  setStartedFirstMessage,
} from "@store/xmtp/xmtp.slice";
import {
  EMessengerUIState,
  setMessengerUIState,
} from "@store/pepeMessenger/pepeMessenger.slice";

export const AddressInputController = () => {
  const dispatch = useDispatch();
  const {
    recipientAddress,
    recipientState,
    recipientOnNetwork,
    recipientInput,
    recipientName,
    conversationTopic,
    loadingConversations,
  } = useSelector((state: TRootState) => state.xmtpSlice);
  const { getCachedByPeerAddress, getCachedByTopic } = useConversation();
  const { startConversation } = useStartConversation();

  // manage address input state
  useAddressInput();

  // Function to start a chat
  const startChat = async () => {
    // if there's a valid network address, look for an existing conversation
    if (recipientAddress && recipientOnNetwork) {
      let updateSelectedConversation = true;

      // if there's an existing conversation topic, check if it has the same
      // peer address as the recipient
      if (conversationTopic) {
        const convo = await getCachedByTopic(conversationTopic);
        // if the peer address is the same, do not attempt to update the
        // select conversation
        if (convo?.peerAddress === recipientAddress) {
          updateSelectedConversation = false;
        }
      }
      // if we have updated the selected conversation, look for a conversation
      // with the recipient's address. if present, select that conversation.
      if (updateSelectedConversation) {
        const existing = await getCachedByPeerAddress(recipientAddress);
        if (existing && conversationTopic !== existing.topic) {
          dispatch(setConversationTopic(existing.topic));
          dispatch(setMessengerUIState(EMessengerUIState.Chat));
        } else {
          // If no existing conversation is found, create a new one
          const { cachedConversation } = await startConversation(
            recipientAddress,
            undefined
          );
          if (
            cachedConversation &&
            conversationTopic !== cachedConversation.topic
          ) {
            dispatch(setConversationTopic(cachedConversation.topic));
            dispatch(setMessengerUIState(EMessengerUIState.Chat));
          }
        }
      }
    }
  };

  return (
    <AddressInput
      isError={recipientState === "invalid" || recipientState === "error"}
      subtext={
        !loadingConversations
          ? getRecipientInputSubtext(
              recipientInput,
              recipientAddress,
              recipientState,
              recipientOnNetwork
            )
          : ""
      }
      onStartChat={startChat}
      resolvedAddress={{
        displayAddress:
          recipientName ??
          (window.innerWidth < 700
            ? recipientAddress
              ? shortAddress(recipientAddress)
              : ""
            : recipientAddress ?? ""),
        walletAddress: recipientName
          ? recipientAddress ?? undefined
          : undefined,
      }}
      onChange={(value) => dispatch(setRecipientInput(value))}
      isLoading={recipientState === "loading"}
      value={recipientInput}
      avatarUrlProps={{
        isLoading: recipientState === "loading",
        address: recipientAddress ?? undefined,
      }}
      onLeftIconClick={() => {
        dispatch(resetRecipient());
        dispatch(setStartedFirstMessage(false));
        dispatch(setConversationTopic(""));
      }}
    />
  );
};
