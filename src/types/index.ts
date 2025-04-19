export type Psychologist = {
  avatar_url: string;
  rating: number;
  price_per_hour: number;
  name: string;
  experience: string;
  license: string;
  specialization: string;
  initial_consultation: string;
  about: string;
  reviews: { reviewer: string; rating: number; comment: string }[];
};
