import { BREEDS, type BreedItem } from "../constants/breeds";

export const getBreeds = async (): Promise<BreedItem[]> => {
  return BREEDS;
};
