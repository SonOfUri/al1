import {
  useStreamAllMessages as _useStreamAllMessages,
  useConversation,
} from "@xmtp/react-sdk";
import type { DecodedMessage } from "@xmtp/react-sdk";
import { useCallback, useRef } from "react";
import { shortAddress, truncate } from "../helpers";
import { getCachedPeerAddressName } from "../helpers/conversation";
import newMessageSound from "@assets/sounds/new_message.mp3";
import { useAddress } from "@thirdweb-dev/react";
const newMessage = new Audio(newMessageSound);

const useStreamAllMessages = () => {
  const walletAddress = useAddress();
  const { getCachedByTopic } = useConversation();
  const latestMsgId = useRef<string>();

  const onMessage = useCallback(
    async (message: DecodedMessage) => {
      if (message.senderAddress !== walletAddress) {
        // Play the newMessage sound
        newMessage.play();
      }

      if (
        latestMsgId.current !== message.id &&
        "Notification" in window &&
        window.Notification.permission === "granted" &&
        document.hidden
      ) {
        // look for name in cached conversation
        const cachedConversation = await getCachedByTopic(
          message.conversation.topic
        );

        if (cachedConversation) {
          const name = getCachedPeerAddressName(cachedConversation);

          // eslint-disable-next-line no-new
          new window.Notification("XMTP", {
            body: `${
              name || shortAddress(message.senderAddress ?? "")
            }\n${truncate(message.content as string, 75)}`,
          });
        }

        latestMsgId.current = message.id;
      }
    },
    [getCachedByTopic, walletAddress]
  );
  void _useStreamAllMessages(onMessage);
};

export default useStreamAllMessages;
