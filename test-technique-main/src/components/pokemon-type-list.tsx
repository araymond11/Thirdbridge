import { ActivityIndicator, FlatList } from "react-native";
import { Type } from "../models";
import { PokemonTypePill } from "./pokemon-type-pill";

interface PokemonTypeListProps {
  types: Type[];
  isLoading: boolean;
}

export const PokemonTypeList: React.FunctionComponent<PokemonTypeListProps> = ({
  types,
  isLoading,
}) => {
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
};
