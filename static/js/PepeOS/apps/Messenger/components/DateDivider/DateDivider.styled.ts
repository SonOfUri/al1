import styled from "styled-components";

export const DateDividerSC = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  padding: 0rem 0.5rem;
  margin: 1.5rem 0rem;
  opacity: 0.7;
  div {
    height: 1px;
    background-color: lightgray;
    width: 100%;
  }
  span {
    text-align: center;
    width: 100%;
    text-wrap: nowrap;
  }
`;
