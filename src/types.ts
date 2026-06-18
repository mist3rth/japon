export interface Fact {
  label: string;
  value: string;
}

export interface Attraction {
  name: string;
  desc: string;
  image: string;
}

export interface Destination {
  id: string;
  title: string;
  cityLabel: string;
  subtitle: string;
  tagline: string;
  image: string;
  color: string;
  bgGlow: string; // Tailwinds background gradient for the sun
  borderGlow: string; // Border color for active elements
  facts: Fact[];
  attractions: Attraction[];
  quickDescription: string;
  gradientText: string; // inline classes for text gradient e.g., "bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent"
  gradientBg: string;   // Tailwind classes for background gradient, e.g., "from-pink-500 via-rose-500 to-red-500"
  thumbnail: string;
}
