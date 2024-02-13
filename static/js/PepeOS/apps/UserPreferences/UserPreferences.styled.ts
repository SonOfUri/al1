import styled from "styled-components";

const aspectRatio = 62.15;

export const UserPreferencesSC = styled.div`
  background: ${({ theme }) => theme.defaultWindowBodyBackground};
  width: 100%;
  height: 100%;
  padding: 0.5rem;

  .tabs {
    width: 100%;
    height: 430px;

    @media (max-width: 768px) {
      height: 380px;
    }
  }

  .tab-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;

    .select-group {
      width: 150px;

      select {
        margin-top: 0.25rem;
        width: 100%;
      }
    }

    .theme-preview-image {
      box-shadow: ${({ theme }) => theme.bevel};
      width: 100%;
      padding-top: ${aspectRatio}%; /* Maintain aspect ratio */
      background-size: cover;
      background-position: center;
      position: relative;
      margin-top: 0.25rem;
    }
  }

  .button-group {
    display: flex;
    gap: 0.3rem;
    justify-content: flex-end;

    button {
      color: black !important;
    }
  }

  .desktop-preview {
    position: relative;
    text-align: center;

    img {
      margin: auto;
    }

    .desktop-img {
      position: absolute;
      top: 44%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 156px;
      height: 113px;
      object-fit: contain;
      background-size: cover;
    }
  }

  .image-select-group {
    border: 1px solid #7f9db9;
    padding: 2px 5px;
    height: 100%;

    .image-select {
      padding: 2px;

      &#active {
        border: 1px dotted #000;
      }
      :hover {
        background: rgb(11, 97, 255);
        color: white;
      }
    }
  }
`;
