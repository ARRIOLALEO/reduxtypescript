import { useState, useEffect, FunctionComponent } from "react";
import { PetAPIResponse, Pet, Animal } from "./AnimalTypes";
import Results from "./Results";
import useBreedList from "./useBreedList";
import { useAppDispatch, useAppSelector } from "./store";
import { changeLocation } from "./reducers/locationSlice";
import { changeAnimal } from "./reducers/animalSlice";
import { changeTheme } from "./reducers/themeSlice";
import { changeBreed } from "./reducers/breedSlice";
const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams: FunctionComponent = () => {
  //const [location, updateLocation] = useState("");
  const location = useAppSelector(
    (state) => state.RootReducer.location.location
  );
  const animal = useAppSelector((state) => state.RootReducer.animal.animal);
  const theme = useAppSelector((state) => state.RootReducer.theme.theme);
  const breed = useAppSelector((state) => state.RootReducer.breed.breed);
  const dispatch = useAppDispatch();

  const [pets, setPets] = useState([] as Pet[]);
  const [breeds] = useBreedList(animal);

  useEffect(() => {
    void requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = ((await res.json()) as PetAPIResponse) || [];

    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => dispatch(changeLocation(e.target.value))}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              dispatch(changeAnimal(e.target.value as Animal));
              dispatch(changeBreed(""));
            }}
            onBlur={(e) => {
              dispatch(changeAnimal(e.target.value as Animal));
              dispatch(changeBreed(""));
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => dispatch(changeBreed(e.target.value))}
            onBlur={(e) => dispatch(changeBreed(e.target.value))}
          >
            <option />
            {breeds.map((breed: string) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => dispatch(changeTheme(e.target.value))}
            onBlur={(e) => dispatch(changeTheme(e.target.value))}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
