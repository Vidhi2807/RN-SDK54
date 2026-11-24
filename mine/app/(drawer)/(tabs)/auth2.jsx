import { View, Text , Button } from 'react-native'
import * as LocalAuth from 'expo-local-authentication'
import React from 'react'

const authentication = () => {
  const check = async() => {
    const res = await LocalAuth.getEnrolledLevelAsync();
    console.log(res);
  }
  return (
    <View>
      <Text>authentication</Text>
      <Button title = "check" onPress={check}/>
    </View>
  )
}

export default authentication;





