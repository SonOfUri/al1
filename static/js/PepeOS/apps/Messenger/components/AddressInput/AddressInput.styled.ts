import styled from "styled-components";

export const AddressInputSC = styled.div`
  .input__search {
    display: grid;
    grid-template-columns: auto 100px;
    gap: 0.5rem;
  }

  input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }

  input {
    width: 100%;
    padding: 0.25rem;
    font-family: Tahoma, "Noto Sans", sans-serif !important;
  }

  h4 {
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
  }

  button {
    font-family: "Pixelated MS Sans Serif", Arial !important;
    -webkit-font-smoothing: antialiased !important;
    font-size: 11px !important;
    box-sizing: border-box !important;
    border: 1px solid #003c74 !important;
    background: linear-gradient(180deg, #fff, #ecebe5 86%, #d8d0c4) !important;
    box-shadow: none !important;
    border-radius: 3px !important;
    text-align: center !important;

    &:disabled {
      background-color: -internal-light-dark(
        rgba(239, 239, 239, 0.3),
        rgba(19, 1, 1, 0.3)
      ) !important;
      color: -internal-light-dark(
        rgba(16, 16, 16, 0.3),
        rgba(255, 255, 255, 0.3)
      ) !important;
      border-color: -internal-light-dark(
        rgba(118, 118, 118, 0.3),
        rgba(195, 195, 195, 0.3)
      ) !important;
    }
  }
`;
