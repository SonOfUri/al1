import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useCallback, useEffect, useRef, useState, FC } from "react";
import { MessageInputSC } from "./MessageInput.styled";
import { useTranslation } from "react-i18next";
import {
  useConversation,
  type CachedConversation,
  type useStartConversation,
} from "@xmtp/react-sdk";
import {
  TRecipientAddress,
  setConversationTopic,
} from "@store/xmtp/xmtp.slice";
import { useSelector } from "react-redux";
import { TRootState } from "@store/index";

type TMessageInput = {
  /**
   * What happens on a submit?
   */
  sendMessage: (
    conversation: CachedConversation,
    msg: string,
    type: "text"
  ) => Promise<void>;
  startConversation: ReturnType<
    typeof useStartConversation
  >["startConversation"];
  peerAddress: TRecipientAddress;
  /**
   * Is the CTA button disabled?
   */
  isDisabled?: boolean;
  /**
   * Rerender component?
   */
  conversation?: CachedConversation;
};

const MessageInput: FC<TMessageInput> = ({
  sendMessage,
  startConversation,
  peerAddress,
  isDisabled,
  conversation,
}) => {
  const { getCachedByPeerAddress } = useConversation();
  const { t } = useTranslation();
  const textAreaRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [acceptedTypes, setAcceptedTypes]: [
    string | string[] | undefined,
    Dispatch<SetStateAction<string | string[] | undefined>>
  ] = useState();

  const conversationTopic = useSelector(
    (state: TRootState) => state.xmtpSlice.conversationTopic
  );

  const inputFile = useRef<HTMLInputElement | null>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  useEffect(() => {
    if (conversationTopic) {
      textAreaRef.current?.focus();
    }
    setValue("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation]);

  useEffect(() => {
    if (acceptedTypes) {
      inputFile?.current?.click();
    }
  }, [acceptedTypes]);

  const send = useCallback(async () => {
    // the peerAddress check is for the type checker only
    // it's not possible to send a message without a valid peerAddress
    if (peerAddress && value) {
      // save reference to these values before clearing them from state
      const val = value;

      setValue("");

      let convo = conversation;
      if (!convo) {
        // check for cached conversation with the same peer address
        const existing = await getCachedByPeerAddress(peerAddress);
        if (existing) {
          convo = existing;
        } else {
          // create new conversation
          const { cachedConversation } = await startConversation(
            peerAddress,
            undefined
          );
          convo = cachedConversation;
        }
        // select existing or new conversation
        if (convo && conversationTopic !== convo.topic) {
          setConversationTopic(convo.topic);
        }
      }

      if (val && convo) {
        void sendMessage(convo, val, "text");
      }
      // focus on message input after sending
      textAreaRef.current?.focus();
    }
  }, [
    conversation,
    conversationTopic,
    getCachedByPeerAddress,
    peerAddress,
    sendMessage,
    setConversationTopic,
    startConversation,
    value,
  ]);

  return (
    <MessageInputSC>
      <input
        id="chat"
        data-testid="message-input"
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            void send();
          }
        }}
        ref={textAreaRef}
        placeholder={t("messages.message_field_prompt") || ""}
        value={value}
      />

      <button
        onClick={() => {
          void send();
        }}
        disabled={!value || isDisabled}
      >
        {t("aria_labels.submit_message") || ""}
      </button>
    </MessageInputSC>
  );
};

export default MessageInput;
