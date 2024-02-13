import React, { FC } from "react";
import { ProfileLinksSC } from "../ProfilePage.styled";
import { TRootState } from "@store/index";
import { useSelector } from "react-redux";
import { EProfileNavigation } from "../../TeamProfiles";
import { teamInfo } from "../../data/teamInfo";

const Links: FC = () => {
  const activeProfile = useSelector(
    (state: TRootState) => state.userInterface.activeProfile
  ) as EProfileNavigation;

  const profileData = teamInfo.find((item) => item.name === activeProfile);

  if (!profileData) return <div>Loading...</div>;

  return (
    <ProfileLinksSC>
      <div className="header">
        <h4>Contacting {profileData.name}</h4>
      </div>
      <div className="inner">
        {Object.entries(profileData.links).map(([type, link]) => (
          <div className="link-item" key={type}>
            <img src={link.icon} alt={`${type}-icon`} />
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {type}
            </a>
          </div>
        ))}
      </div>
    </ProfileLinksSC>
  );
};

export default Links;
