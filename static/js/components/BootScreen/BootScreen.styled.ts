import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const blink = keyframes`
  0% {opacity: 0;}
  50% {opacity: 1;}
  100% {opacity: 0;}
`;

export const BootScreenSC = styled.div`
  width: 100vw;
  height: 100dvh;
  background-color: #161212;
  color: white;
  display: flex;
  padding: 24px;
  flex-direction: column;
  justify-content: space-between;

  p {
    font-size: 1.5rem;
    margin: 0px;
    font-family: "Perfect DOS VGA 437";
  }

  .top {
    display: flex;
    justify-content: space-between;

    img {
      max-width: 300px;
    }
  }

  .boot-text {
    max-width: 800px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;

    svg {
      height: 150px;
    }
  }

  .press-enter {
    text-align: center;
    margin-bottom: 3rem;
  }

  .loading-items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .bios-line {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  svg {
    height: 400px;
    animation: ${fadeIn} 1s ease-in-out;
  }

  @media only screen and (max-width: 776px) {
    p {
      font-size: 0.9rem;
    }
  }
`;

export const BlinkingCursor = styled.span`
  animation: ${blink} 0.5s infinite;
`;
