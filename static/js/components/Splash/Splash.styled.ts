import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const move = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(100%); }
`;

export const SplashSC = styled.div`
  width: 100vw;
  height: 100dvh;
  background-size: cover;
  background-position: center;
  background-color: #161212;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;

  .progress-bar {
    border: 1.5px solid white;
    padding: 4px;
    border-radius: 6px;
    width: 250px;
    overflow: hidden;
  }

  .progress-piece {
    display: flex;
    gap: 0.25rem;

    span {
      background: rgb(48, 58, 255);
      background: linear-gradient(
        180deg,
        rgba(48, 58, 255, 1) 0%,
        rgba(132, 166, 255, 1) 14%,
        rgba(106, 135, 255, 1) 37%,
        rgba(48, 58, 255, 1) 100%
      );
      height: 20px;
      width: 15px;

      @media (max-width: 800px) {
        height: 16px;
      }
    }

    animation: ${move} 2s linear infinite;
  }

  img {
    height: 300px;
    animation: ${fadeIn} 1s ease-in-out;

    @media (max-width: 800px) {
      height: 175px;
    }
  }
`;
