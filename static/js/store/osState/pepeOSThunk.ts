import { createAsyncThunk } from "@reduxjs/toolkit";
import { addApp } from "./pepeOS.slice";
import { TAppDispatch, TRootState } from "..";
import { EAppKeys } from "@PepeOS/apps/appState/EAppKeys";
import { initializeAppSettings } from "@PepeOS/apps/appState/appSettings";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

export const loadAppSettings = createAsyncThunk(
  "pepeOS/loadAppSettings",
  async (_, { getState, dispatch }) => {
    const state = getState() as TRootState;
    if (!state.pepeOSSlice.appSettings) {
      const settings = await initializeAppSettings();
      return settings;
    }
  }
);

export const addAppWithSettings = (
  appKey: EAppKeys
): ThunkAction<void, TRootState, unknown, AnyAction> => {
  return async (dispatch: TAppDispatch, getState: () => TRootState) => {
    const state = getState();
    let appSettings = state.pepeOSSlice.appSettings;

    // If appSettings are not loaded, dispatch loadAppSettings and wait for it
    if (!appSettings) {
      console.log("App settings are not loaded, loading settings...");
      await dispatch(loadAppSettings()).unwrap();

      // After awaiting the dispatch, re-fetch the state as it may have been updated
      appSettings = getState().pepeOSSlice.appSettings;
    }

    // Now, appSettings should be loaded
    if (appSettings && appSettings[appKey]) {
      dispatch(addApp(appSettings[appKey]));
    } else {
      console.error(
        "Failed to load app settings or the specified appKey does not exist."
      );
    }
  };
};
