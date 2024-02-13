import styled from "styled-components";

export const FullMessageSC = styled.div`
  padding: 0rem 0.5rem;
  padding-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  .message__header {
    display: flex;
    justify-content: space-between;
    width: 100%;

    h4 {
      font-size: 0.85rem;
    }

    p {
      font-size: 0.6rem !important;
      opacity: 0.6;
    }
  }

  .message__content {
    font-weight: 600;
  }
`;
