import styled, { css } from "styled-components";
import claimsBg from "@assets/webp/christmas/gift_bg.webp";
import claimedGift from "@assets/webp/christmas/claimed_gift.webp";

type TGiftBox = {
  claimed: boolean;
  bgImage: string;
  isWhitelisted: boolean;
};

export const ChristmasClaimsSC = styled.div`
  background-image: url(${claimsBg});
  height: 100%;
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .claim-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .connect {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: white;
    text-align: center;
    max-width: 350px;
    margin: auto;

    h3 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1.5rem;
    }

    @media (max-width: 768px) {
      max-width: 250px;
      gap: 0.5rem;
      h3 {
        font-size: 1.5rem;
      }

      p {
        font-size: 0.8rem;
      }
    }
  }

  .gift-grid {
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: center;
    gap: 1.5rem;
    align-teim: center;
    width: 100%;
    max-width: 550px;
    margin: auto;
    text-align: center;
    justify-items: center;
    align-items: center;

    @media (max-width: 768px) {
      max-width: 350px;
      gap: 0.5rem;
    }
  }
`;

export const GiftBoxSC = styled.button<TGiftBox>`
  width: 100%;
  height: 0;
  padding-bottom: 100%; /* This makes the button square */
  background-image: url(${(props) =>
    !props.isWhitelisted
      ? props.bgImage
      : props.claimed
      ? claimedGift
      : props.bgImage});
  background-position: center; /* Center the background */
  background-repeat: no-repeat; /* Do not repeat the background */
  background-size: contain; /* Make the background fit within the button */
  position: relative;
  border: none;
  outline: none;
  transition: 0.3s;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;

  .claimed-item {
    width: 70px;
    height: 70px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media (max-width: 768px) {
      width: 45px;
      height: 45px;
    }
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 768px) {
    min-width: 50px !important;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:hover:enabled {
    transform: scale(1.1);
  }

  &:hover {
    border: none;
    outline: none;
    box-shadow: none !important;
  }

  &:active {
    background-color: transparent !important;
    background-image: url(${(props) =>
      props.claimed ? claimedGift : props.bgImage}) !important;
    background-position: center !important; /* Center the background */
    background-repeat: no-repeat !important; /* Do not repeat the background */
    background-size: contain !important; /* Make the background fit within the button */
  }

  &:focus {
    box-shadow: none !important;
  }

  .lock {
    width: 50%;
    height: 50%;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
