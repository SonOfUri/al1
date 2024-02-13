import React, { FC, useCallback } from "react";
import { MessengerContactsSC } from "./Messenger.styled";
import messengerTextLogo from "@assets/pepeOS-icons/pepe-messenger-wide.webp";
import ToggleCircle from "./components/ToggleCircle";
import UserAvatar from "@components/UserAvatar";
import { useSelector } from "react-redux";
import { TRootState } from "@store/index";
import PulseLoader from "react-spinners/PulseLoader";
import {
  EContactListType,
  setContactListType,
} from "@store/pepeMessenger/pepeMessenger.slice";
import messengerLogo from "@assets/webp//messenger_ui/pepe_messenger.webp";
import { useDispatch } from "react-redux";
import pepeCoinLogo from "@assets/png/pepecoin-logo.png";
import { ConversationListController } from "@controllers/ConversationListController";
import { AddressInputController } from "@controllers/AddressInputController";
import { shortAddress } from "@helpers/string";
import { useAddress } from "@thirdweb-dev/react";
import {
  TRecipientAddress,
  setRecipientAddress,
  setRecipientOnNetwork,
} from "@store/xmtp/xmtp.slice";
import { useStartChat } from "@hooks/useStartChat";
import risk from "@assets/windowsIcons/229(16x16).png";

const renderListHeader = (state: EContactListType) => {
  if (state === EContactListType.All) {
    return "Existing Chats";
  } else if (state === EContactListType.Friends) {
    return "Your Frens";
  } else if (state === EContactListType.Support) {
    return "Support Chats";
  }
};

const ContactsUI: FC = () => {
  const address = useAddress();
  const dispatch = useDispatch();
  const startChat = useStartChat();

  const contactListType = useSelector(
    (state: TRootState) => state.pepeMessengerSlice.contactListType
  );

  const clientName = useSelector(
    (state: TRootState) => state.xmtpSlice.clientName
  );

  const onSupportClick = async () => {
    const recipientAddress: TRecipientAddress = process.env
      .REACT_APP_SUPPORT_ADDRESS as unknown as TRecipientAddress;
    dispatch(setRecipientAddress(recipientAddress));
    dispatch(setRecipientOnNetwork(true));
    startChat(recipientAddress as string, true);
  };

  return (
    <MessengerContactsSC>
      <div className="header">
        <div className="header__brand">
          <ToggleCircle />
          <img src={messengerTextLogo} alt="Messenger Logo" />
        </div>
        <div className="header__user-info">
          <UserAvatar />
          <div className="header__account">
            <h4>{clientName ?? shortAddress(address as string)}</h4>
            <p>(Connected)</p>
          </div>
        </div>
      </div>
      <div className="contacts__wrapper">
        <div className="contacts__tab-bar">
          <button
            className={contactListType === EContactListType.All ? "active" : ""}
            onClick={() => dispatch(setContactListType(EContactListType.All))}
          >
            <img src={messengerLogo} alt="messenger" />
          </button>
          {/* <button
            className={
              contactListType === EContactListType.Friends ? "active" : ""
            }
            onClick={() =>
              dispatch(setContactListType(EContactListType.Friends))
            }
          >
            <img src={frenLogo} alt="frens" />
          </button> */}
          <button
            className={
              contactListType === EContactListType.Support ? "active" : ""
            }
            onClick={onSupportClick}
          >
            <img src={pepeCoinLogo} alt="frens" />
          </button>
        </div>
        <div className="contacts__list-wrapper">
          <div className="contacts__list">
            <AddressInputController />
            <div className="contacts__list-header">
              <h5>{renderListHeader(contactListType)}</h5>
            </div>
            <div className="contacts__list-warning">
              <img src={risk} alt="warning" />
              <h5>
                Warning: Do not click on links from senders that you do not
                know, and never share your private keys over Messenger.
              </h5>
            </div>
            <div className="conversation__new">
              <ConversationListController />
            </div>
          </div>
          <footer>
            <img src={messengerLogo} alt="logo" />
            <img src={messengerTextLogo} alt="messenger" />
            <p>KEK.chat</p>
            <span className="line" />
          </footer>
        </div>
      </div>
    </MessengerContactsSC>
  );
};

export default ContactsUI;
