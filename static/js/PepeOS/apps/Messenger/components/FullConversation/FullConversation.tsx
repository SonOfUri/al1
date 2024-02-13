import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { VirtuosoHandle } from "react-virtuoso";
import { Virtuoso } from "react-virtuoso";
import { useMemo, useRef } from "react";
import { BeginningMessageSC } from "./FullConversation.styled";

type TFullConversation = {
  messages?: Array<JSX.Element | null>;
  isLoading?: boolean;
};

const LoadingMessage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <BeginningMessageSC>
      {t("messages.conversation_loading")}
    </BeginningMessageSC>
  );
};

const BeginningMessage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <BeginningMessageSC className="message__start">
      <p>{t("messages.conversation_start")}</p>
    </BeginningMessageSC>
  );
};

const FullConversation: FC<TFullConversation> = ({
  messages = [],
  isLoading = false,
}) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const filteredMessages = useMemo(() => {
    const filtered = messages.filter((msg) => msg !== null);
    return [
      isLoading ? (
        <LoadingMessage key="loading" />
      ) : (
        <BeginningMessage key="beginning" />
      ),
      ...filtered,
    ];
  }, [isLoading, messages]);

  useEffect(() => {
    virtuosoRef.current?.scrollToIndex({
      index: filteredMessages.length - 1,
    });
  }, [filteredMessages]);

  return (
    <Virtuoso
      alignToBottom
      data={filteredMessages}
      totalCount={filteredMessages.length}
      initialTopMostItemIndex={filteredMessages.length - 1}
      followOutput="smooth"
      itemContent={(index, message) => message}
      ref={virtuosoRef}
    />
  );
};

export default FullConversation;
