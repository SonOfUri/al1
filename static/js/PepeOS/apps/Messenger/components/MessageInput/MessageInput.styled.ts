import styled from "styled-components";

export const MessageInputSC = styled.form`
  display: flex;
  justify-content: space-between;
  padding: 0rem 0.5rem;
  height: 55px;

  input {
    height: 100%;
    font-family: Tahoma, "Noto Sans", sans-serif !important;
    font-size: 0.8rem;

    &:focus {
      outline: none;
    }
  }

  button {
    width: 150px;
  }
`;
