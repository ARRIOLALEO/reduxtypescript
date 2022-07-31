import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  breed: "",
};
const breedSlice = createSlice({
  name: "breed",
  initialState,
  reducers: {
    changeBreed: (state, action: PayloadAction<string>) => {
      state.breed = action.payload;
    },
  },
});

export const { changeBreed } = breedSlice.actions;
export const selectBreed = (state: RootState) => state.RootReducer.breed;

export default breedSlice;
