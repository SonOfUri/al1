// ThemeContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import snowCap from "@assets/svg/snow-cap.svg";
import christmasBg from "@assets/background/christmas_bg.webp";
import blissBg from "@assets/background/pepe_bliss.jpeg";
import blissBgMobile from "@assets/background/pepe_bliss_mobile.jpeg";
import defaultThemePreview from "@assets/webp/theme-previews/default-theme.webp";
import christmasThemePreview from "@assets/webp/theme-previews/christmas-theme.webp";

// Define theme types
export enum EThemeMode {
  Default = "default",
  Christmas = "christmas",
}
interface ThemeContextType {
  theme: EThemeMode;
  setTheme: (theme: EThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: EThemeMode.Default,
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const defaultTheme = {
  background: `${blissBg}`,
  backgroundMobile: `${blissBgMobile}`,
  // barTopper is stylistic flair on top of the window/start bars (for example snow hedges sitting atop for christmas)
  barTopper: null,
  //   barGradient is the background gradient of the window/start bars
  barGradient: `linear-gradient(
    to bottom,
    #1f2f86 0,
    #3165c4 3%,
    #3682e5 6%,
    #4490e6 10%,
    #3883e5 12%,
    #2b71e0 15%,
    #2663da 18%,
    #235bd6 20%,
    #2258d5 23%,
    #2157d6 38%,
    #245ddb 54%,
    #2562df 86%,
    #245fdc 89%,
    #2158d4 92%,
    #1d4ec0 95%,
    #1941a5 98%
  )`,
  headerGradientUnfocused: `linear-gradient(rgb(118, 151, 231) 0%, rgb(126, 158, 227) 3%, rgb(148, 175, 232) 6%, rgb(151, 180, 233) 8%, rgb(130, 165, 228) 14%, rgb(124, 159, 226) 17%, rgb(121, 150, 222) 25%, rgb(123, 153, 225) 56%, rgb(130, 169, 233) 81%, rgb(128, 165, 231) 89%, rgb(123, 150, 225) 94%, rgb(122, 147, 223) 97%, rgb(171, 186, 227) 100%)`,
  windowBg: "rgb(8, 49, 217)",
  windowBgUnfocused: "rgb(101, 130, 245)",
  //   barTrayGradient is the background gradient for the small tray on the right of the start bar
  barTrayGradient: `linear-gradient(
    to bottom,
    #0c59b9 1%,
    #139ee9 6%,
    #18b5f2 10%,
    #139beb 14%,
    #1290e8 19%,
    #0d8dea 63%,
    #0d9ff1 81%,
    #0f9eed 88%,
    #119be9 91%,
    #1392e2 94%,
    #137ed7 97%,
    #095bc9 100%
  )`,
  barTrayBorderLeft: "1px solid #1042af",
  barTrayBoxShadow: "inset 1px 0 1px #18bbff",
  startMenuBackground: "#cbe3ff",
  startMenuBorderLeft: "solid #3a3aff5e 1px",
  //   appTabs are the tabs on the window bar
  appTabActive: "#1e52b7",
  appTabActiveHover: "rgb(53, 118, 243)",
  appTabActiveClicked: "rgb(30, 82, 183)",
  appTabInactive: "#3c81f3",
  appTabInactiveHover: "#53a3ff",
  appTabInactiveClicked: "rgb(30, 82, 183)",
  desktopIconTextBackground: "transparent",
  defaultWindowBodyBackground: `linear-gradient(to right, rgb(237, 237, 229) 0%, rgb(237, 232, 205) 100%)`,
  bevel: `inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a`,
  loginScreen: {
    topBorderImage: `linear-gradient(90deg, rgb(0, 77, 163) 0%, rgba(255, 255, 255, 0.8) 30%, rgba(255, 255, 255, 0.9) 40%, rgba(255, 255, 255, 0.9) 50%, rgb(0, 77, 163) 100%)`,
    topBg: `rgb(0, 77, 163)`,
    centerBg: `rgb(80, 143, 217)`,
    bottomBorderImage: `linear-gradient(90deg, rgb(0, 77, 163) 0%, rgb(240, 150, 68) 30%, rgb(240, 150, 68) 40%, rgb(240, 150, 68) 50%, rgb(0, 77, 163) 100%)`,
    bottomBg: `rgb(0, 77, 163)`,
    accountActive: `linear-gradient(90deg, rgb(0, 72, 154) 60%, rgba(255, 255, 255, 0) 100%) padding-box`,
  },
  userPreferences: {
    themePreview: defaultThemePreview,
  },
};

const christmasTheme = {
  background: `${christmasBg}`,
  backgroundMobile: `${christmasBg}`,
  barTopper: `
    content: "";
    position: absolute;
    top: -6px;
    left: 0;
    right: 0;
    height: 20px;
    width: 100%;
    z-index: 9999;
    background-image: url(${snowCap});
    background-repeat: repeat-x;
    background-position: top;
    background-size: contain;
    pointer-events: none`,
  barGradient: `linear-gradient(
    rgb(134 31 31) 0px,
    rgb(196 49 49) 3%,
    rgb(229 54 54) 6%,
    rgb(230 68 68) 10%,
    rgb(229 56 56) 12%,
    rgb(224 43 43) 15%,
    rgb(218 38 38) 18%,
    rgb(214 35 35) 20%,
    rgb(213 34 34) 23%,
    rgb(214 33 33) 38%,
    rgb(219 36 36) 54%,
    rgb(223 37 37) 86%,
    rgb(220 36 36) 89%,
    rgb(212 33 33) 92%,
    rgb(192 29 29) 95%,
    rgb(165 25 25) 98%
  )`,
  headerGradientUnfocused: `linear-gradient(rgb(231 118 118) 0%, rgb(227 126 126) 3%, rgb(232 148 148) 6%, rgb(233 151 151) 8%, rgb(228 130 130) 14%, rgb(226 124 124) 17%, rgb(222 121 121) 25%, rgb(225 123 123) 56%, rgb(233 130 130) 81%, rgb(231 128 128) 89%, rgb(225 123 123) 94%, rgb(223 122 122) 97%, rgb(227 171 171) 100%)`,
  windowBg: "rgb(217 8 8)",
  windowBgUnfocused: "rgb(245 101 101)",
  barTrayGradient: `linear-gradient(
    rgb(185 12 12) 1%,
    rgb(233 19 19) 6%,
    rgb(242 24 24) 10%,
    rgb(235 19 19) 14%,
    rgb(232 18 18) 19%,
    rgb(234 13 13) 63%,
    rgb(241 13 13) 81%,
    rgb(237 15 15) 88%,
    rgb(233 17 17) 91%,
    rgb(226 19 19) 94%,
    rgb(215 19 19) 97%,
    rgb(201 9 9) 100%
  )`,
  barTrayBorderLeft: "1px solid rgb(175 16 16)",
  barTrayBoxShadow: "rgb(255 24 24) 1px 0px 1px inset",
  startMenuBackground: "rgb(203 255 214)",
  startMenuBorderLeft: "solid rgb(58 255 95 / 37%) 1px",
  appTabActive: "rgb(183 30 30)",
  appTabActiveHover: "rgb(243 60 60)",
  appTabActiveClicked: `rgb(183 30 30)`,
  appTabInactive: "rgb(243 60 60)",
  appTabInactiveHover: "rgb(243 53 53)",
  appTabInactiveClicked: "rgb(183 30 30)",
  desktopIconTextBackground: "rgb(255 11 11)",
  defaultWindowBodyBackground: `linear-gradient(to right, rgb(237, 237, 229) 0%, rgb(237, 232, 205) 100%)`,
  bevel: `inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a`,
  loginScreen: {
    topBorderImage: `linear-gradient(90deg, rgb(163 0 0) 0%, rgba(255, 255, 255, 0.8) 30%, rgba(255, 255, 255, 0.9) 40%, rgba(255, 255, 255, 0.9) 50%, rgb(163 0 0) 100%)`,
    topBg: `rgb(163 0 0)`,
    centerBg: `rgb(217 80 80)`,
    bottomBorderImage: `linear-gradient(90deg, rgb(163 0 0) 0%, rgb(240, 150, 68) 30%, rgb(240, 150, 68) 40%, rgb(240, 150, 68) 50%, rgb(163 0 0) 100%)`,
    bottomBg: `rgb(163 0 0)`,
    accountActive: `linear-gradient(90deg, rgb(154, 0, 0) 60%, rgba(255, 255, 255, 0) 100%) padding-box`,
  },
  userPreferences: {
    themePreview: christmasThemePreview,
  },
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<EThemeMode>(
    (localStorage.getItem("theme") as EThemeMode) || EThemeMode.Default
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeTheme = (newTheme: EThemeMode) => {
    setTheme(newTheme);
  };

  const contextValue = {
    theme,
    setTheme: changeTheme,
  };

  const themeStyles = {
    default: defaultTheme,

    christmas: christmasTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={themeStyles[theme]}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
