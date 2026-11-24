import { View, Button, Image } from "react-native";
import { useState } from "react";
import * as Clipboard from "expo-clipboard";

export default function App() {
  const [image, setImage] = useState(null);

  const pasteImage = async () => {
    const result = await Clipboard.getImageAsync({
      format: "png",
    });

    console.log(result);

    setImage(result?.data);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Button title="Paste Image" onPress={pasteImage} />

      {image && (
        <Image
          source={{ uri: image }}
          style={{
            height: 200,
            width: 200,
          }}
        />
      )}
    </View>
  );
}