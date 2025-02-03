import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Main() {
  const [characters, setCharacters] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        const data = await response.json();
        setCharacters(data.results);
      } catch (error) {
        console.error("Error al obtener los personajes:", error);
      }
    };

    fetchCharacters();
  }, []);

  // Función para determinar el color de la bolita
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "#4CAF50"; // Verde
      case "dead":
        return "#F44336"; // Rojo
      default:
        return "#FFFFFF"; // Blanco para unknown
    }
  };

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {characters.map((character) => (
          <View key={character.id} style={styles.card}>
            <Image source={{ uri: character.image }} style={styles.image} />
            <Text style={styles.name}>{character.name}</Text>
            <Text style={styles.species}>{character.species}</Text>
            
            <View style={styles.statusContainer}>
              <View
                style={[styles.statusIndicator, { backgroundColor: getStatusColor(character.status) }]}
              />
              <Text style={styles.statusText}>{character.status}</Text>
            </View>

          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  card: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  species: {
    color: "#9E9E9E",
    fontSize: 16,
    marginBottom: 3,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#000",
  },
  statusText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
