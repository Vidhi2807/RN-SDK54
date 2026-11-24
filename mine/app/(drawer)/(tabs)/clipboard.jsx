import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as Clipboard from "expo-clipboard";

export default function Copy() {
  const [textToCopy, setTextToCopy] = useState("");
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  // Copy Text
  const copyText = async () => {
    if (textToCopy.trim() === "") return;

    await Clipboard.setStringAsync(textToCopy);
    alert("Copied Successfully!");
  };

  // Paste Text
  const pasteText = async () => {
    const value = await Clipboard.getStringAsync();

    if (value.trim() !== "") {
      setHistory((prev) => [
        {
          id: Date.now().toString(),
          text: value,
          favorite: false,
          time: new Date().toLocaleString(),
        },
        ...prev,
      ]);
    }
  };

  // Delete One
  const deleteItem = (id) => {
    setHistory(history.filter((item) => item.id !== id));
  };

  // Delete All
  const deleteAll = () => {
    setHistory([]);
  };

  // Copy Again
  const copyAgain = async (text) => {
    await Clipboard.setStringAsync(text);
    alert("Copied Again!");
  };

  // Toggle Favourite
  const toggleFavourite = (id) => {
    setHistory(
      history.map((item) =>
        item.id === id
          ? { ...item, favorite: !item.favorite }
          : item
      )
    );
  };

  // Filter Search
  const filteredHistory = history.filter((item) =>
    item.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clipboard Manager</Text>

      <TextInput
        placeholder="Type something..."
        placeholderTextColor="#999"
        value={textToCopy}
        onChangeText={setTextToCopy}
        style={styles.input}
      />

      <View style={styles.row}>
        <Button title="Copy" onPress={copyText} />
        <Button title="Paste" onPress={pasteText} />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button
          title="Delete All"
          color="red"
          onPress={deleteAll}
        />
      </View>

      <TextInput
        placeholder="Search..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />

      <FlatList
        data={filteredHistory}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>No Clipboard History</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item.text}</Text>

            <Text style={styles.time}>{item.time}</Text>

            <View style={styles.buttonRow}>
              <Button
                title="Copy Again"
                onPress={() => copyAgain(item.text)}
              />

              <Button
                title="Delete"
                color="red"
                onPress={() => deleteItem(item.id)}
              />
            </View>

            <TouchableOpacity
              onPress={() => toggleFavourite(item.id)}
            >
              <Text style={styles.star}>
                {item.favorite ? "⭐ Favourite" : "☆ Add Favourite"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 3,
  },

  text: {
    fontSize: 18,
    marginBottom: 8,
  },

  time: {
    color: "gray",
    marginBottom: 10,
    fontSize: 12,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  star: {
    textAlign: "center",
    color: "orange",
    fontSize: 16,
    fontWeight: "bold",
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 18,
    color: "gray",
  },
}); 