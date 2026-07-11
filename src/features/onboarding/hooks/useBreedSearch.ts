import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";

import { getBreeds } from "../api/breed.api";
import { searchBreedResults } from "../utils/fuzzySearch";

const BREED_SEARCH_DEBOUNCE_MS = 250;

export const useBreedSearch = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, BREED_SEARCH_DEBOUNCE_MS);

  const {
    data: breeds = [],
    isError,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["onboarding", "breeds"],
    queryFn: getBreeds,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const results = useMemo(() => {
    return searchBreedResults(breeds, debouncedQuery);
  }, [breeds, debouncedQuery]);

  return {
    query,
    setQuery,
    breeds: results,
    isError,
    isFetching,
    isLoading,
  };
};
