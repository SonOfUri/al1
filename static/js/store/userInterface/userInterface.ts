import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { EPageLoadingState } from "../../App";
import { EProfileNavigation } from "@PepeOS/apps/InternetExplorer/components/TeamProfiles/TeamProfiles";
import { EExplorerNavState } from "@PepeOS/apps/InternetExplorer";

type TUserInterfaceState = {
  bootState: EPageLoadingState;
  activeProfile: EProfileNavigation;
  explorerNavState: EExplorerNavState;
  crtToggleState: boolean;
  customBackgroundImage: string | null;
};

const defaultState: TUserInterfaceState = {
  bootState: EPageLoadingState.Booting,
  activeProfile: EProfileNavigation.Main,
  explorerNavState: EExplorerNavState.About,
  crtToggleState: localStorage.getItem("crtToggleState")
    ? JSON.parse(localStorage.getItem("crtToggleState") as string)
    : true,
  customBackgroundImage: localStorage.getItem("customBackgroundImage") || null,
};

export const userInterfaceSlice: Slice<TUserInterfaceState> = createSlice({
  name: "userInterface",
  initialState: defaultState,
  reducers: {
    setBootState: (state, action: PayloadAction<EPageLoadingState>) => {
      state.bootState = action.payload;
    },
    setActiveProfileState: (
      state,
      action: PayloadAction<EProfileNavigation>
    ) => {
      state.activeProfile = action.payload;
    },
    setExplorerNavState: (state, action: PayloadAction<EExplorerNavState>) => {
      state.explorerNavState = action.payload;
    },
    setCrtToggleState: (state, action: PayloadAction<boolean>) => {
      state.crtToggleState = action.payload;
      localStorage.setItem("crtToggleState", JSON.stringify(action.payload));
    },
    setCustomBackgroundImage: (state, action: PayloadAction<string | null>) => {
      state.customBackgroundImage = action.payload;
      localStorage.setItem("customBackgroundImage", action.payload ?? "");
    },
  },
});
export const {
  setBootState,
  setActiveProfileState,
  setExplorerNavState,
  setCrtToggleState,
  setCustomBackgroundImage,
} = userInterfaceSlice.actions;

export default userInterfaceSlice.reducer;
