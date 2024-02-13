import React, { FC } from "react";
import { InterestsSC } from "../ProfilePage.styled";
import { TRootState } from "@store/index";
import { useSelector } from "react-redux";
import { EProfileNavigation } from "../../TeamProfiles";
import { teamInfo } from "../../data/teamInfo";

const Interests: FC = () => {
  const activeProfile = useSelector(
    (state: TRootState) => state.userInterface.activeProfile
  ) as EProfileNavigation;

  const profileData = teamInfo.find((item) => item.name === activeProfile);

  if (!profileData) return <div>Loading...</div>;

  return (
    <InterestsSC>
      <div className="header">
        <h4>{profileData.name}'s Interests</h4>
      </div>
      <div className="inner">
        {Object.entries(profileData.interests).map(([category, interests]) => (
          <div className="interest-item" key={category}>
            <div className="category">
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            </div>
            <div className="category-data">
              <p>{interests.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
    </InterestsSC>
  );
};

export default Interests;
