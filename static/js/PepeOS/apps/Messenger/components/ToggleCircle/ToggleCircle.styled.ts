import styled from "styled-components";
import smallCircleButton from "@assets/pepeOS-icons/messenger/small-circle-button.png";

export const ToggleCircleSC = styled.div`
  height: 19px;
  width: 19px;
  background-image: url(${smallCircleButton});
  background-repeat: no-repeat;
  background-size: 19px 19px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0px 5px;
`;
