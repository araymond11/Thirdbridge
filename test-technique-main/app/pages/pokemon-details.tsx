import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { PokemonService } from "../../src/services";
import { useLocalSearchParams } from "expo-router";
import {
  PageContainer,
  PokemonEvolutionList,
  PokemonMoveList,
  PokemonTypeList,
} from "../../src/components";
import { Evolution, EvolutionChainLink } from "../../src/models";
import { capitalizeFirstLetter } from "../../src/utils";

export default function PokemonDetailsPage() {
  const { id } = useLocalSearchParams();
  const pokemonId = Array.isArray(id) ? id.at(0) : id;

  if (!pokemonId) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: No Pokemon ID provided</Text>
      </View>
    );
  }

  const { data: pokemonDetails, isLoading: isLoadingDetails } = useQuery({
    queryKey: ["pokemon-details", pokemonId],
    queryFn: () =>
      PokemonService.getPokemonDetails({
        id: pokemonId as string,
      }),
    enabled: !!pokemonId,
  });

  const { data: pokemonSpecies, isLoading: isLoadingSpecies } = useQuery({
    queryKey: ["pokemon-species", pokemonId],
    queryFn: () =>
      PokemonService.getPokemonSpecies({
        id: pokemonId as string,
      }),
    enabled: !!pokemonId,
  });

  const evolutionChainUrl = pokemonSpecies?.data?.evolution_chain?.url;

  const { data: evolutionChain, isLoading: isLoadingEvolutions } = useQuery({
    queryKey: ["evolution-chain", evolutionChainUrl],
    queryFn: () => fetch(evolutionChainUrl).then((res) => res.json()),
    enabled: !!evolutionChainUrl,
  });

  const getEvolutions = (chain: EvolutionChainLink, currentId: string) => {
    let evolutions: Evolution[] = [];
    let current: EvolutionChainLink | null = chain;

    while (current) {
      const speciesUrlParts = current?.species.url.split("/");
      const speciesId = speciesUrlParts[speciesUrlParts.length - 2];

      if (speciesId !== currentId) {
        evolutions.push({
          id: speciesId,
          name: current?.species.name,
        });
      }

      if (current?.evolves_to.length > 0) {
        current?.evolves_to.forEach((evolution) => {
          evolutions = evolutions.concat(getEvolutions(evolution, currentId));
        });
      }

      current = null;
    }

    return evolutions;
  };

  const evolutions = getEvolutions(evolutionChain?.chain, pokemonId);

  if (!pokemonDetails?.data) {
    return <ActivityIndicator />;
  }
  return (
    <PageContainer
      title={capitalizeFirstLetter(pokemonDetails?.data.name)}
      imageUrl={pokemonDetails.data.sprites.front_default}
    >
      <View style={styles.contentContainerStyle}>
        <PokemonTypeList
          types={pokemonDetails.data.types}
          isLoading={isLoadingDetails}
        />
        <PokemonMoveList
          moves={pokemonDetails.data.moves}
          isLoading={isLoadingDetails}
        />

        <PokemonEvolutionList
          evolutions={evolutions}
          isLoading={isLoadingSpecies || isLoadingEvolutions}
        />
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: 16,
    gap: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
