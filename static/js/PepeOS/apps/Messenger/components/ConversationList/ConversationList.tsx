import React, { FC } from "react";
import MessagePreviewCard from "../MessagePreviewCard";
import { Virtuoso } from "react-virtuoso";
import EmptyMessage from "../EmptyMessage/EmptyMessage";

type TConversationList = {
  /**
   * What conversations should we render?
   */
  messages?: Array<React.ReactNode>;
  /**
   * Are we waiting on anything loading?
   */
  isLoading?: boolean;
  /**
   * What function do we run to start the first message?
   */
  setStartedFirstMessage?: () => void;
  /**
   * Has a value been entered for the recipient?
   */
  hasRecipientEnteredValue?: boolean;
};

const ConversationList: FC<TConversationList> = ({
  messages = [],
  isLoading,
  hasRecipientEnteredValue,
}) => {
  const filteredMessages = messages.filter(Boolean);
  return !messages?.length && isLoading ? (
    <div>
      {Array.from({ length: 12 }).map((_, idx) => (
        <MessagePreviewCard key={idx} isLoading />
      ))}
    </div>
  ) : !messages.length && !isLoading && !hasRecipientEnteredValue ? (
    <div>
      <h5>No conversations yet.</h5>
    </div>
  ) : (
    <Virtuoso
      className="conversation-scroller"
      data={filteredMessages}
      itemContent={(index, message) => message}
      followOutput="smooth"
    />
  );
};

export default ConversationList;
