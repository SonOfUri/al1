import React, { FC } from "react";
import { ConnectWallet, lightTheme } from "@thirdweb-dev/react";
import { ConnectButtonSC } from "./ConnectButton.styled";

const ConnectButton: FC = () => {
  return (
    <ConnectButtonSC onClick={(e) => e.preventDefault()}>
      <div onClick={(e) => e.stopPropagation()}>
        <ConnectWallet
          theme={lightTheme({
            colors: {
              primaryButtonBg: "#0066ff",
              accentButtonBg: "#1a1523",
            },
          })}
          btnTitle={"Connect Web3"}
          modalTitle={"Connect Account"}
          auth={{ loginOptional: false }}
          switchToActiveChain={true}
          modalSize={"wide"}
          welcomeScreen={{
            img: {
              src: "https://www.pepecoin.io/android-chrome-512x512.png",
              width: 0,
              height: 200,
            },
            title: "Welcome to PepeOS",
            subtitle:
              "PepeCoin's PepeOS is your operating system for DeFi. Sign in to use PepeOS's full range of features.",
          }}
          modalTitleIconUrl={
            "https://www.pepecoin.io/android-chrome-512x512.png"
          }
          className="connect-wallet-btn"
        />
      </div>
    </ConnectButtonSC>
  );
};

export default ConnectButton;
