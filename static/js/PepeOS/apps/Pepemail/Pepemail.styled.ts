import styled from "styled-components";
import insetBorderSvg from "@assets/svg/inset-border.svg";

export const PepemailSC = styled.div`
  .header {
    box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff,
      inset -2px -2px grey, inset 2px 2px #dfdfdf;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem;
  }

  .inset-border {
    border-image: url(${insetBorderSvg}) 2;
  }

  .footer {
    height: 20px;
    box-shadow: rgba(50, 50, 50, 0.8) 0px 1px 3px inset;
    background-color: rgb(236, 233, 216);
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding-top: 2px;
  }
`;

export const MailFoldersSC = styled.div`
  height: 100%;
  .mail-folders-body {
    height: calc(100% - 22px);

    .tree-view {
      height: 100%;
      border-image: url(${insetBorderSvg}) 2;

      li {
        width: fit-content;
        padding: 0.1rem 0.25rem;
        cursor: pointer;
      }

      .selected {
        background: rgb(237, 232, 205);
        outline: 1px dotted #000;
      }
    }
  }
`;

export const PepemailItemSC = styled.div`
  width: 100%;
  height: calc(100% - 22px);
  flex: 1;
  .header {
    background: ${({ theme }) => theme.defaultWindowBodyBackground};
  }
  .mail-item-body {
    background-color: #fff;
    padding: 0.25rem;
    height: calc(100% - 36px);

    h1 {
      font-size: 1.5rem;
      font-family: "Times New Roman", Times, serif;
      font-weight: 600;
    }

    h3 {
      font-size: 1rem;
      font-family: "Times New Roman", Times, serif;
      font-weight: 500;
    }

    p {
      white-space: pre-line;
      max-width: 600px;
    }

    hr {
      margin: 1rem 0;
    }
  }
`;

export const PepemailListSC = styled.div`
  width: 100%;
  height: 140px;
  .header {
    display: grid;
    -webkit-box-align: center;
    align-items: center;
    grid-template-columns: 5fr 5fr 3fr;
    gap: 0rem;
    justify-content: space-between;
    width: 100%;
    span {
      border-right: 1px solid rgba(208, 206, 191, 0.75);
      border-left: 1px solid hsla(0, 0%, 100%, 0.75);
      padding-left: 0.25rem;
      padding-right: 0.25rem;
    }
  }
  .mail-list-body {
    background-color: #fff;
    overflow-y: scroll;
    padding: 0.25rem;
    height: calc(100% - 22px);
  }

  .list-item {
    display: grid;
    grid-template-columns: 5fr 5fr 3fr;

    span {
      padding-left: 0.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &.selected {
      padding: 0px 3px 2px;
      background-color: rgb(11, 97, 255);
      outline: 1px dotted #000;
      color: white;
      text-shadow: black 0px 1px 1px;
    }
  }
`;
