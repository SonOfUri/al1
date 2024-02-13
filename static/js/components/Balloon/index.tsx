import React, { useState, useEffect, FC } from "react";
import styled, { keyframes } from "styled-components";
import risk from "@assets/windowsIcons/229(16x16).png";
import infoIcon from "@assets/windowsIcons/747(16x16).png";

type TBalloonProps = {
  startAfter?: number;
  duration?: number;
  header: string;
  line1: string;
  line2?: string;
  right?: number;
  info?: boolean;
  reverse?: boolean;
};

const Balloon: FC<TBalloonProps> = ({
  startAfter = 3000,
  duration = 15000,
  header,
  line1,
  line2,
  right,
  info,
  reverse,
}) => {
  const [show, setShow] = useState(true);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const openTimer = setTimeout(() => setStart(true), startAfter);
    const fadeTimer = setTimeout(() => setShow(false), startAfter + duration);
    const closeTimer = setTimeout(
      () => setStart(false),
      startAfter + duration + 1000
    );
    return () => {
      clearTimeout(openTimer);
      clearTimeout(fadeTimer);
      clearTimeout(closeTimer);
    };
  }, [startAfter, duration]);
  return start ? (
    <BalloonWrapperSC show={show} right={right} reverse={reverse}>
      <div className="balloon__container">
        <button onClick={() => setShow(false)} className="balloon__close" />
        <div className="balloon__header">
          <img
            className="balloon__header__img"
            src={info ? infoIcon : risk}
            alt="risk"
          />
          <span className="balloon__header__text">{header}</span>
        </div>
        <p className="balloon__text__first">
          {line1}
          <br />
          {line2}
        </p>
      </div>
    </BalloonWrapperSC>
  ) : null;
};

type TBalloonWrapperProps = {
  show: boolean;
  right?: number;
  reverse?: boolean;
};
const fadein = keyframes`
  0% { 
    display: block;
    opacity: 0;
  }
  100% {
    display: block;
    opacity: 1;
  }
`;
const fadeout = keyframes`
  0% { 
    display: block;
    opacity: 1;
  }
  99% {
    display: block;
    opacity: 0;
  }
  100% {
    display: none;
    opacity: 0;
  }
`;
const BalloonWrapperSC = styled.div<TBalloonWrapperProps>`
  position: absolute;
  display: block;
  opacity: 0;
  animation: ${({ show }) => (show ? fadein : fadeout)} 1s forwards;
  filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.4));
  z-index: 2147483648 + 1;
  color: black;
  .balloon__container {
    position: absolute;
    ${({ right }) => (right ? `right: ${right}px;` : "right: -4px;")}
    bottom: 19px;
    border: 1px solid black;
    border-radius: 7px;
    padding: 6px 10px 10px 10px;
    background-color: #ffffe1;
    font-size: 11px;
    white-space: pre;
    max-width: 250px;
    width: 250px;
    &:before {
      content: "";
      position: absolute;
      display: block;
      bottom: -19px;
      ${({ reverse }) => (reverse ? `left: 14px;` : `right: 14px;`)}
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 19px 19px 0;
      border-color: transparent black transparent transparent;
    }
    &:after {
      content: "";
      position: absolute;
      display: block;
      bottom: -17px;
      ${({ reverse }) => (reverse ? `left: 15px;` : `right: 15px;`)}
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 18px 18px 0;
      border-color: transparent #ffffe1 transparent transparent;
    }
  }
  .balloon__close:hover {
    background-color: #ffa90c;
    border-color: white;
    box-shadow: 1px 1px rgba(0, 0, 0, 0.1);

    &:before,
    &:after {
      background-color: white;
    }
  }
  .balloon__close {
    outline: none;
    position: absolute;
    right: 4px;
    top: 4px;
    width: 14px !important;
    height: 14px !important;
    min-width: 10px !important;
    min-height: 10px !important;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    background-color: transparent;
    &:before {
      content: "";
      position: absolute;
      left: 50%;
      top: 1px;
      transform: rotate(45deg);
      height: 10px;
      width: 2px;
      background-color: rgba(170, 170, 170);
    }
    &:after {
      content: "";
      position: absolute;
      left: 50%;
      top: 1px;
      transform: rotate(-45deg);
      height: 10px;
      width: 2px;
      background-color: rgba(170, 170, 170);
    }
  }
  .balloon__header {
    display: flex;
    align-items: center;
    font-weight: 700;
  }
  .balloon__header__img {
    width: 14px !important;
    height: 14px !important;
    margin-right: 8px;
  }
  .balloon__text__first {
    margin: 5px 0 10px;
    text-wrap: wrap !important;
    max-width: 230px;
  }
`;
export default Balloon;
