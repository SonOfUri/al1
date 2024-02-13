import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { MessengerInterfaceSC } from "./Messenger.styled";
import { useDispatch } from "react-redux";
import {
  EContactListType,
  EMessengerUIState,
  setContactListType,
  setMessengerRecipient,
  setMessengerUIState,
} from "@store/pepeMessenger/pepeMessenger.slice";
import ToggleCircle from "./components/ToggleCircle";
import messengerTextLogo from "@assets/pepeOS-icons/pepe-messenger-wide.webp";
import messengerLogo from "@assets/webp//messenger_ui/pepe_messenger.webp";
import UserAvatar from "@components/UserAvatar";
import { useSelector } from "react-redux";
import { TRootState } from "@store/index";
import pepeCoinLogo from "@assets/png/pepecoin-logo.png";
import rareEmoji from "@assets/webp/messenger_ui/rare_emoji.webp";
import Balloon from "@components/Balloon";
import alertSfx from "@assets/sounds/alert.mp3";
import { useAddress } from "@thirdweb-dev/react";
import { shortAddress } from "@helpers/string";
import { MessageInputController } from "@controllers/MessageInputController";
import { FullConversationController } from "@controllers/FullConversationController";
import useSelectedConversation from "@hooks/useSelectedConversation";
import {
  resetRecipient,
  setConversationTopic,
  setStartedFirstMessage,
} from "@store/xmtp/xmtp.slice";
import Avatar from "./components/Avatar";

const alertSound = new Audio(alertSfx);

const ChatUI: FC = ({}) => {
  const dispatch = useDispatch();
  const selectedConversation = useSelectedConversation();
  const [playTooltip, setPlayTooltip] = useState(false);

  const address = useAddress();

  const recipientName = useSelector(
    (state: TRootState) => state.xmtpSlice.recipientName
  );

  const recipientAddress = useSelector(
    (state: TRootState) => state.xmtpSlice.recipientAddress
  );

  return (
    <MessengerInterfaceSC>
      <div className="chat__header">
        <div className="chat__header-brand">
          <div className="chat__header-nav">
            <ToggleCircle />
            <button
              onClick={() => {
                dispatch(resetRecipient());
                dispatch(setStartedFirstMessage(false));
                dispatch(setConversationTopic(""));
                dispatch(setContactListType(EContactListType.All));
                dispatch(setMessengerUIState(EMessengerUIState.Contacts));
                dispatch(resetRecipient());
              }}
            >
              <img src={messengerLogo} alt="Messenger Logo" />
              <span>All Contacts</span>
            </button>
            {/* <button
              onClick={() => {
                dispatch(setContactListType(EContactListType.Friends));
                dispatch(setMessengerUIState(EMessengerUIState.Contacts));
              }}
            >
              <img src={frenLogo} alt="Frens" />
              <span>Frens</span>
            </button> */}
            {/* <button
              onClick={() => {
                dispatch(
                  setMessengerRecipient(
                    process.env.REACT_APP_SUPPORT_ADDRESS as string
                  )
                );
              }}
            >
              <img src={pepeCoinLogo} alt="Support" />
              <span>Support</span>
            </button> */}
          </div>
          <img src={messengerTextLogo} alt="Messenger Logo" className="logo" />
        </div>
      </div>
      <div className="chat__messages">
        <div className="chat__recipient-info">
          <div className="chat__info">
            <div className="chat__recipient-header">
              <h5>Chatting with:</h5>
              <p>{recipientName ?? shortAddress(recipientAddress as string)}</p>
            </div>

            {selectedConversation && (
              <FullConversationController conversation={selectedConversation} />
            )}
          </div>

          <div className="chat__user-avatar">
            <Avatar address={recipientAddress as string} />
          </div>
        </div>
        <div className="chat__user-wrapper">
          <div className="chat__user-info">
            <div className="input">
              <div className="user__input-header">
                {playTooltip && (
                  <Balloon
                    header="Series 1 Rare Emojis"
                    line1={
                      "The Series 1 rare emojis will be available soon! #MakeMemesRareAgain"
                    }
                    startAfter={0}
                    duration={5000}
                    right={-240}
                    reverse={true}
                    info={true}
                  />
                )}

                <img
                  src={rareEmoji}
                  alt="rare emoji"
                  style={{ cursor: "pointer" }}
                />
              </div>
              <MessageInputController />
            </div>
            <div className="chat__user-avatar">
              <UserAvatar />
            </div>
          </div>
        </div>
      </div>
      <footer></footer>
    </MessengerInterfaceSC>
  );
};

export default ChatUI;
