import { useStartConversation } from "@xmtp/react-sdk";
import useSendMessage from "../hooks/useSendMessage";
import useSelectedConversation from "../hooks/useSelectedConversation";
import { useSelector } from "react-redux";
import { TRootState } from "@store/index";
import MessageInput from "@PepeOS/apps/Messenger/components/MessageInput";

export const MessageInputController = () => {
  // XMTP Hooks
  const conversation = useSelectedConversation();

  const recipientOnNetwork = useSelector(
    (state: TRootState) => state.xmtpSlice.recipientOnNetwork
  );

  const recipientAddress = useSelector(
    (state: TRootState) => state.xmtpSlice.recipientAddress
  );

  const activeMessage = useSelector(
    (state: TRootState) => state.xmtpSlice.activeMessage
  );

  const { startConversation } = useStartConversation();
  const { sendMessage } = useSendMessage(activeMessage);

  return (
    <MessageInput
      peerAddress={recipientAddress}
      isDisabled={!recipientOnNetwork}
      startConversation={startConversation}
      sendMessage={sendMessage}
      conversation={conversation}
    />
  );
};
