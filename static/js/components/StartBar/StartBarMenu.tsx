import React, { useState, MouseEvent, CSSProperties, ReactNode } from "react";
import styled from "styled-components";
import SubMenu from "@components/SubMenu";
import mine from "@assets/pepeOS-icons/memesweeper.png";
import pepemailIcon from "@assets/pepeOS-icons/Mail.png";
import mediaPlayer from "@assets/pepeOS-icons/Pepe_DJ1.png";
import messenger from "@assets/webp//messenger_ui/pepe_messenger.webp";
import documents from "@assets/pepeOS-icons/documents.png";
import paint from "@assets/pepeOS-icons/paint.png";
import help from "@assets/windowsIcons/747(32x32).png";

import lock from "@assets/windowsIcons/546(32x32).png";
import shut from "@assets/windowsIcons/310(32x32).png";
import allProgramsIcon from "@assets/windowsIcons/all-programs.ico";
import winamp from "@assets/windowsIcons/winamp.png";
import notepad from "@assets/pepeOS-icons/notepepe.png";
import empty from "@assets/empty.png";
import uniswapLogo from "@assets/svg/uniswap.svg";
import { AllPrograms } from "./StartBarMenuData";
import { useDispatch } from "react-redux";
import {
  setBootState,
  setCrtToggleState,
} from "@store/userInterface/userInterface";
import { useSelector } from "react-redux";
import { TRootState } from "@store/index";
import { EPageLoadingState } from "../../App";
import { setIsGuest } from "@store/userAccount/userAccount";
import UserAvatar from "@components/UserAvatar";
import PulseLoader from "react-spinners/PulseLoader";
import twitterIcon from "@assets/webp/x.webp";
import telegramIcon from "@assets/png/telegram.png";
import dextoolsIcon from "@assets/png/dextools.png";
import { TNullableString } from "@base/types/common";
import { shortAddress } from "@helpers/string";
import { useAddress } from "@thirdweb-dev/react";
import { ReactComponent as SvgSpinner } from "@assets/svg/spinner.svg";
import computerIcon from "@assets/pepeOS-icons/Computer.png";
import claimsLogo from "@assets/webp/christmas/green_gift.webp";

type TIndividualItemProps = {
  style?: CSSProperties;
  text: string | ReactNode;
  icon: string;
  onHover?: (text: string) => void;
  onClick: (name: string) => void;
  children?: ReactNode;
  url?: TNullableString;
};

type TAllItemsProps = {
  items: Array<{
    icon: string;
    text: string | ReactNode;
    url?: string;
  }>;
  onClick: (name: string) => void;
};

type TFooterMenuProps = {
  className?: string;
  onClick: (name: string) => void;
};

