import { View, Text, Pressable, TextInput } from "react-native";
import { File, Paths, Directory } from "expo-file-system";
import { useState } from "react";

export default function App() {

  const [name,setName] = useState("");
  const [show,shownData] = useState("");
  const handleFile = async () => {
    console.log(Paths.document.uri);

    // const imagesFolder = new Directory(Paths.document, "images");

    // if (!imagesFolder.exists) {
    //   imagesFolder.create();
    // }

    // console.log("Folder:", imagesFolder.uri);

    // const file = new File(Paths.document, "notes.txt");

    // if (!file.exists) {
    //   file.create();
    // }

    const user = {
      name: "Yashvi",
      class: "lab2",
    };

    const data = JSON.stringify(user);

    File.write(data);

    const parsedData = JSON.parse(data);
    shownData(parsedData);

    // const result = await file.text();

    // console.log("File data:", result);

    // const parsedData = JSON.parse(result);

    // console.log("Parsed data:", parsedData);

    
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

    <TextInput value = {name} placeholder = "Write something" onChangeText={setName}/>
    <Text>Saved Data: {show}</Text>
      <Text>React Native File System</Text>

      <Pressable
        onPress={handleFile}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: "lightblue",
        }}
      >
        <Text>Get File Path</Text>
      </Pressable>
    </View>
  );
}