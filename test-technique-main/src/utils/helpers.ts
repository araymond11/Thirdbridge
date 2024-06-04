import { Pokemon } from "../models";

export const extractPokemonId = (pokemon: Pokemon) => {
  const parts = pokemon.url?.split("/");
  return parts[parts.length - 2];
};

export const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
