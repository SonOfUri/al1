import { useDispatch, useSelector } from "react-redux";
import { useConversation } from "@xmtp/react-sdk";
import { TRootState } from "@store/index";
import { setConversationTopic } from "@store/xmtp/xmtp.slice";
import {
  EMessengerUIState,
  setMessengerUIState,
} from "@store/pepeMessenger/pepeMessenger.slice";

export const useStartChat = () => {
  const dispatch = useDispatch();
  const { conversationTopic } = useSelector(
    (state: TRootState) => state.xmtpSlice
  );
  const { getCachedByPeerAddress, getCachedByTopic } = useConversation();

  const startChat = async (
    recipientAddress: string,
    recipientOnNetwork: boolean
  ) => {
    if (recipientAddress && recipientOnNetwork) {
      let updateSelectedConversation = true;

      if (conversationTopic) {
        const convo = await getCachedByTopic(conversationTopic);
        if (convo?.peerAddress === recipientAddress) {
          updateSelectedConversation = false;
        }
      }
      if (updateSelectedConversation) {
        const existing = await getCachedByPeerAddress(recipientAddress);
        if (existing && conversationTopic !== existing.topic) {
          dispatch(setConversationTopic(existing.topic));
          dispatch(setMessengerUIState(EMessengerUIState.Chat));
        }
      }
    }
  };

  return startChat;
};
