import styled from "styled-components";

import messengerBg from "@assets/webp//messenger_ui/messenger_background.webp";

export const IEWrapperSC = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background: ${({ theme }) => theme.defaultWindowBodyBackground};

  .messenger-ui__bottom {
    bottom: 0px;
    width: 100%;
    position: absolute;
    height: 0.5rem;
  }

  .messenger-ui__top {
    top: -0.25rem;
    width: 100%;
    position: absolute;
    height: 0.5rem;
  }

  .messenger-ui__right {
    right: 0px;
    height: 100%;
    position: absolute;
    width: 0.5rem;
  }

  .messenger-ui__left {
    left: 0px;
    height: 100%;
    position: absolute;
    width: 0.3rem;
  }

  .messenger-ui__bottom-left {
    left: 0px;
    position: absolute;
    bottom: -1px;
  }

  .messenger-ui__bottom-right {
    right: 0px;
    position: absolute;
    bottom: -1px;
  }

  .messenger-ui__top-left {
    left: 0px;
    position: absolute;
    top -1px;
    transform: rotate(90deg);
  }

  .messenger-ui__top-right {
    right: 0px;
    position: absolute;
    top: -1px;
    transform: rotate(180deg);
  }

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
    overflow: hidden;

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

export const WrapperSC = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid lightgray;
  background: linear-gradient(
    180deg,
    rgb(176, 190, 220) 0%,
    rgba(248, 249, 253, 1) 2%,
    rgba(207, 219, 240, 1) 35%,
    rgba(255, 255, 255, 1) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 50px #d3d3d3;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .header {
    width: 100%;
    padding: 0rem 0.75rem;

    img {
      height: 2rem;
    }
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    position: relative;

    button {
      height: 30px;
      width: 100%;
      background: linear-gradient(180deg, #fff, #f4f7fe, #e2e4f7);
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 2px;
      border: 1px solid rgba(0, 0, 0, 0.7);
      box-shadow: 0 0 5px #00000080;
      cursor: pointer;
      margin: auto;
      padding: 0px;
      justify-content: space-between;

      div {
        width: 100%;
        height: 3px;
        background-color: #d4b67f;
      }
    }

    img {
      border-radius: 0.5rem;
      border: 1.5px solid black;
      width: 150px;
      max-height: 150px;
      margin: auto;
    }
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    label {
      color: #1c294b;
      font-weight: 500;
      font-family: Tahoma, "Noto Sans", sans-serif !important;
    }
  }

  .footer {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;

    a {
      color: #1c294b;
      font-weight: 600;
      line-height: 150%;
    }

    .repository {
      padding: 0rem 0.5rem;
    }

    .utils {
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: flex-end;
      padding: 0rem 1rem;

      img {
        opacity: 0.4;
        height: 150px;
      }
    }
  }
`;

export const MessengerLoginSC = styled(WrapperSC)`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

// <div className="chat__user-info">
// <div className="input">
//   <input

export const MessengerInterfaceSC = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgb(176, 190, 220) 0%,
    rgba(248, 249, 253, 1) 2%,
    rgba(207, 219, 240, 1) 35%,
    rgba(255, 255, 255, 1) 100%
  );
  background-image: url(${messengerBg});
  background-position: bottom right;
  background-repeat: no-repeat;

  .input {
    backgrond: white;
    border: 1px solid #003c74;
    border-radius: 0.5rem;
    width: 100%;
    overflow: hidden;
    align-items: center;
    background: white;

    input {
      height: 100%;
      max-height: 45px;
      width: 100%;
      border: none;
    }

    button {
      height: 40px;
      margin: 0.5rem;
      background: linear-gradient(
        180deg,
        rgb(176, 190, 220) 0%,
        rgba(248, 249, 253, 1) 2%,
        rgba(207, 219, 240, 1) 35%,
        rgba(255, 255, 255, 1) 100%
      );
    }
  }

  .chat__header {
    border-bottom: 1px solid lightgray;
    padding-bottom: 0.5rem;
    box-shadow: rgb(176, 190, 220) 0px 5px 10px;
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    padding: 0.5rem;
    background: linear-gradient(
      rgb(149 170 213) 0%,
      rgb(248, 249, 253) 2%,
      rgb(176 189 215) 50%,
      rgb(255, 255, 255) 100%
    );
  }

  .chat__header-brand {
    display: flex;
    justify-content: space-between;

    img {
      height: 1.5rem;
      &.logo {
        height: 2rem;
        top: -4px;
        position: relative;
        margin-right: 0.5rem;
      }
    }
  }

  .chat__header-nav {
    display: flex;
    gap: 0.5rem;

    button {
      background: none;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      align-items: center;
      text-align: center;
      padding: 0.25rem;
      border: none;
      transition: opacity 0.3s ease;
      cursor: pointer;
      font-family: tahoma, "noto sans", sans-serif !important;

      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        outline: none;
        opacity: 0.6;
      }

      img {
        height: 30px;
      }
    }
  }

  .chat__messages {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    max-height: 400px;

    height: 100%;
    gap: 0.5rem;

    .chat__recipient-info {
      display: flex;
      justify-content: space-between;
      height: 100%;
      gap: 0.5rem;
    }

    .user__input-header {
      padding: 0.25rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgb(0, 60, 116);
      background: linear-gradient(
        rgb(176, 190, 220) 0%,
        rgb(248, 249, 253) 2%,
        rgb(207, 219, 240) 35%,
        rgb(255, 255, 255) 100%
      );

      img {
        height: 1.5rem;
      }
    }

    .chat__user-info {
      display: flex;
      justify-content: space-between;
      height: 100%;
      gap: 1rem;
      height: 90px;
    }

    .chat__user-input {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem;
      height: 55px;
    }
  }

  .chat__user-avatar {
    width: 100%;
    max-width: 75px;
    height: 75px;
    border-radius: 0.5rem;
    border: 1px solid rgb(0, 60, 116);
    padding: 0.3rem;
    box-shadow: rgb(176, 190, 220) 0px 5px 10px;

    img {
      width: 100%;
      background: white;
      border: 1px solid rgb(0, 60, 116);
      border-radius: 0.35rem;
    }
  }

  .chat__info {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    overflow: hidden;
    border: 1px solid rgb(0, 60, 116);

    height: 100%;
  }

  .chat__recipient-header {
    background: linear-gradient(
      180deg,
      rgb(176, 190, 220) 0%,
      rgba(248, 249, 253, 1) 2%,
      rgba(207, 219, 240, 1) 35%,
      rgba(255, 255, 255, 1) 100%
    );

    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    box-shadow: rgb(176, 190, 220) 0px 5px 10px;
    border-bottom: 1px solid rgb(0, 60, 116);
    display: flex;
    gap: 0.5rem;
    align-items: center;
    padding: 0.5rem;
  }

  .chat__message-stream {
    height: 340px;
    background: white;
    padding-bottom: 0.75rem;

    h5 {
      font-size: 0.75rem;
    }

    p {
      font-size: 0.95rem;
    }

    @media only screen and (max-width: 800px) {
      h5 {
        font-size: 0.65rem;
      }

      p {
        font-size: 0.85rem;
      }
    }
  }
