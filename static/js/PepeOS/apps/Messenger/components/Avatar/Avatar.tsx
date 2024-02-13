import React, { FC } from "react";
import { AvatarSC } from "./Avatar.styled";
import dancingPepe from "@assets/gif/dancing-pepe.gif";

type TAvatar = {
  /**
   * Are we waiting on an avatar url?
   */
  isLoading?: boolean;

  /**
   * What is the address associated with this avatar?
   */
  address?: string;
};

const Avatar: FC<TAvatar> = ({ isLoading, address }) => {
  const effigyUrl = `https://effigy.im/a/${address}.svg`;

  return (
    <AvatarSC>
      <img src={isLoading ? dancingPepe : effigyUrl} alt={address} />
    </AvatarSC>
  );
};

export default Avatar;
