import React, { useState, FC, useRef, useEffect } from "react";
import styled from "styled-components";
import WindowDropDowns from "@components/WindowDropDowns";
import dropDownData from "./dropDownData";
import ie from "@assets/pepeOS-icons/Pepe_Explorer.png";
import go from "@assets/windowsIcons/290.png";
import back from "@assets/windowsIcons/back.png";
import links from "@assets/windowsIcons/links.png";
import earth from "@assets/windowsIcons/earth.png";
import dropdown from "@assets/windowsIcons/dropdown.png";
import HomePage from "./components/HomePage/HomePage";
import homePng from "@assets/pepeOS-icons/Computer.png";
import utilitiesPng from "@assets/windowsIcons/119(16x16).png";
import tokenomicsPng from "@assets/pepeOS-icons/Pepe_Star.png";
import teamPng from "@assets/pepeOS-icons/Pepe_Family.png";
import historyPng from "@assets/pepeOS-icons/History.png";
import { setExplorerNavState } from "@store/userInterface/userInterface";
import { TRootState } from "@store/index";
import { useSelector } from "react-redux";
import pepesoftPng from "@assets/png/pepecoin-logo.png";
import { EProfileNavigation } from "./components/TeamProfiles/TeamProfiles";
import { useAppDispatch } from "@hooks/useAppDispatch";

export enum EExplorerNavState {
  About = "About",
  Team = "My Frens",
  History = "History",
  // Tokenomics = "Tokenomics",
  // Utilities = "Utilities",
}

type TNavItem = {
  text: EExplorerNavState;
  onClick: string;
  icon: string;
};

function convertToSnakeCase(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "_");
}

export const explorerNavItems: TNavItem[] = [
  { text: EExplorerNavState.About, onClick: "", icon: homePng },
  { text: EExplorerNavState.Team, onClick: "", icon: teamPng },
  { text: EExplorerNavState.History, onClick: "", icon: historyPng },
  // { text: EExplorerNavState.Tokenomics, onClick: "", icon: tokenomicsPng },
  // { text: EExplorerNavState.Utilities, onClick: "", icon: utilitiesPng },
];

type TExplorerNavButtonProps = {
  text: EExplorerNavState;
  icon: string;
};

const ExplorerNavButton: FC<TExplorerNavButtonProps> = ({ text, icon }) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className="ie__function_bar__button"
      onClick={() => dispatch(setExplorerNavState(text))}
    >
      <img className="ie__function_bar__icon--normalize " src={icon} alt="" />
      <span className="ie__function_bar__text">{text}</span>
    </div>
  );
};

type TInternetExplorerProps = {
  onClose: () => void;
};

