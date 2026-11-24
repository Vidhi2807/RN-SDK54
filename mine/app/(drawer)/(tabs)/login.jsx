import React, { useState } from "react";
import {StyleSheet,Text,View,TextInput,Button,Alert} from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (name === "Vidhi" && password === "vidhi123") {
      await SecureStore.setItemAsync("username", name);

      Alert.alert("Success", "Login Successful!");

      router.replace("/home");
    } else {
      Alert.alert("Error", "Invalid Credentials");
    }
  };

  const handleLoginWithFace = async () => {
    const token = await SecureStore.getItemAsync("username");

    const biometric = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to Login",
    });

    if (token === "Vidhi" && biometric.success) {
      Alert.alert("Success", "Face ID Login Successful!");
      router.replace("/home");
    } else {
      Alert.alert("Error", "Authentication Failed");
    }
    const hasHardware = await LocalAuthentication.hasHardwareAsync();

    if (!hasHardware) {
      Alert.alert("Biometric does not supported on this device");
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if(!isEnrolled) {
      Alert.alert("No Biometrics enrolled on this device");
      return;
    }
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to Login",
      fallbackLabel: "Enter Password",
    })
    if(result.success) {
      router.replace("/home");
    } else {
      Alert.alert("Authentication Failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />

      <View style={{ height: 20 }} />

      <Button
        title="Login with Face ID"
        onPress={handleLoginWithFace}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
});