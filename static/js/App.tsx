import React, { useEffect, useState } from "react";
import Splash from "@components/Splash";
import BootScreen from "@components/BootScreen";
import PepeOSTour from "@PepeOS/apps/Tour";
import { TRootState } from "./store";
import { useSelector } from "react-redux";
import PepeOS from "./PepeOS";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styled, { keyframes, css } from "styled-components";
import AuthScreen from "@PepeOS/AuthScreen";
import {
  setEnsAvatar,
  setEnsDataLoading,
  setEnsName,
} from "@store/userAccount/userAccount";
import { Analytics, track } from "@vercel/analytics/react";
import { initialize } from "./helpers";
import { useAddress } from "@thirdweb-dev/react";
import { AlchemyProvider } from "ethers";
import { loadAppSettings } from "@store/osState/pepeOSThunk";
import { useAppDispatch } from "@hooks/useAppDispatch";
import Snowfall from "react-snowfall";
import { EThemeMode, ThemeProvider, useTheme } from "./ThemeContext";
import spaceBg from "@assets/background/spaceship-bg.webp";
import spacePano from "@assets/background/space-pano.webp";

const queryClient = new QueryClient();

export enum EPageLoadingState {
  Booting = "Booting",
  Splash = "Splash",
  Tour = "Tour",
  Auth = "Auth",
  Desktop = "Desktop",
  Password = "Password",
}

type TAppSCProps = {
  customBackground?: string | null;
};

const scanline = keyframes`
  0% {
    transform: translate3d(0, 200000%, 0);
  }
`;

const scanlines = keyframes`
  0% {
    background-position: 0 50%;
  }
`;

const scrollPanorama = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -2460px 0; 
  }
`;

const Panorama = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(${spacePano}) repeat-x;
  background-size: 2457px auto;
  animation: ${scrollPanorama} 60s linear infinite;
  z-index: -1;
`;

const scanCrt = (scanCrt: boolean) => {
  if (scanCrt) {
    return css`
      animation: ${scanlines} 1s steps(50) infinite;
    `;
  } else {
    return css`
      animation: none;
    `;
  }
};

const scanMoving = (scanMovingLine: boolean) => {
  if (scanMovingLine) {
    return css`
      animation: ${scanline} 6s linear infinite;
    `;
  } else {
    return css`
      animation: none;
    `;
  }
};

export const AppSC = styled.div<TAppSCProps>`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url(${({ customBackground, theme }) =>
      customBackground || theme.background})
    no-repeat center center;
  background-size: cover;

  .bevel {
    box-shadow: ${({ theme }) => theme.bevel};
  }

  @media (max-width: 768px) {
    background: url(${({ customBackground, theme }) =>
        customBackground || theme.backgroundMobile})
      no-repeat center center;
    background-size: cover;
  }
  &.scanlines {
    position: relative;
    overflow: hidden;

    &:before,
    &:after {
      display: block;
      pointer-events: none;
      content: "";
      position: absolute;
    }

    &:before {
      width: 100%;
      height: 1.1px;
      z-index: 2147483648 + 1;
      background: rgba(0, 0, 0, 0.1);
      opacity: 1;
      ${scanMoving(true)}
    }

    &:after {
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 2147483648;
      background: linear-gradient(
        to bottom,
        transparent 50%,
        rgba(0, 0, 0, 0.1) 51%
      );
      background-size: 100% 2.2px;
      ${scanCrt(true)}
    }
  }
`;

const renderPage = (pageState: EPageLoadingState) => {
  switch (pageState) {
    // case EPageLoadingState.Password:
    //   return <Password />;
    case EPageLoadingState.Booting:
      return <BootScreen />;
    case EPageLoadingState.Splash:
      return <Splash />;
    case EPageLoadingState.Tour:
      return <PepeOSTour />;
    case EPageLoadingState.Auth:
      return <AuthScreen />;
    default:
      return (
        <QueryClientProvider client={queryClient}>
          <PepeOS />
        </QueryClientProvider>
      );
  }
};

function App() {
  const [initialized, setInitialized] = useState(false);
  const { theme } = useTheme();

  const customBackgroundImage = useSelector(
    (state: TRootState) => state.userInterface.customBackgroundImage
  );

  const isSpaceBg = customBackgroundImage === spaceBg;

  useEffect(() => {
    const initI18n = async () => {
      await initialize();
      setInitialized(true);
    };
    void initI18n();
  }, []);
  const dispatch = useAppDispatch();
  const bootState = useSelector(
    (state: TRootState) => state.userInterface.bootState
  ) as EPageLoadingState;
  const crtToggleState = useSelector(
    (state: TRootState) => state.userInterface.crtToggleState
  ) as boolean;
  const address = useAddress();

  useEffect(() => {
    if (address) {
      track("User Connected", { address: address });
    }
  }, [address]);

  useEffect(() => {
    // Load the app settings
    dispatch(loadAppSettings());
  }, [dispatch]);

  useEffect(() => {
    let cancel = false;
    dispatch(setEnsDataLoading(true));

    const fetchEnsDataAsync = async () => {
      const provider = new AlchemyProvider(
        "mainnet",
        process.env.REACT_APP_ALCHEMY_KEY
      );

      try {
        const ens = address
          ? await provider.lookupAddress(`${address as string}`)
          : null;

        if (cancel) return;

        if (ens) {
          dispatch(setEnsName(ens));
          localStorage.setItem("ensName", ens);
          const avatar = `https://effigy.im/a/${address}.svg`;

          if (cancel) return;

          if (avatar) {
            dispatch(setEnsAvatar(avatar));
            localStorage.setItem("ensAvatar", avatar);
          }
        } else {
          dispatch(setEnsAvatar(null));
          dispatch(setEnsName(null));
          localStorage.removeItem("ensName");
          localStorage.removeItem("ensAvatar");
        }
      } catch (error) {
        if (!cancel) {
          console.error(error);
        }
      } finally {
        dispatch(setEnsDataLoading(false));
      }
    };

    fetchEnsDataAsync();

    return () => {
      cancel = true;
    };
  }, [address, dispatch]);

  return initialized ? (
    <ThemeProvider>
      <AppSC
        className={crtToggleState ? "scanlines" : ""}
        customBackground={customBackgroundImage}
      >
        {isSpaceBg && <Panorama />}
        {theme === EThemeMode.Christmas && <Snowfall />}
        {renderPage(bootState)}
        <Analytics />
      </AppSC>
    </ThemeProvider>
  ) : null;
}

export default App;
