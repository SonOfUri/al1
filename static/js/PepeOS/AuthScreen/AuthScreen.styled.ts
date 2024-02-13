import styled from "styled-components";

export const AuthScreenSC = styled.div`
  .login-screen {
    width: 100vw;
    height: 100dvh;
    background-color: ${({ theme }) => theme.loginScreen.centerBg};
    color: #fff;
    display: flex;
    flex-direction: column;
    &__top,
    &__bottom {
      background-color: ${({ theme }) => theme.loginScreen.topBg};
      flex-basis: 12.5%;
      border-style: solid;
      border-image-slice: 1;
    }
    &__top {
      border-image-source: ${({ theme }) => theme.loginScreen.topBorderImage};
      border-width: 0 0 4px 0;
    }
    &__bottom {
      padding: 40px 80px 40px 40px;
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      border-image-source: ${({ theme }) =>
        theme.loginScreen.bottomBorderImage};
      border-width: 4px 0 0 0;

      @media (max-width: 768px) {
        padding: 12px 24px 12px 12px;
      }
    }
    &__center {
      flex: 1;
      display: flex;
      background-image: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.6) -21%,
        rgba(255, 255, 255, 0) 60%,
        rgba(255, 255, 255, 0) 100%
      );
      background-size: 700px 700px;
      background-position: -240px -210px;
      background-repeat: no-repeat;
      z-index: 0;

      @media (max-width: 768px) {
        flex-direction: column;
      }
    }
    &__instructions,
    &__accounts {
      flex-basis: 50%;
    }
    &__instructions {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-right: 30px;
      align-items: flex-end;
      border-right-width: 1px;
      border-image-source: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0) 5%,
        rgba(255, 255, 255, 0.5) 15%,
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0.5) 85%,
        rgba(255, 255, 255, 0) 95%,
        rgba(255, 255, 255, 0) 100%
      );
      border-image-slice: 0 1 0 0;
      border-right-style: solid;

      @media (max-width: 768px) {
        align-items: center;
        text-align: center;
        padding: 0px;
      }

      img,
      span {
        display: block;
      }
      img {
        width: 200px;
        margin-bottom: 40px;

        @media (max-width: 768px) {
          width: 150px;
          margin-bottom: 1rem;
        }
      }
      span {
        text-align: right;
        font-size: 24px;
      }
    }
    &__accounts {
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      @media (max-width: 768px) {
        padding: 0px 24px;
      }
    }
    &__account {
      outline: none;
      cursor: pointer;
      display: flex;
      min-width: 400px;
      max-width: 100%;
      opacity: 0.6;
      padding: 12px;
      border-radius: 8px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border: 1px solid transparent;
      border-right: 0;
      position: relative;
      background-clip: padding-box;
      border: 1px solid transparent;
      justify-content: space-between;

      @media (max-width: 768px) {
        min-width: 200px;
        max-width: 100%;
      }

      &-icon {
        width: 80px;
        height: 80px;
        margin-right: 20px;
        border: 3px solid #fff;
        border-radius: 5px;
        box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.3);
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;

        @media (max-width: 768px) {
          width: 60px;
          height: 60px;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      &-details {
        position: relative;
      }
      &-content {
        display: flex;
      }

      &-name {
        font-size: 24px;
        margin-bottom: 0.5rem;
        display: block;

        @media (max-width: 768px) {
          font-size: 1rem;
          margin-bottom: 0.25rem !important;
        }
      }
      &-description {
        font-weight: 600;
        @media (max-width: 768px) {
          font-size: 0.65rem;
        }
      }
      &-change {
        color: yellow;
        font-size: 0.65rem;
        position: absolute;
        bottom: 0px;
        :hover {
          text-decoration: underline;
        }
      }

      &:hover,
      &.active,
      &.logging-in {
        opacity: 1;
        .login-screen__account-icon {
          border-color: #ffcc36;
        }
        .login-screen__account-name {
          margin-bottom: 0.5rem;
        }
      }
      &.active {
        cursor: pointer;
        background: ${({ theme }) => theme.loginScreen.accountActive};
        background-clip: padding-box;

        @media (max-width: 768px) {
          width: 100%;
        }

        &::after {
          content: "";
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.6) 40%,
            rgba(255, 255, 255, 0) 100%
          );
          border-radius: 8px;
          position: absolute;
          top: -1px;
          right: -1px;
          bottom: -1px;
          left: -1px;
          z-index: -1;
          pointer-events: none;
        }
        .login-screen__password {
          display: block;
        }
      }
    }
    &__password {
      display: none;
      position: absolute;
      bottom: -20px;

      > span {
        display: block;
        font-size: 14px;
        margin-bottom: 6px;
      }
      input {
        padding: 5px;
        border: 0;
        border-radius: 5px;
        width: 160px;
        height: 36px;
        font-size: 30px;
        box-shadow: #00489a 2px 2px 0px 0px;
        outline: none;
      }
      button {
        cursor: pointer;
        margin-left: 8px;
        border: 1px solid #fff;
        border-radius: 5px;
        width: 32px;
        height: 32px;
        background-image: linear-gradient(
          150deg,
          rgba(255, 255, 255, 0.7) 0%,
          rgba(70, 161, 252, 0) 50%
        );
        background-repeat: no-repeat;
        box-shadow: 2px 2px 0px 0px #00489a,
          inset -1px -2px 4px 0 rgba(0, 0, 0, 0.7);
        position: relative;

        &.login-screen__submit {
          background-color: #3eb34d;

          &::before,
          &::after {
            content: "";
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 12px 0 12px 12px;
            border-color: transparent transparent transparent #ffffff;
            position: absolute;
            top: 50%;
            right: 4px;
            transform: translateY(-50%);
          }
          &::after {
            border-width: 7px 0 7px 7px;
            border-color: #3eb34d;
            border-color: transparent transparent transparent #3eb34d;
            right: 9px;
          }
          span {
            background-color: #fff;
            position: absolute;
            height: 4px;
            width: 17px;
            top: 50%;
            transform: translateY(-50%);
            right: 9px;
            z-index: 1;
          }
        }
        &.login-screen__question {
          background-color: #0573f3;
          font-size: 30px;
          font-weight: 900;
          color: #fff;

          span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            line-height: 0;
          }
        }
      }
      > form {
        display: flex;
      }
    }

    &__turn-off {
      display: flex;
      align-items: center;
      flex-grow: 0;
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
      span {
        margin-left: 10px;
        font-size: 1.5rem;
        @media (max-width: 768px) {
          font-size: 0.65rem;
          font-weight: 600;
        }
      }
      &-icon {
        position: relative;
        background-color: #da5020;
        border: 1px solid #fff;
        border-radius: 5px;
        width: 32px;
        height: 32px;
        min-width: 32px;
        min-height: 32px;

        background-image: linear-gradient(
          150deg,
          rgba(255, 255, 255, 0.7) 0%,
          rgba(70, 161, 252, 0) 50%
        );
        &::before,
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        &::before {
          border: 1.5px solid #fff;
          border-radius: 50px;
          width: 14px;
          height: 14px;
        }
        &::after {
          background-color: #fff;
          width: 3px;
          height: 8px;
        }
      }
    }
    &__login-info {
      span {
        @media (max-width: 768px) {
          font-size: 0.6rem;
          line-height: 115%;
        }
      }
    }
  }

  .welcome-text {
    font-style: italic;
    font-size: 76px;
    font-weight: 900;
    text-shadow: 3px 4px #00489a;
  }
  .logging-in {
    .loading-settings {
      color: #00489a;
      font-size: 14px;
      font-weight: bold;
    }
  }
`;

