import React, { FC, useEffect } from "react";
import { SplashSC } from "./Splash.styled";
import pepesoftPng from "@assets/webp/pepe-og-white.webp";
import { useDispatch } from "react-redux";
import { setBootState } from "@store/userInterface/userInterface";
import { EPageLoadingState } from "../../App";

const ProgressPiece = () => {
  return (
    <div className="progress-piece">
      <span />
      <span />
      <span />
    </div>
  );
};

const Splash: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setBootState(EPageLoadingState.Auth));
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyPress = () => {
    dispatch(setBootState(EPageLoadingState.Auth));
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [dispatch]);

  return (
    <SplashSC className="scanlines" onClick={handleKeyPress}>
      <img src={pepesoftPng} alt="pepesoft" />
      <div className="progress-bar">
        <ProgressPiece />
      </div>
    </SplashSC>
  );
};

export default Splash;
