import React, { FC } from "react";
import { MessengerInterfaceSC } from "./Messenger.styled";
import { EMessengerUIState } from "@store/pepeMessenger/pepeMessenger.slice";
import ContactsUI from "./ContactsUI";
import ChatUI from "./ChatUI";
import { useSelector } from "react-redux";
import { TRootState } from "@store/index";
import useStreamAllMessages from "@hooks/useStreamAllMessages";

const renderMessengerUIState = (messengerState: EMessengerUIState) => {
  switch (messengerState) {
    case EMessengerUIState.Contacts:
      return <ContactsUI />;
    case EMessengerUIState.Chat:
      return <ChatUI />;
    default:
      return <ContactsUI />;
  }
};

const Interface: FC = ({}) => {
  useStreamAllMessages();
  const messengerUIState = useSelector(
    (state: TRootState) => state.pepeMessengerSlice.uiState
  ) as EMessengerUIState;

  return (
    <MessengerInterfaceSC>
      {renderMessengerUIState(messengerUIState)}
    </MessengerInterfaceSC>
  );
};

export default Interface;
