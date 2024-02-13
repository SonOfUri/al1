import { useEffect, useMemo } from "react";
import { useDb } from "@xmtp/react-sdk";
import useListConversations from "../hooks/useListConversations";
import { MessagePreviewCardController } from "./MessagePreviewCardController";
import { updateConversationIdentities } from "../helpers/conversation";
import { TRootState } from "@store/index";
import { useSelector } from "react-redux";
import ConversationList from "@PepeOS/apps/Messenger/components/ConversationList";
import { setStartedFirstMessage } from "@store/xmtp/xmtp.slice";
import { useDispatch } from "react-redux";

export const ConversationListController = () => {
  const { isLoaded, isLoading, conversations } = useListConversations();
  const dispatch = useDispatch();
  const { db } = useDb();

  const recipientInput = useSelector(
    (state: TRootState) => state.xmtpSlice.recipientInput
  );

  // when the conversations are loaded, update their identities
  useEffect(() => {
    const runUpdate = async () => {
      if (isLoaded) {
        await updateConversationIdentities(conversations, db);
      }
    };
    void runUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const filteredConversations = useMemo(() => {
    const convos = conversations.map((conversation: any) => (
      <MessagePreviewCardController
        key={conversation.topic}
        convo={conversation}
      />
    ));
    const filteredConvos = convos.filter(Boolean);

    return filteredConvos;
  }, [conversations]);

  return (
    <ConversationList
      hasRecipientEnteredValue={!!recipientInput}
      setStartedFirstMessage={() => dispatch(setStartedFirstMessage(true))}
      isLoading={isLoading}
      messages={!isLoading ? filteredConversations : []}
    />
  );
};
