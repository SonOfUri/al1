import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Balloon from "@components/Balloon";
import startButton from "@assets/pepeOS-icons/start-button.png";
import pepecoinLogo from "@assets/png/pepecoin-logo.png";
import StartBarMenu from "./StartBarMenu";
import { useBalance } from "@thirdweb-dev/react";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { setPepecoinBalance } from "@store/userAccount/userAccount";
import { ReactComponent as SvgSpinner } from "@assets/svg/spinner.svg";

type TAppType = {
  id: number;
  header: {
    noFooterWindow?: boolean;
    icon: string;
    title: string;
  };
};

type TStartBarProps = {
  onMouseDownApp: (id: number) => void;
  apps: TAppType[];
  focusedAppId: number;
  onMouseDown: () => void;
  onClickMenuItem: (name: string) => void;
};

type TFooterWindowProps = {
  id: number;
  icon: string;
  title: string;
  onMouseDown: (id: number) => void;
  isFocus: boolean;
};

const getTime = () => {
  const date = new Date();
  let hour = date.getHours();
  let hourPostFix = "AM";
  let min = date.getMinutes();
  if (hour >= 12) {
    hour -= 12;
    hourPostFix = "PM";
  }
  if (hour === 0) {
    hour = 12;
  }
  if (min < 10) {
    min = 0 + min;
  }
  return `${hour}:${min} ${hourPostFix}`;
};

const StartBar: React.FC<TStartBarProps> = ({
  onMouseDownApp,
  apps,
  focusedAppId,
  onMouseDown,
  onClickMenuItem,
}) => {
  const [time, setTime] = useState(getTime);
  const [menuOn, setMenuOn] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleBuyClick = () => {
    window.open(
      "https://app.uniswap.org/tokens/ethereum/0xa9e8acf069c58aec8825542845fd754e41a9489a",
      "_blank"
    );
  };

  function toggleMenu(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    setMenuOn((on) => !on);
  }

  const dispatch = useAppDispatch();
  const { data: balanceData, isLoading } = useBalance(
    "0xa9e8acf069c58aec8825542845fd754e41a9489a"
  );

  const formatBalance = (balance: number) => {
    if (balance >= 1e6) {
      return (balance / 1e6).toFixed(2) + "m";
    } else if (balance >= 1e3) {
      return (balance / 1e3).toFixed(2) + "k";
    } else {
      return balance.toString();
    }
  };

  const pepecoinBalance = formatBalance(Number(balanceData?.displayValue));

  useEffect(() => {
    if (balanceData) {
      dispatch(setPepecoinBalance(pepecoinBalance));
    }
  }, [balanceData, dispatch, pepecoinBalance]);
  function _onMouseDown(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest(".footer__window")) return;
    onMouseDown();
  }
  function _onClickMenuItem(name: string) {
    onClickMenuItem(name);
    setMenuOn(false);
  }
  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = getTime();
      newTime !== time && setTime(newTime);
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  useEffect(() => {
    const target = menu.current;
    if (!target) return;
    function onMouseDown(e: MouseEvent) {
      if (target && !target.contains(e.target as Node) && menuOn)
        setMenuOn(false);
    }
    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [menuOn]);

  return (
    <Container onMouseDown={_onMouseDown}>
      <div className="footer__items left">
        <div ref={menu} className="footer__start__menu">
          {menuOn && <StartBarMenu onClick={_onClickMenuItem} />}
        </div>
        <img
          src={startButton}
          alt="start"
          className="footer__start"
          onPointerDown={toggleMenu}
        />
        {[...apps].map(
          (app) =>
            !app.header.noFooterWindow && (
              <FooterWindow
                key={app.id}
                id={app.id}
                icon={app.header.icon}
                title={app.header.title}
                onMouseDown={onMouseDownApp}
                isFocus={focusedAppId === app.id}
              />
            )
        )}
      </div>

      <div className="footer__items right">
        <img className="footer__icon" src={pepecoinLogo} alt="" />
        <p
          className="footer__balance"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovered ? (
            <button onClick={handleBuyClick}>Buy</button>
          ) : isLoading ? (
            <SvgSpinner />
          ) : (
            `${parseFloat(pepecoinBalance).toFixed(
              parseFloat(pepecoinBalance) % 1 === 0 ? 0 : 4
            )} Pepecoins`
          )}
        </p>
        <div style={{ position: "relative", width: 0, height: 0 }}>
          <Balloon
            header={"Dank memes detected"}
            line1={"Welcome home fren."}
            line2={"Double click the apps to use them"}
          />
        </div>
      </div>
    </Container>
  );
};

