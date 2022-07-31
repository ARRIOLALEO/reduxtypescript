import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = { theme: "darkblue" };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});
export const { changeTheme } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.RootReducer.theme;
export default themeSlice;
