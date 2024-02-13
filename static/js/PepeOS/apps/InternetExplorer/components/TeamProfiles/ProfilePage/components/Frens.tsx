import React, { FC } from "react";
import { ProfileFrensSC } from "../ProfilePage.styled";
import ProfileCard from "../../components/ProfileCard";
import { teamInfo } from "../../data/teamInfo";
import { useSelector } from "react-redux";
import { TRootState } from "@store/index";
import { EProfileNavigation } from "../../TeamProfiles";

const Frens: FC = () => {
  const activeProfile = useSelector(
    (state: TRootState) => state.userInterface.activeProfile
  ) as EProfileNavigation;

  const profileData = teamInfo.find((item) => item.name === activeProfile);

  if (!profileData) return <div>Loading...</div>;
  return (
    <ProfileFrensSC>
      <div className="header">
        <h4>My Frens</h4>
      </div>
      <div className="body">
        {teamInfo.map((profile) => {
          if (profile.name === profileData?.name) {
            return null;
          }
          return (
            <ProfileCard
              key={profile.name}
              name={profile.name}
              image={profile.profilePicture}
              role={profile.role}
            />
          );
        })}
      </div>
    </ProfileFrensSC>
  );
};

export default Frens;