const FooterWindow: React.FC<TFooterWindowProps> = ({
  id,
  icon,
  title,
  onMouseDown,
  isFocus,
}) => {
  function _onMouseDown() {
    onMouseDown(id);
  }
  return (
    <div
      onMouseDown={_onMouseDown}
      className={`footer__window ${isFocus ? "focus" : "cover"}`}
    >
      <img className="footer__icon" src={icon} alt={title} />
      <div className="footer__text">{title}</div>
    </div>
  );
};

const Container = styled.footer`
  height: 30px;
  background: ${({ theme }) => theme.barGradient};
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  z-index: 999;
  width: 100%;
  justify-content: space-between;

  .footer__items.left {
    height: 100%;
    flex: 1;
    overflow: hidden;
  }

  &:before {
    ${({ theme }) => theme.barTopper || ""}
  }
  .footer__items.right {
    flex-shrink: 0;
    background: ${({ theme }) => theme.barTrayGradient};
    border-left: ${({ theme }) => theme.barTrayBorderLeft};
    box-shadow: ${({ theme }) => theme.barTrayBoxShadow};
    padding: 0 10px;
    gap: 0.25rem;
  }

  .footer__balance {
    color: white;
    display: flex;
    align-items: center;

    svg {
      width: 1rem;
      height: 1rem;
      fill: white;
      margin: 0px;
    }
  }

  .footer__items {
    display: flex;
    align-items: center;
  }
  .footer__start {
    height: 100%;
    margin-right: 10px;
    position: relative;
    &:hover {
      filter: brightness(105%);
    }
    &:active {
      pointer-events: none;
      filter: brightness(85%);
    }
  }
  .footer__start__menu {
    position: absolute;
    left: 0;
    box-shadow: 2px 4px 2px rgba(0, 0, 0, 0.5);
    bottom: 100%;
    z-index: 999;
  }
  .footer__window {
    flex: 1;
    max-width: 150px;
    color: #fff;
    border-radius: 2px;
    margin-top: 2px;
    padding: 0 8px;
    height: 22px;
    font-size: 11px;
    background-color: ${({ theme }) => theme.appTabInactive};
    box-shadow: inset -1px 0px rgba(0, 0, 0, 0.3),
      inset 1px 1px 1px rgba(255, 255, 255, 0.2);
    position: relative;
    display: flex;
    align-items: center;
  }
  .footer__icon {
    height: 15px;
    width: 15px;
  }
  .footer__text {
    position: absolute;
    left: 27px;
    right: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .footer__window.cover:hover {
    background-color: ${({ theme }) => theme.appTabInactiveHover};
    box-shadow: inset -1px 0px rgba(0, 0, 0, 0.3),
      inset 1px 1px 1px rgba(255, 255, 255, 0.2);
  }
  .footer__window.cover:before {
    display: block;
    content: "";
    position: absolute;
    left: -2px;
    top: -2px;
    width: 10px;
    height: 1px;
    border-bottom-right-radius: 50%;
    box-shadow: 2px 2px 3px rgba(255, 255, 255, 0.5);
  }
  .footer__window.cover:hover:active {
    background-color: ${({ theme }) => theme.appTabActiveClicked};
    box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, 0.3),
      inset 1px 0 1px rgba(0, 0, 0, 0.7);
  }
  .footer__window.focus:hover {
    background-color: ${({ theme }) => theme.appTabActiveHover};
  }
  .footer__window.focus:hover:active {
    background-color: ${({ theme }) => theme.appTabActiveHoverClicked};
  }
  .footer__window.focus {
    background-color: ${({ theme }) => theme.appTabActive};
    box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, 0.2),
      inset 1px 0 1px rgba(0, 0, 0, 0.7);
  }
  .footer__time {
    margin: 0 5px;
    color: #fff;
    font-size: 11px;
    font-weight: lighter;
    text-shadow: none;
  }
`;

export default StartBar;
