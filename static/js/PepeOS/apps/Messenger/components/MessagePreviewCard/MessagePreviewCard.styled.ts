import styled from "styled-components";

export const MessagePreviewCardSC = styled.button`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  margin-top: 0.5rem;
  border-top: 1px solid lightgray !important;
  padding-right: 1rem !important;
  padding-top: 0.5rem !important;
  transition: opacity 0.3s ease;
  cursor: pointer;
  font-family: Tahoma, "Noto Sans", sans-serif;

  &:focus,
  &:focus-visible {
    box-shadow: none;
    outline: none;
  }

  .chat__preview-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    width: 100%;
  }

  .chat__preview-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
  }

  :hover {
    opacity: 0.4;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    white-space: initial;
    text-wrap: wrap;

    &.chat__preview-time {
      opacity: 0.6;
    }
  }

  h5 {
    font-size: 0.8rem;
  }
`;
