import { useConversation } from "@xmtp/react-sdk";
import type { CachedConversationWithId } from "@xmtp/react-sdk";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TRootState } from "@store/index";

const useSelectedConversation = () => {
  const [selectedConversation, setSelectedConversation] = useState<
    CachedConversationWithId | undefined
  >();
  const { getCachedByTopic } = useConversation();

  const conversationTopic = useSelector(
    (state: TRootState) => state.xmtpSlice.conversationTopic
  );

  useEffect(() => {
    const getSelectedConversation = async () => {
      if (conversationTopic) {
        const conversation = await getCachedByTopic(conversationTopic);
        setSelectedConversation(conversation);
      } else {
        setSelectedConversation(undefined);
      }
    };
    void getSelectedConversation();
  }, [conversationTopic, getCachedByTopic]);

  return selectedConversation;
};

export default useSelectedConversation;
