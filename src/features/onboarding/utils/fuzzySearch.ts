import type { BreedItem } from "../constants/breeds";

export interface HighlightSegment {
  char: string;
  isMatched: boolean;
}

export type BreedSearchResult = BreedItem & {
  matchedIndices: number[];
  score: number;
};

const normalizeSearchText = (value: string) => {
  return value.trim().toLowerCase();
};

export const fuzzySubsequenceMatch = (
  text: string,
  query: string,
): number[] | null => {
  const normalizedText = text.toLowerCase();
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return [];
  }

  const matchedIndices: number[] = [];
  let searchFromIndex = 0;

  for (const char of normalizedQuery) {
    const foundIndex = normalizedText.indexOf(char, searchFromIndex);

    if (foundIndex === -1) {
      return null;
    }

    matchedIndices.push(foundIndex);
    searchFromIndex = foundIndex + 1;
  }

  return matchedIndices;
};

export const getHighlightSegments = (
  text: string,
  matchedIndices: number[],
): HighlightSegment[] => {
  const matchedIndexSet = new Set(matchedIndices);

  return text.split("").map((char, index) => ({
    char,
    isMatched: matchedIndexSet.has(index),
  }));
};

const getFuzzyScore = (matchedIndices: number[], textLength: number) => {
  if (!matchedIndices.length) {
    return 0;
  }

  const firstIndex = matchedIndices[0];
  const lastIndex = matchedIndices[matchedIndices.length - 1];
  const matchSpread = lastIndex - firstIndex;

  return firstIndex * 2 + matchSpread + textLength * 0.01;
};

export const searchBreedResults = (
  breeds: BreedItem[],
  query: string,
): BreedSearchResult[] => {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return breeds.map((breed) => ({
      ...breed,
      matchedIndices: [],
      score: 0,
    }));
  }

  return breeds
    .reduce<BreedSearchResult[]>((results, breed) => {
      const matchedIndices = fuzzySubsequenceMatch(breed.label, normalizedQuery);

      if (!matchedIndices) {
        return results;
      }

      results.push({
        ...breed,
        matchedIndices,
        score: getFuzzyScore(matchedIndices, breed.label.length),
      });

      return results;
    }, [])
    .sort((a, b) => a.score - b.score || a.label.localeCompare(b.label));
};