const InternetExplorer: FC<TInternetExplorerProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  const explorerNavState = useSelector(
    (state: TRootState) => state.userInterface.explorerNavState
  ) as EExplorerNavState;

  const activeProfile = useSelector(
    (state: TRootState) => state.userInterface.activeProfile
  ) as EProfileNavigation;

  function goMain() {
    dispatch(setExplorerNavState(EExplorerNavState.About));
  }

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

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }
  }, [explorerNavState, activeProfile]);

  return (
    <Div>
      <section className="ie__toolbar">
        <div className="ie__options">
          <WindowDropDowns
            items={dropDownData}
            onClickItem={onClickOptionItem}
            height={21}
          />
        </div>
        <img className="ie__windows-logo" src={pepesoftPng} alt="pepesoft" />
      </section>
      <section className="ie__function_bar">
        <div
          onClick={goMain}
          className={`ie__function_bar__button${
            explorerNavState === EExplorerNavState.About ? "--disable" : ""
          }`}
        >
          <img className="ie__function_bar__icon" src={back} alt="" />
          <span className="ie__function_bar__text">Back</span>
          <div className="ie__function_bar__arrow" />
        </div>

        <div className="ie__function_bar__separate" />
        {explorerNavItems.map((item, index) => {
          return (
            <div key={index}>
              <ExplorerNavButton text={item.text} icon={item.icon} />
            </div>
          );
        })}

        <div className="ie__function_bar__separate" />
      </section>
      <section className="ie__address_bar">
        <div className="ie__address_bar__title">Address</div>
        <div className="ie__address_bar__content">
          <img src={ie} alt="ie" className="ie__address_bar__content__img" />
          <div className="ie__address_bar__content__text">
            {`https://www.pepecoin.io${
              explorerNavState != EExplorerNavState.About
                ? `/search?q=${convertToSnakeCase(explorerNavState)}`
                : ""
            }`}
          </div>
          <img
            src={dropdown}
            alt="dropdown"
            className="ie__address_bar__content__img"
          />
        </div>
        <div className="ie__address_bar__go">
          <img className="ie__address_bar__go__img" src={go} alt="go" />
          <span className="ie__address_bar__go__text">Go</span>
        </div>
        <div className="ie__address_bar__separate" />
        <div className="ie__address_bar__links">
          <span className="ie__address_bar__links__text">Links</span>
          <img
            className="ie__address_bar__links__img"
            src={links}
            alt="links"
          />
        </div>
      </section>
      <div className="ie__content" ref={contentRef}>
        <div className="ie__content__inner">
          <HomePage />
        </div>
      </div>
      <footer className="ie__footer">
        <div className="ie__footer__status">
          <img className="ie__footer__status__img" src={ie} alt="" />
          <span className="ie__footer__status__text">Done</span>
        </div>
        <div className="ie__footer__block" />
        <div className="ie__footer__block" />
        <div className="ie__footer__block" />
        <div className="ie__footer__block" />
        <div className="ie__footer__right">
          <img className="ie__footer__right__img" src={earth} alt="" />
          <span className="ie__footer__right__text">PepeNet</span>
          <div className="ie__footer__right__dots" />
        </div>
      </footer>
    </Div>
  );
};

