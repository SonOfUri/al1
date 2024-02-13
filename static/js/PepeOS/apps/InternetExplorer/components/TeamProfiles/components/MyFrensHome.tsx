import React, { FC } from "react";
import { MyFrensHomeSC } from "../TeamProfiles.styled";
import MyFrensProfileDiscovery from "./MyFrensProfileDiscovery";
import SocialPosts from "./SocialPosts";

const MyFrensHome: FC = () => {
  return (
    <MyFrensHomeSC className="my-frens-home">
      <MyFrensProfileDiscovery />
      {/* <SocialPosts /> */}
    </MyFrensHomeSC>
  );
};

export default MyFrensHome;
