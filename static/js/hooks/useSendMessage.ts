import { useCallback } from "react";
import type { CachedConversation, CachedMessageWithId } from "@xmtp/react-sdk";
import {
  ContentTypeText,
  useSendMessage as _useSendMessage,
} from "@xmtp/react-sdk";
import { ContentTypeReply } from "@xmtp/content-type-reply";
import type { Reply } from "@xmtp/content-type-reply";
import { useSelector } from "react-redux";
import { TRootState } from "@store/index";

const useSendMessage = (activeMessage?: CachedMessageWithId | undefined) => {
  const { sendMessage: _sendMessage, isLoading, error } = _useSendMessage();
  const recipientOnNetwork = useSelector(
    (state: TRootState) => state.xmtpSlice.recipientOnNetwork
  );

  const sendMessage = useCallback(
    async (conversation: CachedConversation, message: string, type: "text") => {
      if (!recipientOnNetwork) {
        return;
      }
      if (type === "text") {
        if (activeMessage?.xmtpID) {
          void _sendMessage(
            conversation,
            {
              reference: activeMessage?.xmtpID,
              content: message,
              contentType: ContentTypeText,
            } satisfies Reply,
            ContentTypeReply
          );
        } else {
          void _sendMessage(conversation, message);
        }
      }
    },
    [recipientOnNetwork, _sendMessage, activeMessage]
  );

  return {
    sendMessage,
    loading: isLoading,
    error,
  };
};

export default useSendMessage;
