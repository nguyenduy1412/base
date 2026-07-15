export const ONBOARDING_TOTAL_STEPS = 7;

export interface BirthdayItem {
  label: string;
  value: string;
}

export const BIRTHDAYS: BirthdayItem[] = [
  {
    label: "I know the exact date",
    value: "exact-date",
  },
  {
    label: "Just the year",
    value: "just-year",
  },
  {
    label: "I’m not sure",
    value: "not-sure",
  },
];

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
    iconName: "GolderRetriever",
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

export interface SelectOption {
  label: string;
  value: string;
}

export const AGES: SelectOption[] = [
  { label: "Puppy", value: "puppy" },
  { label: "Junior", value: "junior" },
  { label: "Adult", value: "adult" },
  { label: "Mature", value: "mature" },
  { label: "Senior", value: "senior" },
  { label: "Veteran", value: "veteran" },
  { label: "Geriatric", value: "geriatric" },
];

export const SIZES: SelectOption[] = [
  { label: "Tiny", value: "tiny" },
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
  { label: "XL", value: "xl" },
  { label: "Giant", value: "giant" },
];

export const FOOD_TYPES: SelectOption[] = [
  { label: "Dry", value: "dry" },
  { label: "Wet", value: "wet" },
  { label: "Raw", value: "raw" },
  { label: "Mixed", value: "mixed" },
  { label: "Prescription diet", value: "prescription-diet" },
];

export const VIBES: SelectOption[] = [
  { label: "Couch", value: "couch" },
  { label: "Chill", value: "chill" },
  { label: "Active", value: "active" },
  { label: "Athlete", value: "athlete" },
];

export const HOMES: SelectOption[] = [
  { label: "Apartment", value: "apartment" },
  { label: "Yard", value: "yard" },
  { label: "No yard", value: "no-yard" },
  { label: "Other", value: "other" },
];

export const GROOMING_FREQUENCY: SelectOption[] = [
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Every 2 months", value: "every_2_months" },
  { label: "Occasional", value: "occasional" },
];

export const AGES_RANGE: SelectOption[] = [
  { label: "Under 25", value: "under_25" },
  { label: "25-34", value: "25_34" },
  { label: "35-44", value: "35_44" },
  { label: "45-54", value: "45_54" },
  { label: "55+", value: "55_plus" },
];

export const HEAR_ABOUT_US: SelectOption[] = [
  { label: "Dog park", value: "dog_park" },
  { label: "A friend", value: "friend" },
  { label: "Instagram", value: "instagram" },
  { label: "Instagram Ad", value: "instagram_ad" },
  { label: "Facebook", value: "facebook" },
  { label: "Facebook Ad", value: "facebook_ad" },
  { label: "Tiktok", value: "tiktok" },
  { label: "Local Facebook group", value: "local_facebook_group" },
  { label: "Other", value: "other" },
];
