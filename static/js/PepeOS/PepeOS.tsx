import React, { useRef, useCallback, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { TRootState } from "@store/index";
import { useSelector } from "react-redux";
import {
  addApp,
  cancelPowerOff,
  delApp,
  endSelect,
  focusApp,
  focusDesktop,
  focusIcon,
  minimizeApp,
  selectIcons,
  startSelect,
  toggleMaximizeApp,
} from "@store/osState/pepeOS.slice";
import useMouse from "react-use/lib/useMouse";
import { FOCUSING, POWER_STATE } from "./constants";
import Modal from "./Modal";
import Windows from "./Windows";
import Icons from "./Icons";
import DashedBox from "@components/DashedBox";
import shadilayStart from "@assets/audio/shadilay-boot-sound.mp3";
import { setBootState } from "@store/userInterface/userInterface";
import { EPageLoadingState } from "../App";
import StartBar from "@components/StartBar";
import {
  addAppWithSettings,
  loadAppSettings,
} from "@store/osState/pepeOSThunk";
import { EAppKeys } from "./apps/appState/EAppKeys";
import { useAppDispatch } from "@hooks/useAppDispatch";

const audio = new Audio(shadilayStart);

const PepeOS: React.FC = () => {
  const dispatch = useAppDispatch();

  const state = useSelector((state: TRootState) => state.pepeOSSlice);

  const appSettings = useSelector(
    (state: TRootState) => state.pepeOSSlice.appSettings
  );

  const ref = useRef<HTMLDivElement>(null);
  const mouse = useMouse(ref);
  const focusedAppId = getFocusedAppId();

  const onFocusApp = useCallback(
    (id: number) => {
      dispatch(focusApp(id));
    },
    [dispatch]
  );

  useEffect(() => {
    // Check if the tour has been completed
    const tourComplete = localStorage.getItem("tourComplete") === "true";

    // Dispatch the action to add the initial app based on whether the tour is complete
    if (tourComplete) {
      dispatch(addAppWithSettings(EAppKeys.Messenger)); // Or any other app that should be the default
    } else {
      dispatch(addAppWithSettings(EAppKeys.Tour)); // The tour app
    }
  }, [dispatch]);

  useEffect(() => {
    audio.play();

    setTimeout(() => {
      let fadePoint = audio.duration - 1;
      let fadeAudio = setInterval(function () {
        if (audio.currentTime >= fadePoint && audio.volume != 0.0) {
          audio.volume -= 0.1;
          if (audio.volume <= 0.1) {
            audio.volume = 0.0;
            clearInterval(fadeAudio);
          }
        }
        if (audio.volume === 0.0) {
          audio.pause();
        }
      }, 100);
    }, 3000);
  }, []);

  const onMaximizeWindow = useCallback(
    (id: number) => {
      if (focusedAppId === id) {
        dispatch(toggleMaximizeApp(id));
      }
    },
    [focusedAppId, dispatch]
  );
  const onMinimizeWindow = useCallback(
    (id: number) => {
      if (focusedAppId === id) {
        dispatch(minimizeApp(id));
      }
    },
    [focusedAppId, dispatch]
  );
  const onCloseApp = useCallback(
    (id: number) => {
      if (focusedAppId === id) {
        dispatch(delApp(id));
      }
    },
    [focusedAppId, dispatch]
  );
  function onMouseDownFooterApp(id: number) {
    if (focusedAppId === id) {
      dispatch(minimizeApp(id));
    } else {
      dispatch(focusApp(id));
    }
  }
  function onMouseDownIcon(id: number) {
    dispatch(focusIcon(id));
  }
  function onDoubleClickIcon(component: React.ComponentType<any>) {
    if (appSettings) {
      const appSetting = Object.values(appSettings).find(
        (setting) => setting.component === component
      );
      if (appSetting) {
        dispatch(addApp(appSetting));
      } else {
        // Handle the case where the app setting is not found
        console.error("App setting not found for component:", component);
      }
    } else {
      // Handle the case where appSettings is null
      console.error("App settings are not loaded.");
      // Optionally, dispatch an action to load the settings
      // dispatch(loadAppSettings());
    }
  }
  function getFocusedAppId() {
    if (state.focusing !== FOCUSING.WINDOW) return -1;
    const focusedApp = [...state.apps]
      .sort((a, b) => b.zIndex - a.zIndex)
      .find((app) => !app.minimized);
    return focusedApp ? focusedApp.id : -1;
  }
  function onMouseDownFooter() {
    dispatch(focusDesktop());
  }
  function onClickMenuItem(o: string) {
    if (o === "Memesweeper") dispatch(addAppWithSettings(EAppKeys.Memesweeper));
    else if (o === "Notepepe") dispatch(addAppWithSettings(EAppKeys.Notepepe));
    else if (o === "My Pepes") dispatch(addAppWithSettings(EAppKeys.Wallet));
    else if (o === "Kekmas 2023")
      dispatch(addAppWithSettings(EAppKeys.ChristmasClaims));
    else if (o === "Wenpamp") dispatch(addAppWithSettings(EAppKeys.Wenpamp));
    else if (o === "Pepe Paint")
      dispatch(addAppWithSettings(EAppKeys.PepePaint));
    else if (o === "Pepe Explorer")
      dispatch(addAppWithSettings(EAppKeys.Explorer));
    // else if (o === "Pokémon Clover")
    //   dispatch(addAppWithSettings(EAppKeys.RedAlert));
    else if (o === "Uniswap") dispatch(addAppWithSettings(EAppKeys.Uniswap));
    else if (o === "Pepemail") dispatch(addAppWithSettings(EAppKeys.Pepemail));
    else if (o === "Frogger") dispatch(addAppWithSettings(EAppKeys.Frogger));
    else if (o === "Help and Support")
      dispatch(addAppWithSettings(EAppKeys.Tour));
    else if (o === "User Preferences")
      dispatch(addAppWithSettings(EAppKeys.UserPreferences));
    else if (o === "Log Off") dispatch(setBootState(EPageLoadingState.Booting));
    else if (o === "Turn Off Computer")
      dispatch(setBootState(EPageLoadingState.Booting));
    // else
    //   dispatch({
    //     type: ADD_APP,
    //     payload: {
    //       ...appSettings.Error,
    //       injectProps: { message: "C:\\\nApplication not found" },
    //     },
    //   });
  }
  function onMouseDownDesktop(e: React.MouseEvent) {
    if (e.target === e.currentTarget)
      dispatch(startSelect({ x: mouse.docX, y: mouse.docY }));
  }

  function onMouseUpDesktop(e: React.MouseEvent) {
    dispatch(endSelect());
  }

  const onIconsSelected = useCallback(
    (iconIds: number[]) => {
      dispatch(selectIcons(iconIds));
    },
    [dispatch]
  );

  function onClickModalButton(text: string) {
    dispatch(cancelPowerOff());
    dispatch(addAppWithSettings(EAppKeys.Error));
  }

  function onModalClose() {
    dispatch(cancelPowerOff());
  }
  return (
    <Container
      ref={ref}
      onMouseUp={onMouseUpDesktop}
      onMouseDown={onMouseDownDesktop}
      state={state.powerState}
    >
      <Icons
        icons={state.icons}
        onMouseDown={onMouseDownIcon}
        onDoubleClick={onDoubleClickIcon}
        displayFocus={state.focusing === FOCUSING.ICON}
        mouse={mouse}
        selecting={state.selecting}
        setSelectedIcons={onIconsSelected}
      />
      <DashedBox startPos={state.selecting} mouse={mouse} />
      <Windows
        apps={state.apps}
        onMouseDown={onFocusApp}
        onClose={onCloseApp}
        onMinimize={onMinimizeWindow}
        onMaximize={onMaximizeWindow}
        focusedAppId={focusedAppId}
      />
      <StartBar
        apps={state.apps}
        onMouseDownApp={onMouseDownFooterApp}
        focusedAppId={focusedAppId}
        onMouseDown={onMouseDownFooter}
        onClickMenuItem={onClickMenuItem}
      />
      {state.powerState !== POWER_STATE.START && (
        <Modal
          onClose={onModalClose}
          onClickButton={onClickModalButton}
          mode={state.powerState}
        />
      )}
    </Container>
  );
};

const powerOffAnimation = keyframes`
  0% {
    filter: brightness(1) grayscale(0);
  }
  30% {
    filter: brightness(1) grayscale(0);
  }
  100% {
    filter: brightness(0.6) grayscale(1);
  }
`;

type AnimationState = (typeof POWER_STATE)[keyof typeof POWER_STATE];

const animation: Record<AnimationState, string | typeof powerOffAnimation> = {
  [POWER_STATE.START]: "",
  [POWER_STATE.TURN_OFF]: powerOffAnimation,
  [POWER_STATE.LOG_OFF]: powerOffAnimation,
};

const Container = styled.div<{ state: AnimationState }>`
  @import url("https://fonts.googleapis.com/css?family=Noto+Sans");
  font-family: Tahoma, "Noto Sans", sans-serif;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-size: cover;
  animation: ${({ state }) => animation[state]} 5s forwards;
  *:not(input):not(textarea) {
    user-select: text;
  }
`;

export default PepeOS;
