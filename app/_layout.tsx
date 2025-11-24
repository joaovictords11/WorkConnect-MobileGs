import { Stack } from "expo-router";
import { AuthProvider } from "../src/context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="dica/[id]"
          options={{ presentation: "modal", title: "Detalhes" }}
        />
        <Stack.Screen
          name="about"
          options={{ title: "Sobre o App", headerShown: true }}
        />
      </Stack>
    </AuthProvider>
  );
}
