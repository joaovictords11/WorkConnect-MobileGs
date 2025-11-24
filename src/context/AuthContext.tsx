import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Usuario } from "../types";

interface AuthContextData {
  user: Usuario | null;
  signIn: (userData: Usuario) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem("@WorkConnect:user");
      if (storageUser) {
        setUser(JSON.parse(storageUser));
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = async (userData: Usuario) => {
    setUser(userData);
    await AsyncStorage.setItem("@WorkConnect:user", JSON.stringify(userData));
    router.replace("/(tabs)");
  };

  const signOut = async () => {
    await AsyncStorage.clear();
    setUser(null);
    router.replace("/(auth)/login");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
