import React, { FC, useState } from "react";
import dancingPepe from "@assets/gif/dancing-pepe.gif";
import { useSelector } from "react-redux";
import { TRootState } from "@store/index";
import guestIcon from "@assets/pepeOS-icons/auth/guest-pepe.png";
import { useAddress } from "@thirdweb-dev/react";

type TUserAvatarProps = {
  classNames?: string;
};

const UserAvatar: FC<TUserAvatarProps> = ({ classNames }) => {
  const address = useAddress();
  const [imgLoading, setImgLoading] = useState(true);

  const isGuest = useSelector(
    (state: TRootState) => state.userAccount.isGuest
  ) as boolean;

  const ensAvatar = useSelector(
    (state: TRootState) => state.userAccount.ensAvatar
  );

  const ensDataLoading = useSelector(
    (state: TRootState) => state.userAccount.isLoading
  );

  const userAvatar = !address
    ? guestIcon
    : ensAvatar
    ? ensAvatar
    : `https://effigy.im/a/${address}.svg`;

  return (
    <img
      className={classNames}
      src={ensDataLoading || imgLoading ? dancingPepe : userAvatar}
      alt="Avatar"
      onLoad={() => setImgLoading(false)}
      onError={() => setImgLoading(false)}
    />
  );
};

export default UserAvatar;
