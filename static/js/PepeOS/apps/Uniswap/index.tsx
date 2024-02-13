import React, { useState, FC } from "react";
import styled from "styled-components";
import WindowDropDowns from "@components/WindowDropDowns";
import dropDownData from "./dropDownData";
import ie from "@assets/windowsIcons/ie-paper.png";
import go from "@assets/windowsIcons/290.png";
import back from "@assets/windowsIcons/back.png";
import links from "@assets/windowsIcons/links.png";
import earth from "@assets/windowsIcons/earth.png";
import dropdown from "@assets/windowsIcons/dropdown.png";
import pepesoftPng from "@assets/png/pepecoin-logo.png";
import UniswapPage from "./components/UniswapPage";
import printer from "@assets/windowsIcons/17(32x32).png";
import search from "@assets/pepeOS-icons/search.png";
import favorite from "@assets/windowsIcons/744(32x32).png";
import edit from "@assets/windowsIcons/edit.png";
import forward from "@assets/windowsIcons/forward.png";
import history from "@assets/windowsIcons/history.png";
import home from "@assets/windowsIcons/home.png";
import mail from "@assets/windowsIcons/mail.png";
import msn from "@assets/windowsIcons/msn.png";
import refresh from "@assets/windowsIcons/refresh.png";
import stop from "@assets/windowsIcons/stop.png";
import { IEWrapperSC } from "./Uniswap.styled";

type TInternetExplorerProps = {
  onClose: () => void;
};

const Uniswap: FC<TInternetExplorerProps> = ({ onClose }) => {
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
          <UniswapPage />
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
          <span className="ie__footer__right__text">Uniswap</span>
          <div className="ie__footer__right__dots" />
        </div>
      </footer>
    </IEWrapperSC>
  );
};

export default Uniswap;