const StartBarMenu: React.FC<TFooterMenuProps> = ({ className, onClick }) => {
  const [hovering, setHovering] = useState<string>("");
  const dispatch = useDispatch();
  const address = useAddress();

  const crtToggleState = useSelector(
    (state: TRootState) => state.userInterface.crtToggleState
  ) as boolean;

  const isGuest = useSelector(
    (state: TRootState) => state.userAccount.isGuest
  ) as boolean;

  const ensDataLoading = useSelector(
    (state: TRootState) => state.userAccount.isLoading
  ) as boolean;

  const pepecoinBalance = useSelector(
    (state: TRootState) => state.userAccount.pepecoinBalance
  ) as TNullableString;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCrtToggleState(event.target.checked));
  };

  const onMouseOver = (e: MouseEvent) => {
    const item = (e.target as HTMLElement).closest(".menu__item");
    if (!item) return;
    setHovering(item.querySelector(".menu__item__text")?.textContent || "");
  };

  const userName = isGuest ? "Guest" : shortAddress(address as string);

  return (
    <div className={className}>
      <header>
        <UserAvatar classNames={"header__img"} />
        <span className="header__text">
          <span>
            {ensDataLoading ? (
              <PulseLoader size={8} color={"#fff"} />
            ) : (
              userName
            )}
          </span>
          {!isGuest && (
            <span style={{ fontWeight: 400, fontSize: "0.7rem" }}>
              Pepecoins:{" "}
              {pepecoinBalance ? (
                pepecoinBalance
              ) : (
                <SvgSpinner className="loading-spinner" />
              )}
            </span>
          )}
        </span>
      </header>
      <section className="menu" onMouseOver={onMouseOver}>
        <hr className="orange-hr" />
        <div className="menu__left">
          <Item onClick={onClick} text="Pepemail" icon={pepemailIcon}>
            <div className="menu__item__subtext">Pepemail Client</div>
          </Item>
          <div className="menu__separator" />
          <Items
            onClick={onClick}
            items={[
              { icon: mine, text: "Memesweeper" },
              { icon: notepad, text: "Notepepe" },
              { icon: winamp, text: "Wenpamp" },
              { icon: paint, text: "Pepe Paint" },
              { icon: uniswapLogo, text: "Uniswap" },
              // { icon: mediaPlayer, text: "Pepe.DJ" },
              { icon: messenger, text: "Pepe Messenger" },
            ]}
          />
          <div style={{ flex: 1 }} />
          <div className="menu__separator" />
          <Item
            style={
              hovering === "All Programs"
                ? {
                    backgroundColor: "#2f71cd",
                    color: "#FFF",
                  }
                : {}
            }
            text={
              <div style={{ display: "flex", alignItems: "center" }}>
                All Programs
                <img
                  src={allProgramsIcon}
                  alt=""
                  style={{
                    marginLeft: "5px",
                    height: "18px",
                  }}
                />
              </div>
            }
            icon={empty}
            onClick={onClick}
          >
            {hovering === "All Programs" && (
              <SubMenu data={AllPrograms} onClick={onClick} />
            )}
          </Item>
        </div>
        <div className="menu__right">
          <Item text="My Pepes" icon={documents} onClick={onClick} />
          <Item text="Kekmas 2023" icon={claimsLogo} onClick={onClick} />

          {/* <Items
            onClick={onClick}
            items={[
              { icon: pictures, text: "My Pictures" },
              { icon: music, text: "My Music" },
            ]}
          /> */}
          {/* <div className="menu__separator" /> */}
          {/* TODO: Replace with metamask connection initiation */}
          {/* <Item
            style={
              hovering === "Connect To"
                ? {
                    backgroundColor: "#2f71cd",
                    color: "#FFF",
                  }
                : {}
            }
            text="Connect To"
            icon={connect}
            onClick={onClick}
          >
            <div
              style={{
                borderLeftColor: hovering === "Connect To" ? "#FFF" : "#00136b",
              }}
              className="menu__arrow"
            />
            {hovering === "Connect To" && (
              <SubMenu left="153px" data={ConnectTo} onClick={onClick} />
            )}
          </Item> */}
          <div className="menu__separator" />
          <Items
            onClick={onClick}
            items={[
              { icon: help, text: "Help and Support" },
              { icon: computerIcon, text: "User Preferences" },
              // { icon: search, text: "Search" },
              // { icon: run, text: "Run..." },
            ]}
          />
          <div className="menu__separator" />
          <Items
            onClick={onClick}
            items={[
              {
                icon: twitterIcon,
                text: "X.com",
                url: "https://x.com/pepecoins",
              },
              {
                icon: telegramIcon,
                text: "Telegram",
                url: "https://t.me/pepecoins",
              },
              {
                icon: dextoolsIcon,
                text: "Chart",
                url: "https://www.dextools.io/app/en/ether/pair-explorer/0xDDd23787a6B80A794d952f5fb036D0b31A8E6aff",
              },
            ]}
          />
          <div className="menu__separator" />
          <div className="crt-toggle">
            <input
              type="checkbox"
              id="crt-toggle"
              checked={crtToggleState}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="crt-toggle">Toggle Scanlines Effect</label>
          </div>
        </div>
      </section>
      <footer>
        <div
          className="footer__item"
          onClick={() => {
            dispatch(setIsGuest(null));
            dispatch(setBootState(EPageLoadingState.Auth));
          }}
        >
          <img className="footer__item__img" src={lock} alt="" />
          <span>Log Off</span>
        </div>
        <div
          className="footer__item"
          onClick={() => {
            dispatch(setIsGuest(null));
            dispatch(setBootState(EPageLoadingState.Booting));
          }}
        >
          <img className="footer__item__img" src={shut} alt="" />
          <span>Turn Off Computer</span>
        </div>
      </footer>
    </div>
  );
};

const Items: React.FC<TAllItemsProps> = ({ items, ...rest }) => {
  return (
    <>
      {items.map((item, i) => (
        <Item key={i} {...item} {...rest} />
      ))}
    </>
  );
};

const Item: React.FC<TIndividualItemProps> = ({
  style,
  text,
  icon,
  onHover = () => {},
  onClick = () => {},
  children,
  url,
}) => {
  const _onClick = () => {
    if (url) {
      window.open(url, "_blank");
    } else {
      onClick(text as string);
    }
  };

  const onMouseEnter = () => {
    onHover(text as string);
  };

  return (
    <div
      className="menu__item"
      style={style}
      onClick={_onClick}
      onMouseEnter={onMouseEnter}
    >
      <img className="menu__item__img" src={icon} alt={text as string} />
      <div className="menu__item__texts">
        <div className="menu__item__text ">{text}</div>
        {children}
      </div>
    </div>
  );
};

