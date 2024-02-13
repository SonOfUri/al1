import React, { FC } from "react";
import { TeamProfilesSC } from "./TeamProfiles.styled";
import ProfilePage from "./ProfilePage";
import { useSelector } from "react-redux";
import { TRootState } from "@store/index";
import MyFrensFooter from "./components/MyFrensFooter";
import MyFrensHeader from "./components/MyFrensHeader";
import MyFrensHome from "./components/MyFrensHome";

export enum EProfileNavigation {
  Pepe = "Pepe",
  Prometheus = "Prometheus",
  BigBrain = "BigBrain",
  Damoos3 = "Damoos3",
  Smille = "Smille",
  Dev0x07041776 = "0x07041776",
  Main = "Main",
}

const renderComponent = (navigateTo: EProfileNavigation): JSX.Element => {
  switch (navigateTo) {
    case EProfileNavigation.Pepe:
    case EProfileNavigation.Prometheus:
    case EProfileNavigation.BigBrain:
    case EProfileNavigation.Damoos3:
    case EProfileNavigation.Smille:
    case EProfileNavigation.Dev0x07041776:
      return <ProfilePage />;
    case EProfileNavigation.Main:
    default:
      return <MyFrensHome />;
  }
};

const TeamProfiles: FC = () => {
  const activeProfile = useSelector(
    (state: TRootState) => state.userInterface.activeProfile
  ) as EProfileNavigation;
  return (
    <TeamProfilesSC>
      <div className="inner-content">
        <MyFrensHeader />
        {renderComponent(activeProfile)}
        <MyFrensFooter />
      </div>
    </TeamProfilesSC>
  );
};

export default TeamProfiles;
