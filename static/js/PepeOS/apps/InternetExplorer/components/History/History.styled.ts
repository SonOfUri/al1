import styled from "styled-components";

export const HistorySC = styled.div`
  font-family: "Zero Wing", sans-serif;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: cetner;

  .button-group {
    margin: 2rem 0rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  button {
    font-family: "Zero Wing", sans-serif;
    color: white;
    background: none;
    border: none;
    text-transform: uppercase;
    font-size: 1.5rem;
    cursor: pointer !important;
    transition: 0.5s;

    @media only screen and (max-width: 800px) {
      font-size: 1rem;
    }

    &:hover {
      box-shadow: none;
      opacity: 0.3;
    }
  }

  p {
    span {
      background: linear-gradient(#fff 5%, #ddd993 47.5%, #939149 47.5%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-transform: uppercase;
    }

    font-size: 1rem;

    @media only screen and (max-width: 800px) {
      font-size: 0.8rem;
    }
  }

  .start-screen {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;

    img {
      padding-bottom: 2rem;
      max-width: 350px;
      margin: auto;

      @media only screen and (max-width: 800px) {
        max-width: 250px;
        padding-bottom: 1rem;
      }
    }
  }

  .credits {
    margin: 2rem 2rem;
    max-width: 800px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    img {
      margin: auto;
      align-self: center;
      max-width: 250px;
    }
    button {
      width: 100%;
      margin: auto;
    }
    a {
      color: blue !important;
      text-decoration: underline;
    }

    p {
      line-height: 150%;
    }
  }

  @media only screen and (max-width: 800px) {
    video {
      width: 100%;
    }
  }
`;
