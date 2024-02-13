import React, { FC, useState } from "react";
import { MessengerLoginSC } from "./Messenger.styled";
import messengerTextLogo from "@assets/pepeOS-icons/pepe-messenger-wide.webp";
import { useSelector } from "react-redux";
import { TRootState } from "@store/index";
import UserAvatar from "@components/UserAvatar";
import pepeMessengerLogo from "@assets/webp//messenger_ui/pepe_messenger.webp";
import Balloon from "@components/Balloon";
import { useAddress } from "@thirdweb-dev/react";
import { init } from "@airstack/airstack-react";
import useInitXmtpClient from "@hooks/useInitXmtpClient";
import ConnectButton from "@components/ConnectButton";

init(process.env.REACT_APP_AIRSTACK_API_KEY as string);

const MessengerLogin: FC = () => {
  const address = useAddress();
  const [noEthProvider, setNoEthProvider] = useState(false);
  const { isLoading, resolveCreate, resolveEnable, status, signing } =
    useInitXmtpClient();

  if (window.ethereum) {
    try {
    } catch (error) {
      console.error("Error getting signer: ", error);
    }
  } else {
    if (!window.ethereum && !noEthProvider) {
      setNoEthProvider(true);
    }
  }

  const messengerError = useSelector(
    (state: TRootState) => state.pepeMessengerSlice.messengerError
  );

  const handleLogin = async () => {
    if (isLoading) {
      return;
    }
    if (status === "new" && !signing) {
      resolveCreate();
    } else if (status === "created" && !signing) {
      resolveEnable();
    }
  };

  const userIsNew = status === "new";
  const statusUndefined = status === undefined;

  return (
    <MessengerLoginSC>
      <div className="header">
        <img src={messengerTextLogo} alt="Messenger Logo" />
      </div>
      <div className="body" style={{ maxWidth: 175 }}>
        <UserAvatar />
        <div className="input-group">
          <label htmlFor="displayName">User:</label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            readOnly
            placeholder={
              address
                ? `${address.slice(0, 6)}...${address.slice(-6)}`
                : "Guest"
            }
          />
        </div>
        {address ? (
          <button
            onClick={handleLogin}
            disabled={isLoading || noEthProvider || statusUndefined}
          >
            <div style={{ height: 0 }} />
            <span>
              {statusUndefined
                ? "Loading"
                : isLoading
                ? "Signing in"
                : userIsNew
                ? "Create Account"
                : "Sign In"}
            </span>
            <div />
          </button>
        ) : (
          <ConnectButton />
        )}

        <p
          style={{
            textAlign: "center",
            fontSize: "0.65rem",
            color: noEthProvider ? "red" : "black",
          }}
        >
          {noEthProvider
            ? "No wallet detected. App requires a Web3 account (like Metamask)."
            : userIsNew
            ? "First, create your account (will require a web3 signature)"
            : "Login requires approval of a gassless signature request from XMTP."}
        </p>
      </div>

      <div className="footer">
        <div className="utils">
          <div>Encrypted Web3 Messenger</div>
          <div>
            {messengerError && (
              <Balloon
                header="Sign in failed."
                line1={messengerError}
                startAfter={0}
                duration={5000}
                right={-30}
              />
            )}
            <img src={pepeMessengerLogo} alt="logo" />
          </div>
        </div>
        <div className="repository">{/* <a href="">Github</a> */}</div>
      </div>
    </MessengerLoginSC>
  );
};

export default MessengerLogin;
