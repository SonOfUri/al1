import React, { FC } from "react";
import { MyFrensFooterSC } from "../TeamProfiles.styled";

const MyFrensFooter: FC = () => {
  const currentYear = new Date().getFullYear();
  const footerStuff = [
    "Terms",
    "Privacy",
    `\u00A9 2016 - ${currentYear} PepeCoin Corporation. All rights reserved.`,
  ];
  return (
    <MyFrensFooterSC>
      {footerStuff.map((item, index) => {
        return <span key={index}>{item}</span>;
      })}
    </MyFrensFooterSC>
  );
};

export default MyFrensFooter;
