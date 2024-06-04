import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PokemonCard } from "./pokemon-card";
import { Link } from "expo-router";
import { Evolution } from "../models";

interface PokemonEvolutionListProps {
  evolutions: Evolution[];
  isLoading: boolean;
}

export default function PokemonEvolutionList({
  evolutions,
  isLoading,
}: PokemonEvolutionListProps) {
  return (
    <View>
      <Text style={styles.title}>Evolutions</Text>
      {isLoading && <ActivityIndicator />}
      {!isLoading && evolutions.length !== 0 ? (
        <FlatList
          data={evolutions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: "/pages/pokemon-details",
                params: { id: item.id },
              }}
              asChild
            >
              <TouchableOpacity>
                <PokemonCard
                  item={{
                    name: item?.name,
                    url: `https://pokeapi.co/api/v2/pokemon/${item.id}`,
                  }}
                />
              </TouchableOpacity>
            </Link>
          )}
        />
      ) : (
        <Text>This pokemon has no evolutions</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
