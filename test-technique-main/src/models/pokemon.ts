import { PokemonTypeColorPill } from "../utils";

export type Pokemon = {
  name: string;
  url: string;
};

export type Move = {
  move: {
    name: string;
    url: string;
  };
};

export type Type = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type Species = {
  name: string;
  url: string;
};

export type EvolutionChainLink = {
  evolves_to: EvolutionChainLink[];
  species: Species;
};

export type EvolutionChain = {
  id: number;
  chain: EvolutionChainLink;
};

export type Evolution = {
  id: string;
  name: string;
};

export const PokemonType = {
  BUG: "bug",
  DARK: "dark",
  DRAGON: "dragon",
  ELECTRIC: "electric",
  FAIRY: "fairy",
  FIGHTING: "fighting",
  FIRE: "fire",
  FLYING: "flying",
  GHOST: "ghost",
  GRASS: "grass",
  GROUND: "ground",
  ICE: "ice",
  NORMAL: "normal",
  POISON: "poison",
  PSYCHIC: "psychic",
  ROCK: "rock",
  STEEL: "steel",
  WATER: "water",
};

export const pokemonTypeMap: Record<
  keyof typeof PokemonType,
  { color: string }
> = {
  BUG: {
    color: PokemonTypeColorPill.DARK_GREEN,
  },
  DARK: {
    color: PokemonTypeColorPill.BLACK,
  },
  DRAGON: {
    color: PokemonTypeColorPill.TURQUOISE,
  },
  ELECTRIC: {
    color: PokemonTypeColorPill.YELLOW,
  },
  FAIRY: {
    color: PokemonTypeColorPill.DARK_PINK,
  },
  FIGHTING: {
    color: PokemonTypeColorPill.DARK_ORANGE,
  },
  FIRE: {
    color: PokemonTypeColorPill.RED,
  },
  FLYING: {
    color: PokemonTypeColorPill.DARK_TURQUOISE,
  },
  GHOST: {
    color: PokemonTypeColorPill.DARK_PURPLE,
  },
  GRASS: {
    color: PokemonTypeColorPill.GREEN,
  },
  GROUND: {
    color: PokemonTypeColorPill.BRONZE,
  },
  ICE: {
    color: PokemonTypeColorPill.LIGHT_BLUE,
  },
  NORMAL: {
    color: PokemonTypeColorPill.SEPIA_PINK,
  },
  POISON: {
    color: PokemonTypeColorPill.PURPLE,
  },
  PSYCHIC: {
    color: PokemonTypeColorPill.PINK,
  },
  ROCK: {
    color: PokemonTypeColorPill.BROWN,
  },
  STEEL: {
    color: PokemonTypeColorPill.SlATE_GREEN,
  },
  WATER: {
    color: PokemonTypeColorPill.BLUE,
  },
};
