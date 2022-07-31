import { combineReducers } from "@reduxjs/toolkit";
import locationSlice from "./reducers/locationSlice";
import animalSlice from "./reducers/animalSlice";
import themeSlice from "./reducers/themeSlice";
import breedSlice from "./reducers/breedSlice";

export const RootReducer = combineReducers({
  location: locationSlice.reducer,
  animal: animalSlice.reducer,
  theme: themeSlice.reducer,
  breed: breedSlice.reducer,
});

export type RootState = ReturnType<typeof RootReducer>;
