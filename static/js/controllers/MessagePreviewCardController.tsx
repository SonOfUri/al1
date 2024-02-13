import {
  useLastMessage,
  type CachedConversation,
  ContentTypeId,
  ContentTypeText,
} from "@xmtp/react-sdk";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ContentTypeReply, type Reply } from "@xmtp/content-type-reply";
import type { Attachment } from "@xmtp/content-type-remote-attachment";
import {
  ContentTypeAttachment,
  ContentTypeRemoteAttachment,
} from "@xmtp/content-type-remote-attachment";
import type { TETHAddress } from "../helpers";
import { shortAddress } from "../helpers";
import {
  getCachedPeerAddressAvatar,
  getCachedPeerAddressName,
} from "../helpers/conversation";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "@store/index";
import {
  setActiveMessage,
  setConversationTopic,
  setRecipientAddress,
  setRecipientAvatar,
  setRecipientInput,
  setRecipientName,
  setRecipientOnNetwork,
  setRecipientState,
} from "@store/xmtp/xmtp.slice";
import MessagePreviewCard from "@PepeOS/apps/Messenger/components/MessagePreviewCard";
import {
  EMessengerUIState,
  setMessengerUIState,
} from "@store/pepeMessenger/pepeMessenger.slice";

type TMessagePreviewCardControllerProps = {
  convo: CachedConversation;
};

export const MessagePreviewCardController = ({
  convo,
}: TMessagePreviewCardControllerProps) => {
  const { t } = useTranslation();
  const lastMessage = useLastMessage(convo.topic);
  const dispatch = useDispatch();
  const [shouldDisplay, setShouldDisplay] = useState(true);

  const recipientAddress = useSelector(
    (state: TRootState) => state.xmtpSlice.recipientAddress
  );
  const conversationTopic = useSelector(
    (state: TRootState) => state.xmtpSlice.conversationTopic
  );

  // Helpers
  const isSelected = conversationTopic === convo.topic;

  const onConvoClick = useCallback(
    (conversation: CachedConversation) => {
      if (recipientAddress !== conversation.peerAddress) {
        const peerAddress = conversation.peerAddress as TETHAddress;
        const avatar = getCachedPeerAddressAvatar(conversation);
        dispatch(setRecipientAvatar(avatar));
        const name = getCachedPeerAddressName(conversation);
        dispatch(setRecipientName(name));
        dispatch(setRecipientAddress(peerAddress));
        dispatch(setRecipientOnNetwork(true));
        dispatch(setRecipientState("valid"));
        dispatch(setRecipientInput(peerAddress));
        dispatch(setMessengerUIState(EMessengerUIState.Chat));
      }
      if (conversationTopic !== conversation.topic) {
        dispatch(setConversationTopic(conversation.topic));
        dispatch(setActiveMessage());
      }
    },
    [conversationTopic, recipientAddress, dispatch]
  );

  const conversationDomain = convo?.context?.conversationId.split("/")[0] ?? "";

  const messagePreview = useMemo(() => {
    if (lastMessage) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      let previewContent = lastMessage.content;
      let previewContentType = ContentTypeId.fromString(
        lastMessage.contentType
      );

      if (ContentTypeReply.sameAs(previewContentType)) {
        const reply = lastMessage.content as Reply;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        previewContent = reply.content;
        previewContentType = reply.contentType;
      }

      if (ContentTypeText.sameAs(previewContentType)) {
        return (previewContent as string) ?? lastMessage.contentFallback;
      }

      if (
        ContentTypeAttachment.sameAs(previewContentType) ||
        ContentTypeRemoteAttachment.sameAs(previewContentType)
      ) {
        return (
          (previewContent as Attachment).filename ??
          (t("messages.attachment") || "Attachment")
        );
      }

      return lastMessage.contentFallback ?? t("messages.no_preview");
    }
    return t("messages.no_preview");
  }, [lastMessage, t]);

  useEffect(() => {
    const unwantedSubstrings = [
      "Airdrop",
      "Coinbase Team",
      "voucher",
      "voucher,",
      "This offer",
      "1000USDT",
      "1000USDC",
    ];
    if (
      typeof messagePreview === "string" &&
      unwantedSubstrings.some((substring) =>
        messagePreview.toLowerCase().includes(substring.toLowerCase())
      )
    ) {
      setShouldDisplay(false);
    } else {
      setShouldDisplay(true);
    }
  }, [messagePreview]);

  return shouldDisplay ? (
    <MessagePreviewCard
      isSelected={isSelected}
      key={lastMessage?.xmtpID}
      text={messagePreview}
      datetime={convo?.updatedAt}
      displayAddress={
        getCachedPeerAddressName(convo) ??
        shortAddress(convo?.peerAddress || "")
      }
      onClick={() => {
        if (convo) {
          void onConvoClick?.(convo);
        }
      }}
      avatarUrl={getCachedPeerAddressAvatar(convo) || ""}
      conversationDomain={shortAddress(conversationDomain)}
      address={convo?.peerAddress}
    />
  ) : (
    <div style={{ height: "1px" }} />
  );
};
