import styled from "styled-components";

export const AskPepeSC = styled.div`
  background: var(--ask-pepe-bg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: "Richmond W01 Light" !important;

  .ask-pepe__header {
    background: var(--ask-pepe-secondary);
    padding: 0.15rem;
    color: white;

    button {
      border: none;
      background: none;
      color: white;
      font-weight: 600;
      font-family: "Richmond W01 Light";
      cursor: pointer;

      :hover {
        outline: none;
        border: none;
        box-shadow: none;
        opacity: 0.5;
      }
    }
  }

  .ask-pepe__body {
    max-width: 980px;
    display: grid;
    grid-template-columns: 200px auto;
    gap: 180px;
    position: relative;
    height: 100%;
    width: 100%;

    @media (max-width: 800px) {
      gap: 0rem;
    }

    .ask-pepe__suggestions-wrapper {
      background: var(--ask-pepe-bg-darker);
      padding: 1rem;
      height: 100%;
    }

    .ask-pepe__suggestions {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      background: var(--ask-pepe-bg);
      border: 5px solid var(--ask-pepe-bg-darkest);
      padding-bottom: 0.5rem;

      @media (max-width: 800px) {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        align-items: center;

        h4 {
          font-size: 0.8rem !important;
        }

        button {
          font-size: 0.7rem !important;
          border: none !important;

          &:hover {
            border: none !important;
          }
        }
      }

      h4 {
        font-size: 1rem;
        color: var(--ask-pepe-primary);
        text-align: center;
        margin-top: 0.5rem;
      }

      button {
        background: none;
        border: none;
        text-align: left;
        font-size: 0.9rem;
        font-weight: 600;
        font-family: "Richmond W01 Light";
        border-top: 1.5px solid var(--ask-pepe-bg-darker);
        padding-top: 0.5rem;
        cursor: pointer;

        &:active,
        &:focus,
        &:focus-within,
        &:focus-visible,
        &:hover {
          background: none !important;
          outline: none !important;
          box-shadow: none;
          border-top: 1.5px solid var(--ask-pepe-bg-darker);
        }

        &:hover {
          opacity: 0.4;
        }

        &::before {
          content: "• ";
          display: inline-block;
          margin-right: 5px;

          @media (max-width: 800px) {
            display: none;
          }
        }
      }
    }

    .ask-element {
      position: relative;
      border-right: 6px solid var(--ask-pepe-bg-darkest);
    }

    .ask-pepe__content__header {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding-right: 4rem;

      @media (max-width: 800px) {
        display: grid;
        grid-template-columns: 100px auto;
        gap: 1rem;
        padding-right: 0px;
      }
    }

    .ask-pepe__img {
      z-index: 1;
      &.desktop {
        position: absolute;
        width: 400px;
        left: 130px;
        top: 1rem;
        @media (max-width: 800px) {
          display: none;
        }
      }

      &.mobile {
        @media (min-width: 800px) {
          display: none;
        }
      }
    }

    @media (max-width: 800px) {
      grid-template-columns: 1fr;

      img {
        max-width: 100px;
      }

      h1 {
        font-size: 1.25rem !important;
      }
    }

    img {
      width: 100%;
    }

    h1 {
      font-size: 2rem;
      color: var(--ask-pepe-primary);
      font-family: "Richmond W01 Light";
      letter-spacing: 0.1rem;
    }

    span {
      &.small {
        font-size: 0.8rem;
        letter-spacing: 0rem;
      }

      &.large {
        font-size: 2.75rem;
        letter-spacing: 0.25rem;

        @media (max-width: 800px) {
          font-size: 1.5rem;
        }
      }
    }
  }

  .ask-pepe__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 2rem 0rem;
    z-index: 2;

    @media (max-width: 800px) {
      margin: 2rem 1rem;
    }
  }

  .field-row-stacked {
    width: 100%;
    gap: 0.5rem;
  }

  label {
    font-size: 1rem;
    font-family: "Richmond W01 Light" !important;
  }

  textarea {
    border: 1px solid black;
    overflowy: scroll;
    width: 100%;
    font-size: 0.9rem;
    line-height: 135%;
    max-height: 150px;
    padding: 0.5rem;
    font-family: "Richmond W01 Light" !important;
  }

  input {
    border: 1px solid black;
    font-size: 0.9rem;
    height: 30px;
  }

  .ask-pepe__input-group {
    width: 100%;
    display: grid;
    grid-template-columns: auto 100px;
    gap: 0.5rem;
    align-items: center;
  }

  .ask-pepe__footer {
    background: var(--ask-pepe-secondary);
    padding: 0.5rem;
    display: flex;
    gap: 1rem;
    justify-content: space-between;

    p {
      color: white;
      margin: 0px;
    }
  }

  .ask-pepe__button {
    background: none;
    border: none;
    transition: all 0.2s ease-in-out;

    &:hover {
      border: none;
      box-shadow: none;
      opacity: 0.8;
      transform: translateY(-2px);
    }
    &:disabled {
      filter: saturate(0);
      opacity: 0.6;
    }

    &:active,
    &:focus,
    &:focus-within,
    &:focus-visible {
      border: none !important;
      background: none !important;
      outline: none !important;
    }

    img {
      height: 40px;
      width: auto;
    }
  }
`;
