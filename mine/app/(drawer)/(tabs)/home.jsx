import React, { useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const Home = () => {
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const token = await SecureStore.getItemAsync("username");

    if (!token) {
      router.replace("/login");
    }
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("username");

    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Home</Text>

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});