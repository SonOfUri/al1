import styled from "styled-components";

export const ConnectButtonSC = styled.div`
  .connect-wallet-btn {
    font-family: "Pixelated MS Sans Serif", Arial;
    -webkit-font-smoothing: antialiased;
    font-size: 11px;
    box-sizing: border-box;
    border: 1px solid #003c74;
    background: linear-gradient(180deg, #fff, #ecebe5 86%, #d8d0c4);
    box-shadow: none;
    border-radius: 3px;
    color: black;
    margin: 0px;
    width: 100%;
    max-height: 23px;
    justify-content: center !important;
    align-items: center !important;

    &.tw-connected-wallet {
      background: none;
      border: none;
      text-align: left;
      color: yellow;
      padding: 0px;
      border: none;
      display: block;
      margin-top: 0.5rem;
      &:hover {
        text-decoration: underline;
        border: none;
        box-shadow: none;
      }
      &:focus {
        outline: none;
      }

      &:after {
        content: "Change/View Wallet";
        text-align: left;
      }
      span {
        display: none;
      }
      img {
        display: none;
      }
    }
  }
`;
