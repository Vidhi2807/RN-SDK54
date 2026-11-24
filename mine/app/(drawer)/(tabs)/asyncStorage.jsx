import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AsyncStorageScreen = () => {
  const [name, setName] = useState("");
  const [savedData, setSavedData] = useState([]);

  const handleSaveData = async () => {
    const data = JSON.parse(await AsyncStorage.getItem("username")) || [];
    data.push(name);
    await AsyncStorage.setItem("username", JSON.stringify(data));
    setName("");
    alert("Data Saved");
  };

  const handleGetData = async () => {
    const data = JSON.parse(await AsyncStorage.getItem("username")) || [];
    setSavedData(data);
  };

  const handleClearData = async () => {
    await AsyncStorage.removeItem("username");
    setSavedData([]);
    alert("Data Cleared");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Write something..."
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Button title="Save Data" onPress={handleSaveData} />
      <View style={{ height: 10 }} />

      <Button title="Get Data" onPress={handleGetData} />
      <View style={{ height: 10 }} />

      <Button title="Clear Data" onPress={handleClearData} />

      {savedData.map((item, index) => (
        <Text key={index} style={styles.text}>
          {index + 1}. {item}
        </Text>
      ))}
    </View>
  );
};

export default AsyncStorageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    marginTop: 10,
  },
});