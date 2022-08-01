/**
 * @jest-environment jsdom
 */
import { test, expect } from "@jest/globals";
import { renderHook } from "@testing-library/react-hooks";
import { Animal } from "../AnimalTypes";
import useBreedList from "../useBreedList";
import fetch from "jest-fetch-mock";

test("should return a empty list of breed", () => {
  const { result } = renderHook(() => useBreedList("" as Animal));
  const [breedList, status] = result.current;
  expect(breedList).toHaveLength(0);
  expect(status).toBe("unloaded");
});

test("gives back breed list with an animal", async () => {
  const breeds = ["One", "Two", "Tree"];
  fetch.mockResponseOnce(
    JSON.stringify({
      animal: "dog",
      breeds,
    })
  );
  const { result, waitForNextUpdate } = renderHook(() => useBreedList("dog"));
  await waitForNextUpdate();
  const [breedList, status] = result.current;
  expect(breedList).toEqual(breeds);
  expect(status).toBe("loaded");
});
