import axios from "axios";

const baseUrl = "https://pokeapi.co/api/v2";

class PokemonServiceImpl {
  async getPokemons({
    limit = 20,
    offset = 0,
  }: {
    limit?: number;
    offset?: number;
  }) {
    const response = await axios.get(
      `${baseUrl}/pokemon/?limit=${limit}&offset=${offset}`
    );
    return response.data.results;
  }

  async getPokemonDetails({ id }: { id: string }) {
    const response = await axios.get(`${baseUrl}/pokemon/${id}`);
    return response;
  }

  async getPokemonSpecies({ id }: { id: string }) {
    const response = await axios.get(`${baseUrl}/pokemon-species/${id}`);
    return response;
  }
}

export const PokemonService = new PokemonServiceImpl();
