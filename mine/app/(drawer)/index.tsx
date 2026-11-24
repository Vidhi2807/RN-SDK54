import { View, Text, Image } from 'react-native';
import React from 'react';

export default function Hellooooo() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >

 <Image  style={{
   width: 130,
    height: 130,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffffff",
    marginBottom: 20,
 }}
          source={require("../../assets/images/DHV.png")}
        />

      <Text style={{ fontSize: 20, color: 'white' }}>
      HEHE
    
</Text>
     

    </View>
  );
}