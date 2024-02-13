import React, { FC } from "react";
import { ProfileCardSC } from "../TeamProfiles.styled";
import { useDispatch } from "react-redux";
import { setActiveProfileState } from "@store/userInterface/userInterface";

type TProfileCardProps = {
  name: string;
  image: string;
  role: string;
};

const ProfileCard: FC<TProfileCardProps> = ({ name, image, role }) => {
  const dispatch = useDispatch();
  return (
    <ProfileCardSC onClick={() => dispatch(setActiveProfileState(name))}>
      <div className="profile-card-image">
        <img src={image} alt="logo" />
      </div>
      <div className="profile-card-name">
        <h4>{name}</h4>
        <h5>{role}</h5>
      </div>
      <button onClick={() => dispatch(setActiveProfileState(name))}>
        Profile {">"}
      </button>
    </ProfileCardSC>
  );
};

export default ProfileCard;
