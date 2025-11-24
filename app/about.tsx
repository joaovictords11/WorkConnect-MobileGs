import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../src/constants/Colors";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o App</Text>
      <Text style={styles.info}>Work Connect - Global Solution</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Hash do Commit (Referência):</Text>
        <Text style={styles.hash}>
          88a74dfce61c7a5df8c5a721676fef9df4566381
        </Text>
      </View>

      <Text style={styles.footer}>
        Desenvolvido com Expo Router e Java Spring Boot
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 10,
  },
  info: { fontSize: 18, color: Colors.text, marginBottom: 30 },
  card: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    elevation: 2,
  },
  label: { fontWeight: "bold", marginBottom: 5 },
  hash: {
    fontFamily: "monospace",
    backgroundColor: "#eee",
    padding: 5,
    borderRadius: 4,
  },
  footer: { marginTop: 50, color: Colors.textLight },
});