export default styled(StartBarMenu)`
  font-size: 11px;
  line-height: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #4282d6;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  header {
    position: relative;
    align-self: flex-start;
    display: flex;
    align-items: center;
    color: #fff;
    height: 54px;
    padding: 6px 5px 5px;
    width: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: ${({ theme }) => theme.barGradient};
    overflow: hidden;
  }
  header:before {
    content: "";
    display: block;
    position: absolute;
    top: 1px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(
      to right,
      transparent 0,
      rgb(255, 255, 255, 0.3) 1%,
      rgb(255, 255, 255, 0.5) 2%,
      rgb(255, 255, 255, 0.5) 95%,
      rgb(255, 255, 255, 0.3) 98%,
      rgb(255, 255, 255, 0.2) 99%,
      transparent 100%
    );
    box-shadow: inset 0 -1px 1px #0e60cb;
  }
  .header__img {
    width: 42px;
    height: 42px;
    margin-right: 5px;
    border-radius: 3px;
    border: 2px solid rgb(222, 222, 222, 0.8);
  }
  .header__text {
    font-size: 14px;
    font-weight: 700;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    span {
      display: flex;
      align-items: center;

      svg {
        margin: 0px;
      }

      .loading-spinner {
        height: 1rem;
        width: 1rem;
        fill: white;
      }
    }
  }
  footer {
    display: flex;
    align-self: flex-end;
    align-items: center;
    justify-content: flex-end;
    color: #fff;
    height: 36px;
    width: 100%;
    background: ${({ theme }) => theme.barGradient};
  }

  .crt-toggle {
    padding: 0.5rem 0rem;
    label {
      font-family: Tahoma, "Noto Sans", sans-serif;
    }
  }

  .footer__item {
    padding: 3px;
    display: flex;
    margin-right: 10px;
    align-items: center;
    &:hover {
      background-color: rgba(60, 80, 210, 0.5);
    }
    &:hover:active > * {
      transform: translate(1px, 1px);
    }
  }
  .footer__item__img {
    border-radius: 3px;
    margin-right: 2px;
    width: 22px;
    height: 22px;
  }
  .menu {
    display: flex;
    margin: 0 2px;
    position: relative;
    border-top: 1px solid #385de7;
    box-shadow: 0 1px #385de7;
  }
  .orange-hr {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    display: block;
    height: 2px;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      #da884a 50%,
      rgba(0, 0, 0, 0) 100%
    );
    border: 0;
  }
  .menu__right {
    background-color: ${({ theme }) => theme.startMenuBackground};
    border-left: ${({ theme }) => theme.startMenuBorderLeft};
    padding: 6px 5px 5px;
    width: 190px;
    color: #00136b;
  }
  .menu__left {
    background-color: #fff;
    padding: 6px 5px 0;
    width: 190px;
    display: flex;
    flex-direction: column;
  }
  .sub_menu {
    border: 1px solid black;
    position: absolute;
    left: 100%;
    bottom: 0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }

  .menu__separator {
    height: 7.5px;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0) 100%
    );
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    background-clip: content-box;
  }
  .menu__right .menu__separator {
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      #87b3e2b5 50%,
      rgba(0, 0, 0, 0) 100%
    );
    background-clip: content-box;
  }
  .menu__item {
    padding: 1px;
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  }
  .menu__left .menu__item {
    height: 34px;
  }
  .menu__right .menu__item {
    height: 26px;
    margin-bottom: 4px;
    line-height: 13px;
  }
  .menu__item:hover {
    color: white;
    background-color: #2f71cd;
  }
  .menu__item:hover .menu__item__subtext {
    color: white;
  }
  .menu__item__texts {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    position: relative;
  }
  .menu__right .menu__item__img {
    margin-right: 3px;
    width: 22px;
    height: 22px;
  }
  .menu__left .menu__item__img {
    margin-right: 3px;
    width: 30px;
    height: 30px;
  }
  .menu__right .menu__item:nth-child(-n + 5),
  .menu__left .menu__item:nth-child(-n + 2),
  .menu__left .menu__item:last-child {
    .menu__item__text {
      font-weight: 700;
    }
  }
  .menu__item__subtext {
    color: rgba(0, 0, 0, 0.4);
    line-height: 12px;
    margin-bottom: 1px;
  }
  .menu__left .menu__item:last-child {
    height: 24px;
  }
  .menu__item:hover .menu__arrow {
    border-left-color: #fff;
  }
  .menu__arrow {
    border: 3.5px solid transparent;
    border-right: 0;
    border-left-color: #00136b;
    position: absolute;
    left: 146px;
  }
`;
