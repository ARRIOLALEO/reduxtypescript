import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../RootReducer";
import { Animal } from "../AnimalTypes";
const initialState = {
  animal: "" as Animal,
};

const animalSlice = createSlice({
  name: "animal",
  initialState,
  reducers: {
    changeAnimal: (state, action: PayloadAction<Animal>) => {
      state.animal = action.payload;
    },
  },
});

export const { changeAnimal } = animalSlice.actions;
export const selectAnimal = (state: RootState) => state.animal;
export default animalSlice;
