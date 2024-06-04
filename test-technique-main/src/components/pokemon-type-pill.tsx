import { StyleSheet, Text, View } from "react-native";
import { PokemonType, pokemonTypeMap } from "../models";
import { Colors } from "../utils";

interface PokemonTypePill {
  type: string;
}

export function PokemonTypePill({ type }: PokemonTypePill) {
  const pokemonType = type?.toUpperCase() as keyof typeof PokemonType;
  const { color } = pokemonTypeMap[pokemonType];

  return (
    <View style={[styles.pill, { backgroundColor: color }]}>
      <Text style={styles.type}>{pokemonType}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    padding: 2,
    borderRadius: 5,
    marginRight: 8,
  },
  type: {
    fontSize: 14,
    fontWeight: 400,
    color: Colors.WHITE,
    textTransform: "capitalize",
  },
});
