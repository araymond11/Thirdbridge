import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PokemonCard } from "./pokemon-card";
import { Move } from "../models";

interface PokemonMoveListProps {
  moves: Move[];
  isLoading: boolean;
}

export const PokemonMoveList: React.FunctionComponent<PokemonMoveListProps> = ({
  moves,
  isLoading,
}) => {
  const firstFiveMoves = moves.slice(0, 5);

  return (
    <View>
      <Text style={styles.title}>First 5 moves</Text>
      {isLoading && <ActivityIndicator />}
      {!isLoading && (
        <FlatList
          scrollEnabled={false}
          data={firstFiveMoves}
          renderItem={({ item }) => (
            <PokemonCard item={{ name: item.move.name, url: item.move.url }} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
