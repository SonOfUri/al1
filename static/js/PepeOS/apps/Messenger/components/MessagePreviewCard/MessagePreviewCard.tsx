import React, { FC, ReactElement } from "react";
import { MessagePreviewCardSC } from "./MessagePreviewCard.styled";
import { useTranslation } from "react-i18next";
import Avatar from "../Avatar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type TMessagePreviewCard = {
  /**
   * What is the avatar url?
   */
  avatarUrl?: string;
  /**
   * What is the message text?
   */
  text?: string | ReactElement;
  /**
   * What is the display address associated with the message?
   */
  displayAddress?: string;
  /**
   * What is the wallet address associated with the message?
   */
  address?: string;
  /**
   * What is the datetime of the message
   */
  datetime?: Date;
  /**
   * Are we waiting on anything loading?
   */
  isLoading?: boolean;
  /**
   * What happens on message click?
   */
  onClick?: () => void;
  /**
   * Is conversation selected?
   */
  isSelected?: boolean;
  /**
   * What is the app this conversation started on?
   */
  conversationDomain?: string;
  /**
   * Is this conversation pinned?
   */
};

const MessagePreviewCard: FC<TMessagePreviewCard> = ({
  text,
  displayAddress,
  address,
  datetime,
  isLoading = false,
  onClick,
}) => {
  const { t } = useTranslation();
  return (
    <MessagePreviewCardSC
      role="button"
      onClick={onClick}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onClick?.();
        }
      }}
      tabIndex={0}
    >
      {isLoading ? (
        <Skeleton style={{ height: "2rem", width: "2rem" }} count={1} circle />
      ) : (
        <Avatar address={address} isLoading={isLoading} />
      )}

      <div className="chat__preview-wrapper">
        <div className="chat__preview-header">
          {isLoading ? (
            <Skeleton style={{ height: "0.8rem", width: 120 }} count={1} />
          ) : (
            <h5>
              {displayAddress ??
                t("messages.convos_empty_recipient_placeholder")}
            </h5>
          )}
          {isLoading ? (
            <Skeleton style={{ height: "0.6rem", width: 75 }} count={1} />
          ) : (
            <p className="chat__preview-time">
              {datetime && t("{{datetime, ago}}", { datetime })}
            </p>
          )}
        </div>
        {isLoading ? (
          <Skeleton style={{ height: "0.8rem", width: "100%" }} count={1} />
        ) : (
          <p>
            {typeof text === "string" && text.length > 50
              ? text.substring(0, 50) + "..."
              : text ?? t("messages.convos_empty_text_placeholder")}
          </p>
        )}
      </div>
    </MessagePreviewCardSC>
  );
};

export default MessagePreviewCard;
