import React, { FC, useState } from "react";
import { UserPreferencesSC } from "./UserPreferences.styled";
import { EThemeMode, useTheme } from "../../../ThemeContext";
import defaultThemePreview from "@assets/webp/theme-previews/default-theme.webp";
import christmasThemePreview from "@assets/webp/theme-previews/christmas-theme.webp";
import computerIcon from "@assets/webp/screen-icon.webp";
import blissBg from "@assets/background/pepe_bliss.jpeg";
import christmasBg from "@assets/background/christmas_bg.webp";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { setCustomBackgroundImage } from "@store/userInterface/userInterface";

type TUserPreferencesProps = {
  onClose: () => void;
};

enum ETabOptions {
  Themes = "Themes",
  Desktop = "Desktop",
}

const themeImages: Record<EThemeMode, string> = {
  [EThemeMode.Default]: defaultThemePreview,
  [EThemeMode.Christmas]: christmasThemePreview,
};

const themeBackgrounds: Record<EThemeMode, string> = {
  [EThemeMode.Default]: blissBg,
  [EThemeMode.Christmas]: christmasBg,
};

const backgroundOptions = [
  { title: "Pepe Bliss", url: blissBg },
  //   { title: "Spaceship", url: spaceBg },
  { title: "Kekmas 2023", url: christmasBg },
];

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const UserPreferences: FC<TUserPreferencesProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<ETabOptions>(ETabOptions.Themes);
  const [activeBg, setActiveBg] = useState<any>(backgroundOptions[0]);
  const [themeSelected, setThemeSelected] = useState<EThemeMode>(
    (localStorage.getItem("theme") as EThemeMode) || EThemeMode.Default
  );
  const { setTheme } = useTheme();
  const dispatch = useAppDispatch();

  const handleTabClick = (tab: ETabOptions) => {
    setActiveTab(tab);
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setThemeSelected(event.target.value as EThemeMode);
  };

  const backgroundImageUrl = themeImages[themeSelected];

  const applySettings = () => {
    const initialTheme =
      (localStorage.getItem("theme") as EThemeMode) || EThemeMode.Default;
    setTheme(themeSelected);
    dispatch(setCustomBackgroundImage(activeBg.url));
    if (themeSelected !== initialTheme) {
      dispatch(setCustomBackgroundImage(themeBackgrounds[themeSelected]));
      localStorage.setItem(
        "customBackgroundImage",
        themeBackgrounds[themeSelected]
      );
    }
  };

  return (
    <UserPreferencesSC>
      <section className="tabs">
        <menu role="tablist" aria-label="Sample Tabs">
          <button
            role="tab"
            aria-selected={activeTab === ETabOptions.Themes}
            aria-controls="tab-Themes"
            onClick={() => handleTabClick(ETabOptions.Themes)}
          >
            {ETabOptions.Themes}
          </button>
          <button
            role="tab"
            aria-selected={activeTab === ETabOptions.Desktop}
            aria-controls="tab-Desktop"
            onClick={() => handleTabClick(ETabOptions.Desktop)}
          >
            {ETabOptions.Desktop}
          </button>
        </menu>
        {/* the tab content */}
        {activeTab === ETabOptions.Themes && (
          <article role="tabpanel" id="tab-Themes" className="tab-content">
            <p>
              A theme is a background plus a set of sounds, icons, and other
              elements to help you personalize your PepeOS with one click.
            </p>
            <div className="select-group">
              <p>Themes:</p>
              <select
                id="theme-select"
                value={themeSelected}
                onChange={handleThemeChange}
              >
                {Object.values(EThemeMode).map((theme) => (
                  <option key={theme} value={theme}>
                    {capitalizeFirstLetter(theme)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p>Sample:</p>
              <div
                className="bevel theme-preview-image"
                style={{ backgroundImage: `url(${backgroundImageUrl})` }}
              ></div>
            </div>
          </article>
        )}
        {activeTab === ETabOptions.Desktop && (
          <article role="tabpanel" id="tab-Desktop" className="tab-content">
            <div className="desktop-preview">
              <img src={computerIcon} alt="desktop" />
              <div
                className="desktop-img"
                style={{
                  backgroundImage: `url(${activeBg.url})`,
                }}
              ></div>
            </div>
            <p>Background:</p>
            <div className="image-select-group">
              {backgroundOptions.map((option) => (
                <div
                  key={option.title}
                  className="image-select"
                  id={activeBg === option ? "active" : ""}
                  onClick={() => setActiveBg(option)}
                >
                  {option.title}
                </div>
              ))}
            </div>
          </article>
        )}

        <div className="button-group">
          <button onClick={onClose}>Ok</button>
          <button onClick={onClose}>Cancel</button>
          <button onClick={applySettings}>Apply</button>
        </div>
      </section>
    </UserPreferencesSC>
  );
};

export default UserPreferences;
