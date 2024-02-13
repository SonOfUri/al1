import React, { FC } from "react";
import { useSelector } from "react-redux";
import { EProfileNavigation } from "../../TeamProfiles";
import { TRootState } from "@store/index";
import { teamInfo } from "../../data/teamInfo";
import { ProfileAboutSC } from "../ProfilePage.styled";

const About: FC = () => {
  const activeProfile = useSelector(
    (state: TRootState) => state.userInterface.activeProfile
  ) as EProfileNavigation;

  const profileData = teamInfo.find((item) => item.name === activeProfile);

  if (!profileData) return <div>Loading...</div>;

  return (
    <ProfileAboutSC>
      <div className="summary-box">
        <h4>{profileData.about.headline}</h4>
      </div>
      <div className="about-content">
        <div className="header">
          <h4>{activeProfile}'s Blurbs</h4>
        </div>
        <div className="body">
          <h4>About Me:</h4>
          <p>{profileData.about.aboutMe}</p>
          <h4>What I'm looking for:</h4>
          <p>{profileData.about.lookingFor}</p>
        </div>
      </div>
    </ProfileAboutSC>
  );
};

export default About;
