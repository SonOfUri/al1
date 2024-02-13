import React, { FC } from "react";
import { setActiveProfileState } from "@store/userInterface/userInterface";
import { useDispatch } from "react-redux";
import { EProfileNavigation } from "../TeamProfiles";
import { teamInfo } from "../data/teamInfo";
import { ReactComponent as MyFrensSvg } from "@assets/svg/myfrens_white.svg";
import { MyFrensHeaderSC } from "../TeamProfiles.styled";

const MyFrensHeader: FC = () => {
  const dispatch = useDispatch();
  return (
    <MyFrensHeaderSC className="my-frens-header">
      <div className="brand-banner">
        <MyFrensSvg />
      </div>
      <div className="links-banner">
        <div>
          <button
            onClick={() =>
              dispatch(setActiveProfileState(EProfileNavigation.Main))
            }
          >
            Home
          </button>
        </div>
        {teamInfo.map((profile, index) => (
          <div key={index} className="team-member">
            <button
              onClick={() => dispatch(setActiveProfileState(profile.name))}
            >
              {profile.name}
            </button>
          </div>
        ))}
      </div>
    </MyFrensHeaderSC>
  );
};

export default MyFrensHeader;
