import React, { FC, useEffect } from "react";
import { IEWrapperSC } from "./Messenger.styled";
import { useSelector } from "react-redux";
import { TRootState } from "@store/index";
import MessengerLogin from "./MessengerLogin";
import {
  EMessengerAuthState,
  setMessengerAuthState,
} from "@store/pepeMessenger/pepeMessenger.slice";
import Interface from "./Interface";
import WindowDropDowns from "@components/WindowDropDowns";
import pepesoftPng from "@assets/png/pepecoin-logo.png";
import dropDownData from "./dropDownData";
import errorSound from "@assets/sounds/fail.mp3";
import rightUiElement from "@assets/webp/messenger_ui/main-right.webp";
import leftUiElement from "@assets/webp/messenger_ui/main-left.webp";
import bottomUiElement from "@assets/webp/messenger_ui/main-bottom.webp";
import bottomLeftCornerElement from "@assets/webp/messenger_ui/main-corner-left.webp";
import bottomRightCornerElement from "@assets/webp/messenger_ui/main-corner-right.webp";
import { resetXmtpState } from "@store/xmtp/xmtp.slice";
import { wipeKeys } from "@helpers/keys";
import { useDispatch } from "react-redux";
import { useClient } from "@xmtp/react-sdk";
import { useAddress, useDisconnect, useSigner } from "@thirdweb-dev/react";
import loginSfX from "@assets/sounds/login.mp3";

const renderAuthState = (messengerState: EMessengerAuthState) => {
  switch (messengerState) {
    case EMessengerAuthState.Login:
      return <MessengerLogin />;
    case EMessengerAuthState.Main:
      return <Interface />;
    default:
      return <MessengerLogin />;
  }
};

type TMessengerProps = {
  onClose: () => void;
};

const loginSound = new Audio(loginSfX);

const Messenger: FC<TMessengerProps> = ({ onClose }) => {
  const dispatch = useDispatch();

  const walletClient = useSigner();

  const { client, disconnect } = useClient();

  const address = useAddress();

  const messengerAppState = useSelector(
    (state: TRootState) => state.pepeMessengerSlice.authState
  ) as EMessengerAuthState;

  const messengerError = useSelector(
    (state: TRootState) => state.pepeMessengerSlice.messengerError
  );

  const disconnectThirdweb = useDisconnect();

  useEffect(() => {
    const routeToInbox = () => {
      if (client) {
        dispatch(setMessengerAuthState(EMessengerAuthState.Main));
        loginSound.play();
      }
      if (!client || !walletClient) {
        dispatch(setMessengerAuthState(EMessengerAuthState.Login));
      }
    };
    routeToInbox();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  // if the wallet address changes, disconnect the XMTP client
  useEffect(() => {
    const checkSigners = () => {
      const address1 = address;
      const address2 = client?.address;
      // addresses must be defined before comparing
      if (address1 && address2 && address1 !== address2) {
        resetXmtpState();
        void disconnect();
        wipeKeys(address1 ?? "");

        disconnectThirdweb();
        dispatch(setMessengerAuthState(EMessengerAuthState.Login));
      }
    };
    void checkSigners();
  }, [
    disconnectThirdweb,
    resetXmtpState,
    walletClient,
    client?.address,
    disconnect,
  ]);

  function goMain() {}

  function onClickOptionItem(item: string) {
    switch (item) {
      case "Close":
        onClose();
        break;
      case "Home Page":
      case "Back":
        goMain();
        break;
      default:
    }
  }

  useEffect(() => {
    if (messengerError) {
      new Audio(errorSound).play();
    }
  }, [messengerError]);

  return (
    <IEWrapperSC>
      <section className="ie__toolbar">
        <div className="ie__options">
          <WindowDropDowns
            items={dropDownData}
            onClickItem={onClickOptionItem}
            height={21}
          />
        </div>
        <img className="ie__windows-logo" src={pepesoftPng} alt="pepecoin" />
      </section>
      <div className="ie__content">
        <div className="ie__content__inner">
          <img
            className="messenger-ui__right"
            src={rightUiElement}
            alt="right"
          />
          <img className="messenger-ui__top" src={bottomUiElement} alt="top" />
          <img className="messenger-ui__left" src={leftUiElement} alt="left" />
          <img
            className="messenger-ui__bottom"
            src={bottomUiElement}
            alt="bottom"
          />
          <img
            className="messenger-ui__bottom-left"
            src={bottomLeftCornerElement}
            alt="bottom-left"
          />
          <img
            className="messenger-ui__bottom-right"
            src={bottomRightCornerElement}
            alt="bottom-right"
          />
          <img
            className="messenger-ui__top-left"
            src={bottomLeftCornerElement}
            alt="top-left"
          />
          <img
            className="messenger-ui__top-right"
            src={bottomLeftCornerElement}
            alt="top-right"
          />
          {renderAuthState(messengerAppState)}
        </div>
      </div>
    </IEWrapperSC>
  );
};

export default Messenger;