`;

export const MessengerContactsSC = styled(WrapperSC)`
  footer {
    padding: 0.5rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    height: 70px;
    border: 1px solid rgb(0, 60, 116);
    margin: 0.5rem;
    background: white;

    img:first-child {
      position: absolute;
      left: 0;
      height: 70px;
      opacity: 0.4;
      padding: 0.5rem;
    }
    img:nth-child(2) {
      padding-left: 3rem;
      height: 2.5rem;
      z-index: 2;
    }
    p {
      align-self: flex-end;
    }
    span {
      height: 2px;
      width: 95%;
      background: linear-gradient(
        to right,
        red,
        orange,
        yellow,
        green,
        blue,
        indigo,
        violet
      );
      position: absolute;
      bottom: 0.25rem;
    }
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-bottom: 1px solid lightgray;
    padding-bottom: 0.5rem;
    box-shadow: rgb(176, 190, 220) 0px 5px 10px;
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }

  .header__brand {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .header__user-info {
    display: flex;
    gap: 0.5rem;
    img {
      width: 50px;
      height: 50px;
      border-radius: 0.5rem;
    }
  }

  .header__account {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h4 {
      font-size: 1.25rem;
    }

    p {
      font-weight: 600;
      color: var(--green);
    }
  }

  .contacts__wrapper {
    display: flex;
    height: 100%;
    width: 100%;
    .contacts__tab-bar {
      width: 50px;
      box-shadow: rgb(176, 190, 220) 0px 5px 10px;
    }

    .contacts__list-wrapper {
      width: 100%;
      height: 100%;
      margin-right: 0.5rem;
    }

    .contacts__list-warning {
      background-color: rgb(255, 255, 225);
      padding: 0.75rem 0.5rem;
      border: 1px solid rgb(0, 60, 116);

      display: flex;
      gap: 0.25rem;

      img {
        width: 0.75rem;
        height: 0.75rem;
      }
    }

    .contacts__list-header {
      h5 {
        font-size: 0.8rem;
      }
    }

    .contacts__list {
      background: white;
      width: 100%;
      height: 380px;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem;
      margin-right: 0.5rem;
      overflow-y: auto;

      button {
        border: none;
        background: none;
        min-width: 0px;
        min-height: 0px;
        padding: 0px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:hover {
          box-shadow: none;
        }
      }
    }
  }

  .contacts__tab-bar {
    display: flex;
    flex-direction: column;

    button {
      background: none;
      width: 100%;
      height: 50px;
      padding: 0px !important;
      min-width: 40px;
      border-bottom-left-radius: 2rem;
      border: none;

      cursor: pointer;

      img {
        width: 100%;
        padding: 0.35rem;
        transition: opacity 0.3s ease;
      }

      &:hover {
        box-shadow: none;

        img {
          opacity: 0.5;
        }
      }

      &.active {
        border-bottom-left-radius: 2rem;
        box-shadow: rgb(176, 190, 220) 0px 5px 10px;
        background: white;
        border-top-right-radius: 0rem;
      }
    }
  }

  .conversation__new {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: 100%;
  }

  .conversation-scroller {
    width: 100%;
    overflow-x: hidden;
  }
`;
