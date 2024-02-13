import React, { FC } from "react";
import { teamInfo } from "../../data/teamInfo";
import { useSelector } from "react-redux";
import { TRootState } from "@store/index";
import { EProfileNavigation } from "../../TeamProfiles";
import { BioSC } from "../ProfilePage.styled";
import onlineNowGif from "@assets/gif/online.gif";
import Links from "./Links";

const Bio: FC = () => {
  const activeProfile = useSelector(
    (state: TRootState) => state.userInterface.activeProfile
  ) as EProfileNavigation;

  const profileData = teamInfo.find((item) => item.name === activeProfile);

  if (!profileData) return <div>Loading...</div>;

  return (
    <BioSC>
      <h4>{activeProfile}</h4>
      <div className="profile-info">
        <img src={profileData.profilePicture} alt="profile" />
        <div className="bio-summary">
          <h5>"{profileData.status}"</h5>
          <h5>{profileData.role}</h5>
          <h5>{profileData.location}</h5>
          <img src={onlineNowGif} alt="online now" />
        </div>
      </div>
      <h5>
        <strong>Mood: </strong>
        {profileData.mood}
      </h5>
      <Links />
    </BioSC>
  );
};

export default Bio;
