import { Dica } from "@/src/types";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../src/constants/Colors";
import { useAuth } from "../../src/context/AuthContext";
import api from "../../src/services/api";

export default function DicaDetails() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [dica, setDica] = useState<Dica | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    async function fetchDica() {
      try {
        const response = await api.get("/dicas");
        const lista = response.data.content || response.data;
        const encontrada = lista.find((d: Dica) => d.id === Number(id));
        if (encontrada) {
          setDica(encontrada);
          setTitulo(encontrada.titulo);
          setDescricao(encontrada.descricao);
          setCategoria(encontrada.categoria);
        }
      } catch (e) {
        Alert.alert("Erro ao carregar");
      }
      setLoading(false);
    }
    fetchDica();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await api.put(`/dicas/${id}`, {
        titulo,
        descricao,
        categoria,
        autorId: user?.id,
      });
      Alert.alert("Sucesso", "Dica atualizada");
      router.back();
    } catch (e) {
      Alert.alert("Erro ao atualizar");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/dicas/${id}`);
      router.back();
    } catch (e) {
      Alert.alert("Erro ao excluir");
    }
  };

  if (loading)
    return (
      <ActivityIndicator style={{ marginTop: 50 }} color={Colors.primary} />
    );
  if (!dica)
    return (
      <View style={styles.container}>
        <Text>Dica não encontrada</Text>
      </View>
    );

  const isAuthor = dica.autor.id === user?.id;

  return (
    <View style={styles.container}>
      {editing ? (
        <>
          <Text style={styles.label}>Editar Título</Text>
          <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
          />
          <Text style={styles.label}>Editar Categoria</Text>
          <TextInput
            style={styles.input}
            value={categoria}
            onChangeText={setCategoria}
          />
          <Text style={styles.label}>Editar Descrição</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            multiline
            value={descricao}
            onChangeText={setDescricao}
          />

          <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate}>
            <Text style={styles.btnText}>Salvar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.category}>{dica.categoria}</Text>
          <Text style={styles.title}>{dica.titulo}</Text>
          <Text style={styles.author}>Publicado por: {dica.autor.nome}</Text>
          <Text style={styles.desc}>{dica.descricao}</Text>
        </>
      )}

      {isAuthor && (
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => setEditing(!editing)}
            style={styles.iconBtn}
          >
            <Ionicons
              name={editing ? "close" : "create"}
              size={24}
              color={Colors.primary}
            />
            <Text style={{ color: Colors.primary }}>
              {editing ? "Cancelar" : "Editar"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.iconBtn}>
            <Ionicons name="trash" size={24} color={Colors.danger} />
            <Text style={{ color: Colors.danger }}>Excluir</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: Colors.background },
  category: {
    color: Colors.primary,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.text,
    marginVertical: 10,
  },
  author: { color: Colors.textLight, fontStyle: "italic", marginBottom: 20 },
  desc: { fontSize: 16, lineHeight: 24, color: Colors.text },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 20,
  },
  iconBtn: { alignItems: "center" },
  input: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  label: { fontWeight: "bold", marginTop: 10 },
  saveBtn: {
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: { color: "white", fontWeight: "bold" },
});
