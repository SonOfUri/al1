// src/PepeOS/pepeOS.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FOCUSING, POWER_STATE } from "@PepeOS/constants";
import { defaultIconState } from "@PepeOS/apps/appState/defaultIconState";
import { EAppKeys } from "@PepeOS/apps/appState/EAppKeys";
import { loadAppSettings } from "./pepeOSThunk";

type TAppSetting = {
  header: {
    icon: string;
    title: string;
  };
  defaultSize: {
    width: string | number;
    height: number;
  };
  defaultOffset: {
    x: number;
    y: number;
  };
  resizable: boolean;
  minimized: boolean;
  maximized: boolean;
  multiInstance: boolean;
  id: number;
  zIndex: number;
  component: React.ComponentType<any>;
};

type TAppSettings = {
  [key in EAppKeys]: TAppSetting;
};

type TMainDesktopState = {
  apps: TAppSetting[];
  appSettings: TAppSettings | null;
  nextAppID: number;
  nextZIndex: number;
  focusing: (typeof FOCUSING)[keyof typeof FOCUSING];
  icons: typeof defaultIconState;
  selecting: { x: number; y: number } | null;
  powerState: (typeof POWER_STATE)[keyof typeof POWER_STATE];
  loadingAppSettings: boolean;
};

const initialState: TMainDesktopState = {
  apps: [],
  appSettings: null,
  nextAppID: 0,
  nextZIndex: 0,
  focusing: FOCUSING.WINDOW,
  icons: defaultIconState,
  selecting: null,
  powerState: POWER_STATE.START,
  loadingAppSettings: false,
};

export const pepeOSSlice = createSlice({
  name: "pepeOS",
  initialState,
  reducers: {
    // Reducer to set the loading state for appSettings
    setLoadingAppSettings: (state, action: PayloadAction<boolean>) => {
      state.loadingAppSettings = action.payload;
    },
    // Reducer to set the appSettings after they have been loaded
    setAppSettings: (state, action: PayloadAction<TAppSettings>) => {
      state.appSettings = action.payload;
    },
    addApp: (state, action: PayloadAction<TAppSetting>) => {
      const appExists = state.apps.find(
        (_app) => _app.component === action.payload.component
      );

      if (action.payload.multiInstance || !appExists) {
        // Calculate the highest zIndex in the current apps array
        const highestZIndex = state.apps.reduce(
          (max, app) => Math.max(app.zIndex, max),
          0
        );

        // Use the highest zIndex + 1 for the new app
        state.apps.push({
          ...action.payload,
          id: state.nextAppID, // Assuming you have a mechanism to generate unique IDs
          zIndex: highestZIndex + 1,
        });

        // Increment the nextAppID for the next app to be added
        state.nextAppID += 1;
        state.focusing = FOCUSING.WINDOW;
      } else {
        // If the app already exists, bring it to the front by updating its zIndex
        state.apps = state.apps.map((app) =>
          app.component === action.payload.component
            ? { ...app, zIndex: state.nextZIndex }
            : app
        );

        // Increment the nextZIndex for the next app to be added
        state.nextZIndex += 1;
        state.focusing = FOCUSING.WINDOW;
      }
    },
    delApp: (state, action: PayloadAction<number>) => {
      if (state.focusing !== FOCUSING.WINDOW) return;
      state.apps = state.apps.filter((app) => app.id !== action.payload);
      state.focusing =
        state.apps.length > 1
          ? FOCUSING.WINDOW
          : state.icons.find((icon) => icon.isFocus)
          ? FOCUSING.ICON
          : FOCUSING.DESKTOP;
    },
    focusApp: (state, action: PayloadAction<number>) => {
      state.apps = state.apps.map((app) =>
        app.id === action.payload
          ? { ...app, zIndex: state.nextZIndex, minimized: false }
          : app
      );
      state.nextZIndex += 1;
      state.focusing = FOCUSING.WINDOW;
    },
    minimizeApp: (state, action: PayloadAction<number>) => {
      if (state.focusing !== FOCUSING.WINDOW) return;
      state.apps = state.apps.map((app) =>
        app.id === action.payload ? { ...app, minimized: true } : app
      );
      state.focusing = FOCUSING.WINDOW;
    },
    toggleMaximizeApp: (state, action: PayloadAction<number>) => {
      if (state.focusing !== FOCUSING.WINDOW) return;
      state.apps = state.apps.map((app) =>
        app.id === action.payload ? { ...app, maximized: !app.maximized } : app
      );
      state.focusing = FOCUSING.WINDOW;
    },
    focusIcon: (state, action: PayloadAction<number>) => {
      state.icons = state.icons.map((icon) => ({
        ...icon,
        isFocus: icon.id === action.payload,
      }));
      state.focusing = FOCUSING.ICON;
    },
    selectIcons: (state, action: PayloadAction<number[]>) => {
      state.icons = state.icons.map((icon) => ({
        ...icon,
        isFocus: action.payload.includes(icon.id),
      }));
      state.focusing = FOCUSING.ICON;
    },
    focusDesktop: (state) => {
      state.focusing = FOCUSING.DESKTOP;
      state.icons = state.icons.map((icon) => ({
        ...icon,
        isFocus: false,
      }));
    },
    startSelect: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.focusing = FOCUSING.DESKTOP;
      state.icons = state.icons.map((icon) => ({
        ...icon,
        isFocus: false,
      }));
      state.selecting = action.payload;
    },
    endSelect: (state) => {
      state.selecting = null;
    },
    powerOff: (
      state,
      action: PayloadAction<(typeof POWER_STATE)[keyof typeof POWER_STATE]>
    ) => {
      state.powerState = action.payload;
    },
    cancelPowerOff: (state) => {
      state.powerState = POWER_STATE.START;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAppSettings.pending, (state) => {
        state.loadingAppSettings = true;
      })
      .addCase(loadAppSettings.fulfilled, (state, action) => {
        if (action.payload) {
          state.appSettings = action.payload;
        }
      })
      .addCase(loadAppSettings.rejected, (state) => {
        state.loadingAppSettings = false;
      });
  },
});

export const {
  addApp,
  toggleMaximizeApp,
  minimizeApp,
  delApp,
  focusApp,
  focusIcon,
  selectIcons,
  focusDesktop,
  startSelect,
  endSelect,
  powerOff,
  cancelPowerOff,
  setAppSettings,
  setLoadingAppSettings,
} = pepeOSSlice.actions;

export default pepeOSSlice.reducer;
