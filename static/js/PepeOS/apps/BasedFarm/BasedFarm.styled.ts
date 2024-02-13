import styled from "styled-components";

import basedBanner from "@assets/webp/based_banner.webp";

export const BasedFarmSC = styled.div`
  background: #ece9d8;
  padding: 1rem;
  height: 100%;
  overflow-y: auto;

  button {
    &.unstyled {
      background: none;
      border: none;
      box-shadow: none;
      padding: 0px;
      min-width: 1rem;
      max-width: 2rem;
      transition: opacity 0.2s ease-in-out;

      :hover {
        opacity: 0.5;
      }
    }
  }

  .banner {
    color: white;
    background-image: url(${basedBanner});
    width: 100%;
    padding: 2rem;
    background-position: bottom;
    background-size: cover;
    margin-bottom: 1rem;
  }

  .controls {
    display: flex;
    gap: 1rem;
  }

  .sections {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;
