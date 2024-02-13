import React, { FC, useEffect, useState } from "react";
import { BlinkingCursor, BootScreenSC } from "./BootScreen.styled";
import PressEnter from "./components/PressEnter";
import { useDispatch } from "react-redux";
import { setBootState } from "@store/userInterface/userInterface";
import { EPageLoadingState } from "../../App";
import Ellipsis from "@components/Ellipsis";
import { ReactComponent as SvgPepeStar } from "@assets/svg/pepe-star.svg";

const messages = [
  "Detecting Dank Memes",
  "Loading Sweet Nostalgia",
  "Initializing Poompa",
];

const BootScreen: FC = () => {
  const [bootCompleted, setBootCompleted] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(currentMessageIndex + 1);
      }, 750);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setBootCompleted(true);
      }, 750);
    }
  }, [currentMessageIndex]);

  const handleKeyPress = () => {
    dispatch(setBootState(EPageLoadingState.Splash));
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [dispatch]);

  return (
    <BootScreenSC onClick={handleKeyPress} className="scanlines">
      <div className="top">
        <div className="boot-text">
          <SvgPepeStar />
          <p>
            Pepecoin BIOS v2016, A Dank Memes Ally
            <br />
            {`Copyright (c) 2016-${new Date().getFullYear()} Pepecoin Corporation.`}
          </p>
          <p>
            PepeCoin(R) Pepentium(R) 420 6900 MHz Processor
            <br />
            Autism Test: {">9000"} ... OK
          </p>
          <p>
            Award Plug and Pepe BIOS Extension v69.0
            <br />
            Initializing Plug and Pepe Cards ... OK
            <br />
            PEPE Init Completed
          </p>
          <div className="loading-items">
            {messages.slice(0, currentMessageIndex).map((message, index) => (
              <div key={index} className="bios-line">
                <p>{message}</p>
                <p>
                  <Ellipsis />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {bootCompleted && <PressEnter />}
    </BootScreenSC>
  );
};

export default BootScreen;
