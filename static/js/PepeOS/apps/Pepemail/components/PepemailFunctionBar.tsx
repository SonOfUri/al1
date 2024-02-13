import React, { FC } from "react";
import back from "@assets/windowsIcons/back.png";
import forward from "@assets/windowsIcons/forward.png";
import up from "@assets/windowsIcons/up.png";
import search from "@assets/pepeOS-icons/search.png";
import folderOpen from "@assets/windowsIcons/337(32x32).png";
import menu from "@assets/windowsIcons/358(32x32).png";

const PepemailFunctionBar: FC = () => {
  return (
    <section className="com__function_bar">
      <div className="com__function_bar__button--disable">
        <img className="com__function_bar__icon" src={back} alt="" />
        <span className="com__function_bar__text">Back</span>
        <div className="com__function_bar__arrow" />
      </div>
      <div className="com__function_bar__button--disable">
        <img className="com__function_bar__icon" src={forward} alt="" />
        <div className="com__function_bar__arrow" />
      </div>
      <div className="com__function_bar__button">
        <img className="com__function_bar__icon--normalize" src={up} alt="" />
      </div>
      <div className="com__function_bar__separate" />
      <div className="com__function_bar__button">
        <img
          className="com__function_bar__icon--normalize "
          src={search}
          alt=""
        />
        <span className="com__function_bar__text">Search</span>
      </div>
      <div className="com__function_bar__button">
        <img
          className="com__function_bar__icon--normalize"
          src={folderOpen}
          alt=""
        />
        <span className="com__function_bar__text">Folders</span>
      </div>
      <div className="com__function_bar__separate" />
      <div className="com__function_bar__button">
        <img className="com__function_bar__icon--margin12" src={menu} alt="" />
        <div className="com__function_bar__arrow" />
      </div>
    </section>
  );
};

export default PepemailFunctionBar;
