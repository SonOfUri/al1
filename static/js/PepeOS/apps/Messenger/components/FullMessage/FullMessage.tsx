import React, { useCallback, useMemo, useState, FC } from "react";
import type { KeyboardEventHandler, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import {
  useResendMessage,
  useSendMessage,
  useClient,
  useReplies,
} from "@xmtp/react-sdk";
import type { CachedConversation, CachedMessageWithId } from "@xmtp/react-sdk";
import { FullMessageSC } from "./FullMessage.styled";
import DateDivider from "../DateDivider";
import { setActiveMessage } from "@store/xmtp/xmtp.slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TRootState } from "@store/index";
import { useAddress } from "@thirdweb-dev/react";
import { shortAddress } from "@helpers/string";

type TMessageSender = {
  displayAddress: string;
  isSelf?: boolean;
};

const enterKey = "Enter";

type TFullMessage = {
  message: CachedMessageWithId;
  /**
   * what conversation is the message part of?
   */
  conversation: CachedConversation;
  /**
   * who is the message from?
   */
  from: TMessageSender;
  /**
   * What is the datetime of the message?
   */
  datetime: Date;
  /**
   * Should we show the date divider?
   */
  showDateDivider?: boolean;
  /**
   * Is this message a reply?
   */
  isReply?: boolean;
  children?: any;
};

const FullMessage: FC<TFullMessage> = ({
  children,
  message,
  conversation,
  from,
  datetime,
  showDateDivider = false,
  isReply,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { resend, cancel } = useResendMessage();

  const recipientName = useSelector(
    (state: TRootState) => state.xmtpSlice.recipientName
  );

  const recipientAddress = useSelector(
    (state: TRootState) => state.xmtpSlice.recipientAddress
  );

  const handleResend = useCallback(() => {
    void resend(message);
  }, [message, resend]);

  const handleResendKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (e) => {
      if (e.key === enterKey) {
        void handleResend();
      }
    },
    [handleResend]
  );

  const handleCancel = useCallback(() => {
    void cancel(message);
  }, [message, cancel]);

  const handleCancelKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (e) => {
      if (e.key === enterKey) {
        void handleCancel();
      }
    },
    [handleCancel]
  );
  const isUser = message.senderAddress === message.walletAddress;
  return (
    <FullMessageSC>
      <div className="message__header">
        <h4 style={{ color: isUser ? "green" : "#b4463f" }}>
          {message.senderAddress === message.walletAddress
            ? "You say:"
            : `${
                recipientName ?? shortAddress(recipientAddress as string)
              } says:`}{" "}
        </h4>
        {message.hasSendError ? (
          <div>
            <div>{t("messages.message_not_delivered")}</div>
            <div>&bull;</div>
            <div
              role="button"
              tabIndex={0}
              className="underline"
              onKeyDown={handleResendKeyDown}
              onClick={handleResend}
            >
              {t("messages.message_retry")}
            </div>
            <div>&bull;</div>
            <div
              role="button"
              tabIndex={0}
              className="underline"
              onKeyDown={handleCancelKeyDown}
              onClick={handleCancel}
            >
              {t("messages.message_cancel")}
            </div>
          </div>
        ) : (
          <p>{t("{{ datetime, time }}", { datetime })}</p>
        )}
      </div>
      <div className="message__content" role="button" tabIndex={0}>
        {children}
      </div>

      {showDateDivider && <DateDivider date={datetime} />}
    </FullMessageSC>
  );
};

export default FullMessage;