export const WalletConnectionSC = styled.div`
  display: flex;
  align-items: center;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 0px;
    min-width: 0px;
    cursor: pointer;
    margin-left: 8px;
    border: 1px solid #fff;
    border-radius: 5px;
    width: 35px;
    height: 23px;
    background-image: linear-gradient(
      150deg,
      rgba(255, 255, 255, 0.7) 0%,
      rgba(70, 161, 252, 0) 50%
    );
    background-repeat: no-repeat;
    box-shadow: 2px 2px 0px 0px #00489a,
      inset -1px -2px 4px 0 rgba(0, 0, 0, 0.7);
    position: relative;
  }

  @media (max-width: 768px) {
    button {
      height: 20px;
    }

    select {
      height: 18px !important;

      &:active {
        background-size: contain;
      }
    }
  }
`;

export const SubmitBtnSC = styled.button`
  background-color: #3eb34d !important;
  position: relative !important;
  min-width: 0px;
  min-height: 0px;
  align-self: center;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  text-align: center;
  min-height: 0px;
  min-width: 0px;
  cursor: pointer;
  margin-left: 8px;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 5px;
  width: 35px;
  height: 23px;
  background-image: linear-gradient(
    150deg,
    rgba(255, 255, 255, 0.7) 0%,
    rgba(70, 161, 252, 0) 50%
  );
  background-repeat: no-repeat;
  box-shadow: rgb(0, 72, 154) 2px 2px 0px 0px,
    rgba(0, 0, 0, 0.7) -1px -2px 4px 0px inset;
  position: relative;

  &:active {
    background: rgba(62, 179, 77, 0.5) !important;
  }

  &::before,
  &::after {
    content: "" !important;
    width: 0 !important;
    height: 0 !important;
    border-style: solid !important;
    border-width: 8px 0 8px 8px !important;
    border-color: transparent transparent transparent #ffffff !important;
    position: absolute !important;
    top: 50% !important;
    right: 6px !important;
    transform: translateY(-50%) !important;
  }
  &::after {
    border-width: 7px 0 7px 7px !important;
    border-color: #3eb34d !important;
    border-color: transparent transparent transparent #3eb34d !important;
    right: 9px !important;
  }
  span {
    background-color: #fff !important;
    position: absolute !important;
    height: 3px !important;
    width: 17px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    right: 9px !important;
    z-index: 1 !important;
  }
`;

export const LogInBtnSC = styled(SubmitBtnSC)`
  height: 35px !important;
  &:disabled {
    background-color: rgba(0, 0, 0, 0.4) !important;
    cursor: not-allowed !important;
  }
`;
