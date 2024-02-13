import type { CachedConversation, CachedMessageWithId } from "@xmtp/react-sdk";
import { useClient } from "@xmtp/react-sdk";
import { shortAddress } from "../helpers";
import { TRootState } from "@store/index";
import { useSelector } from "react-redux";
import FullMessage from "@PepeOS/apps/Messenger/components/FullMessage";
import MessageContentController from "./MessageContentController";

interface FullMessageControllerProps {
  message: CachedMessageWithId;
  conversation: CachedConversation;
  isReply?: boolean;
}

export const FullMessageController = ({
  message,
  conversation,
  isReply,
}: FullMessageControllerProps) => {
  const { client } = useClient();

  const recipientName = useSelector(
    (state: TRootState) => state.xmtpSlice.recipientName
  );

  return (
    <FullMessage
      isReply={isReply}
      message={message}
      conversation={conversation}
      key={message.xmtpID}
      from={{
        displayAddress: recipientName ?? shortAddress(message.senderAddress),
        isSelf: client?.address === message.senderAddress,
      }}
      datetime={message.sentAt}
    >
      <MessageContentController
        message={message}
        isSelf={client?.address === message.senderAddress}
      />
    </FullMessage>
  );
};
