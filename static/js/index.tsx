import React from "react";

import { Provider } from "react-redux";
import { store } from "@store/index";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { XMTPProvider } from "@xmtp/react-sdk";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  safeWallet,
  embeddedWallet,
  trustWallet,
  zerionWallet,
  lightTheme,
} from "@thirdweb-dev/react";

import ReactDOM from "react-dom/client";

const thirdwebConfig = {
  theme: lightTheme({
    colors: {
      primaryButtonBg: "#0066ff",
      accentButtonBg: "#1a1523",
    },
  }),
  btnTitle: "Connect Web3",
  modalTitle: "Connect Account",
  auth: { loginOptional: false },
  switchToActiveChain: true,
  modalSize: "wide",
  welcomeScreen: {
    img: {
      src: "https://www.pepecoin.io/android-chrome-512x512.png",
      width: 0,
      height: 200,
    },
    title: "Welcome to PepeOS",
    subtitle:
      "PepeCoin's PepeOS is your operating system for DeFi. Sign in to use PepeOS's full range of features.",
  },
  modalTitleIconUrl: "https://www.pepecoin.io/android-chrome-512x512.png",
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThirdwebProvider
        activeChain="ethereum"
        clientId={process.env.REACT_APP_THIRDWEB_CLIENT_ID as string}
        autoConnect={true}
        dAppMeta={{
          name: "PepeCoin",
          description: "PepeCoin's PepeOS",
          logoUrl: "https://www.pepecoin.io/android-chrome-512x512.png",
          url: "https://pepecoin.io",
          isDarkMode: false,
        }}
        sdkOptions={{
          alchemyApiKey: process.env.REACT_APP_ALCHEMY_KEY as string,
        }}
        supportedWallets={[
          metamaskWallet({ recommended: true }),
          coinbaseWallet(),
          walletConnect(),
          safeWallet({
            personalWallets: [
              metamaskWallet({ recommended: true }),
              coinbaseWallet(),
              walletConnect(),
              embeddedWallet(),
              trustWallet(),
              zerionWallet(),
            ],
          }),
          embeddedWallet(),
          trustWallet(),
          zerionWallet(),
        ]}
        {...thirdwebConfig}
      >
        <XMTPProvider>
          <App />
        </XMTPProvider>
      </ThirdwebProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
