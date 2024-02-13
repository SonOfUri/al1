import React, { FC } from "react";
import { ProfilePageSC } from "./ProfilePage.styled";
import About from "./components/About";
import Bio from "./components/Bio";
import Interests from "./components/Interests";
import Frens from "./components/Frens";

const ProfilePage: FC = () => {
  return (
    <ProfilePageSC className="profile">
      <div className="section">
        <Bio />
        <Interests />
      </div>
      <div className="section">
        <About />
        <Frens />
      </div>
    </ProfilePageSC>
  );
};

export default ProfilePage;
