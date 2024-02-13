import React, { FC } from "react";
import { teamInfo } from "../data/teamInfo";
import ProfileCard from "./ProfileCard";

const MyFrensProfileDiscovery: FC = () => {
  return (
    <div className="team-profiles">
      <div className="profiles-header">
        <h4>Discover our contributors</h4>
      </div>
      <div className="profiles">
        {teamInfo.map((profile) => (
          <ProfileCard
            key={profile.name}
            name={profile.name}
            image={profile.profilePicture}
            role={profile.role}
          />
        ))}
      </div>
    </div>
  );
};

export default MyFrensProfileDiscovery;
