import { BreedItem, BREEDS } from "../constants/onboarding";

export const getBreeds = async (): Promise<BreedItem[]> => {
  return BREEDS;
};