const Div = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background: ${({ theme }) => theme.defaultWindowBodyBackground};

  .ie__toolbar {
    position: relative;
    display: flex;
    align-items: center;
    line-height: 100%;
    height: 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    flex-shrink: 0;
  }
  .ie__options {
    height: 23px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    border-right: 1px solid rgba(0, 0, 0, 0.15);
    padding-left: 2px;
    flex: 1;
  }
  .ie__windows-logo {
    height: 100%;
    border-left: 1px solid white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .ie__function_bar {
    height: 36px;
    display: flex;
    align-items: center;
    font-size: 11px;
    padding: 1px 3px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .ie__function_bar__button {
    display: flex;
    height: 100%;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 3px;
    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: inset 0 -1px 1px rgba(0, 0, 0, 0.1);
    }
    &:hover:active {
      border: 1px solid rgb(185, 185, 185);
      background-color: #dedede;
      box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.7);
      color: rgba(255, 255, 255, 0.7);
      & > * {
        transform: translate(1px, 1px);
      }
    }
  }
  .ie__function_bar__button--disable {
    filter: grayscale(1);
    opacity: 0.7;
    display: flex;
    height: 100%;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0);
  }
  .ie__function_bar__text {
    margin-right: 4px;
  }
  .ie__function_bar__icon {
    height: 30px;
    width: 30px;
    &--normalize {
      height: 22px;
      width: 22px;
      margin: 0 4px 0 1px;
    }
    &--margin12 {
      height: 22px;
      width: 22px;
      margin: 0 1px 0 2px;
    }
    &--margin-1 {
      margin: 0 -1px;
      height: 30px;
      width: 30px;
    }
  }
  .ie__function_bar__separate {
    height: 90%;
    width: 1px;
    background-color: rgba(0, 0, 0, 0.2);
    margin: 0 2px;
  }
  .ie__function_bar__arrow {
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 4px;
    &:before {
      content: "";
      display: block;
      border-width: 3px 3px 0;
      border-color: var(--black) transparent;
      border-style: solid;
    }
  }
  .ie__function_bar__arrow--margin-11 {
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 1px 0 -1px;
    &:before {
      content: "";
      display: block;
      border-width: 3px 3px 0;
      border-color: var(--black) transparent;
      border-style: solid;
    }
  }
  .ie__address_bar {
    border-top: 1px solid rgba(255, 255, 255, 0.7);
    height: 22px;
    font-size: 11px;
    display: flex;
    align-items: center;
    padding: 0 2px 2px;
    box-shadow: inset 0 -2px 3px -1px #2d2d2d;
  }
  .ie__address_bar__title {
    line-height: 100%;
    color: rgba(0, 0, 0, 0.5);
    padding: 5px;
  }
  .ie__address_bar__content {
    border: rgba(122, 122, 255, 0.6) 1px solid;
    height: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    background-color: white;
    position: relative;
    &__img {
      width: 14px;
      height: 14px;
    }
    &__img:last-child {
      width: 15px;
      height: 15px;
      right: 1px;
      position: absolute;
    }
    &__img:last-child:hover {
      filter: brightness(1.1);
    }
    &__text {
      position: absolute;
      white-space: nowrap;
      left: 16px;
      right: 17px;
      overflow: hidden;
    }
  }
  .ie__address_bar__go {
    display: flex;
    align-items: center;
    padding: 0 18px 0 5px;
    height: 100%;
    position: relative;
    &__img {
      height: 95%;
      border: 1px solid rgba(255, 255, 255, 0.2);
      margin-right: 3px;
    }
  }
  .ie__address_bar__links {
    display: flex;
    align-items: center;
    padding: 0 18px 0 5px;
    height: 100%;
    position: relative;
    &__img {
      position: absolute;
      right: 2px;
      top: 3px;
      height: 5px;
      width: 8px;
    }
    &__text {
      color: rgba(0, 0, 0, 0.5);
    }
  }
  .ie__address_bar__separate {
    height: 100%;
    width: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    box-shadow: 1px 0 rgba(255, 255, 255, 0.7);
  }
  .ie__content {
    flex: 1;
    overflow: auto;
    padding-left: 1px;
    border-left: 1px solid #6f6f6f;
    background-color: #f1f1f1;
    position: relative;
  }
  .ie__content__inner {
    position: relative;
    width: 100%;
    height: 100%;

    @media only screen and (max-width: 800px) {
      min-width: 200px;
    }
  }
  .ie__footer {
    height: 20px;
    border-top: 1px solid transparent;
    box-shadow: inset 0 1px 3px rgba(50, 50, 50, 0.8);
    background-color: rgb(236, 233, 216);
    display: flex;
    align-items: center;
    padding-top: 2px;
  }
  .ie__footer__status {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 2px;
    &__text {
      font-size: 11px;
    }
    &__img {
      height: 14px;
      width: 14px;
      margin-right: 3px;
    }
  }
  .ie__footer__block {
    height: 85%;
    width: 22px;
    border-left: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: inset 1px 0 rgba(255, 255, 255, 0.7);
  }
  .ie__footer__right {
    display: flex;
    align-items: center;
    width: 150px;
    height: 80%;
    border-left: 1px solid rgba(0, 0, 0, 0.11);
    box-shadow: inset 1px 0 rgba(255, 255, 255, 0.7);
    padding-left: 5px;
    position: relative;
    &__text {
      font-size: 11px;
    }
    &__img {
      height: 14px;
      width: 14px;
      margin-right: 3px;
    }
    &__dots {
      position: absolute;
      right: 11px;
      bottom: -1px;
      width: 2px;
      height: 2px;
      box-shadow: 2px 0px rgba(0, 0, 0, 0.25), 5.5px 0px rgba(0, 0, 0, 0.25),
        9px 0px rgba(0, 0, 0, 0.25), 5.5px -3.5px rgba(0, 0, 0, 0.25),
        9px -3.5px rgba(0, 0, 0, 0.25), 9px -7px rgba(0, 0, 0, 0.25),
        3px 1px rgba(255, 255, 255, 1), 6.5px 1px rgba(255, 255, 255, 1),
        10px 1px rgba(255, 255, 255, 1), 10px -2.5px rgba(255, 255, 255, 1),
        10px -6px rgba(255, 255, 255, 1);
    }
  }
`;

export default InternetExplorer;
