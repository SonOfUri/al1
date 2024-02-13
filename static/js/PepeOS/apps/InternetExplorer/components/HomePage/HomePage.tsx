import React, { FC, useState } from "react";
import { HomePageSC } from "./HomePage.styled";
import TeamProfiles from "../TeamProfiles";
import { useSelector } from "react-redux";
import { TRootState } from "@store/index";
import { EExplorerNavState } from "../..";
import AskPepe from "@PepeOS/apps/AskPepe";
import History from "../History";

const renderContent = (navState: EExplorerNavState) => {
  switch (navState) {
    case EExplorerNavState.About:
      return <AskPepe />;
    case EExplorerNavState.History:
      return <History />;
    case EExplorerNavState.Team:
      return <TeamProfiles />;
    default:
      return <AskPepe />;
  }
};

const HomePage: FC = () => {
  const explorerNavState = useSelector(
    (state: TRootState) => state.userInterface.explorerNavState
  ) as EExplorerNavState;
  return (
    <HomePageSC>
      <div className="main-body">{renderContent(explorerNavState)}</div>
    </HomePageSC>
  );
};

export default HomePage;
