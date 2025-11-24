import { Dica } from "@/src/types";
import { Ionicons } from "@expo/vector-icons";
import { Link, router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../src/constants/Colors";
import api from "../../src/services/api";

export default function Feed() {
  const [dicas, setDicas] = useState<Dica[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");

  const fetchDicas = async () => {
    setLoading(true);
    try {
      const endpoint = busca ? `/dicas?busca=${busca}` : "/dicas";
      const response = await api.get(endpoint);
      setDicas(response.data.content || response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDicas();
    }, [busca])
  );

  const renderItem = ({ item }: { item: Dica }) => (
    <TouchableOpacity
      onPress={() => router.push(`/dica/${item.id}`)}
      style={styles.card}
    >
      <Text style={styles.cardTitle}>{item.titulo}</Text>
      <Text style={styles.cardCategory}>{item.categoria}</Text>
      <Text numberOfLines={2} style={styles.cardDesc}>
        {item.descricao}
      </Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardAuthor}>Por: {item.autor.nome}</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar dicas..."
          value={busca}
          onChangeText={setBusca}
        />
        <Link href="/about" asChild>
          <TouchableOpacity style={{ marginLeft: 10 }}>
            <Ionicons
              name="information-circle-outline"
              size={28}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </Link>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <FlatList
          data={dicas}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhuma dica encontrada.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 15 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  searchBar: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  card: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: Colors.text },
  cardCategory: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: "bold",
    marginBottom: 5,
    textTransform: "uppercase",
  },
  cardDesc: { color: Colors.textLight, marginBottom: 10 },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 10,
  },
  cardAuthor: { fontSize: 12, color: Colors.textLight, fontStyle: "italic" },
  empty: { textAlign: "center", marginTop: 50, color: Colors.textLight },
});
