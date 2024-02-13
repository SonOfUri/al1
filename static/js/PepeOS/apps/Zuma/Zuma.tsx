import React, { useState, FC } from "react";
import WindowDropDowns from "@components/WindowDropDowns";
import ie from "@assets/windowsIcons/ie-paper.png";
import earth from "@assets/windowsIcons/earth.png";
import pepesoftPng from "@assets/png/pepecoin-logo.png";
import { ZumaSC } from "./Zuma.styled";
import dropDownData from "../InternetExplorer/dropDownData";

type TInternetExplorerProps = {
  onClose: () => void;
};

const Zuma: FC<TInternetExplorerProps> = ({ onClose }) => {
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

  return (
    <ZumaSC>
      <section className="ie__toolbar">
        <div className="ie__options">
          <WindowDropDowns
            items={dropDownData}
            onClickItem={onClickOptionItem}
            height={21}
          />
        </div>
        <img className="ie__windows-logo" src={pepesoftPng} alt="windows" />
      </section>
      <div className="ie__content">
        <div className="ie__content__inner">
          <iframe
            src="https://zumaballs.com/flash/zuma-deluxe-2/index.htm"
            width="100%"
            height="100%"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
      <footer className="ie__footer">
        <div className="ie__footer__status">
          <img className="ie__footer__status__img" src={ie} alt="" />
          <span className="ie__footer__status__text">Ready</span>
        </div>
        <div className="ie__footer__block" />
        <div className="ie__footer__block" />
        <div className="ie__footer__block" />
        <div className="ie__footer__block" />
        <div className="ie__footer__right">
          <img className="ie__footer__right__img" src={earth} alt="" />
          <span className="ie__footer__right__text">Zuma Deluxe</span>
          <div className="ie__footer__right__dots" />
        </div>
      </footer>
    </ZumaSC>
  );
};

export default Zuma;
