import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { getLatestGames } from "./lib/metacritic";

export default function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          "https://rickandmortyapi.com/api/character"
        );
        const data = await response.json();
        setCharacters(data.results); // Guardar los personajes en el estado
      } catch (error) {
        console.error("Error al obtener los personajes:", error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style="auto" />
      <ScrollView>
      {characters.map((character) => (
        <View key={character.id} style={styles.card}>
          <Image source={{ uri: character.image }} style={styles.image} />
          <Text style={styles.name}>{character.name}</Text>
        </View>
      ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  name: {
    color: "#fff",
  },
  card: {
    marginBottom: 10
  }
});
