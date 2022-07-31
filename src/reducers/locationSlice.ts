import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../RootReducer";

const initialState = { location: "" };

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    changeLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
  },
});

export const { changeLocation } = locationSlice.actions;
export const selectLocation = (state: RootState) => state;
export default locationSlice;
