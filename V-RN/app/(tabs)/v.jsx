import { View, Text, Image } from 'react-native';
import React from 'react';

export default function Hellooooo() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={require('./assets/images/photo.png')} // Change the path
        style={{
          width: 200,
          height: 200,
          marginBottom: 20,
        }}
        resizeMode="contain"
      />

      <Text style={{ fontSize: 20, color: 'blue' }}>
        Hellooooo
      </Text>
    </View>
  );
}