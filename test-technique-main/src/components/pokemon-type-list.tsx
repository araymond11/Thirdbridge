import { ActivityIndicator, FlatList } from "react-native";
import { Type } from "../models";
import { PokemonTypePill } from "./pokemon-type-pill";

interface PokemonTypeListProps {
  types: Type[];
  isLoading: boolean;
}

export function PokemonTypeList({ types, isLoading }: PokemonTypeListProps) {
  return (
    <>
      {isLoading && <ActivityIndicator />}
      {!isLoading && (
        <FlatList
          scrollEnabled={false}
          horizontal
          data={types}
          renderItem={({ item }) => <PokemonTypePill type={item.type.name} />}
        />
      )}
    </>
  );
}
