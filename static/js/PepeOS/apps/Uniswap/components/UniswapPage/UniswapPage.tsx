import React, { FC } from "react";
import { SwapWidget, lightTheme } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import { WidgetWrapperSC } from "../../Uniswap.styled";
import pepecoinLogo from "@assets/png/pepecoin-logo.png";

// Pepecoin Token List
const MY_TOKEN_LIST = [
  {
    name: "Dai Stablecoin",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    symbol: "DAI",
    decimals: 18,
    chainId: 1,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
  },
  {
    name: "Tether USD",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    symbol: "USDT",
    decimals: 6,
    chainId: 1,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
  },
  {
    name: "USD Coin",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    symbol: "USDC",
    decimals: 6,
    chainId: 1,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  },
  {
    name: "PepeCoin",
    address: "0xa9e8acf069c58aec8825542845fd754e41a9489a",
    symbol: "PEPECOIN",
    decimals: 18,
    chainId: 1,
    logoURI:
      "https://www.pepecoin.io/static/media/pepecoin-logo.c7a3818c07395624f6dc.png",
  },
];

// Use the native token of the connected chain as the default input token
const NATIVE = "NATIVE"; // Special address for native token

// WBTC as the default output token
const PEPECOIN = "0xa9e8acf069c58aec8825542845fd754e41a9489a";

const UniswapPage: FC = () => {
  return (
    <WidgetWrapperSC className="Uniswap">
      <SwapWidget
        theme={lightTheme}
        tokenList={MY_TOKEN_LIST}
        defaultInputTokenAddress={NATIVE}
        defaultInputAmount={1}
        defaultOutputTokenAddress={PEPECOIN}
        width={window.innerWidth > 800 ? 460 : 360}
      />
    </WidgetWrapperSC>
  );
};

export default UniswapPage;
