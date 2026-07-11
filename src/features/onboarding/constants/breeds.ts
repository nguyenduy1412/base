export interface BreedItem {
  label: string;
  value: string;
  iconName: string;
}

export const BREEDS: BreedItem[] = [
  {
    label: "Labrador Retriever",
    value: "labrador-retriever",
    iconName: "LabradorRetriever",
  },
  {
    label: "Golden Retriever",
    value: "golden-retriever",
    iconName: "GoldenRetriever",
  },
  {
    label: "German Shepherd",
    value: "german-shepherd",
    iconName: "GermanShepherd",
  },
  {
    label: "Alaskan Malamute",
    value: "alaskan-malamute",
    iconName: "AlaskanMalamute",
  },
  {
    label: "Samoyed",
    value: "samoyed",
    iconName: "Samoyed",
  },
];
