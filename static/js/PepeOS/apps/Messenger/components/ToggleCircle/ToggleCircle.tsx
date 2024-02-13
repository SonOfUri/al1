import React, { FC } from "react";
import { ToggleCircleSC } from "./ToggleCircle.styled";
import smallUpDown from "@assets/pepeOS-icons/messenger/small-up-down.png";

const ToggleCircle: FC = () => {
  return (
    <ToggleCircleSC>
      <img src={smallUpDown} alt="Open/Close" />
    </ToggleCircleSC>
  );
};

export default ToggleCircle;
