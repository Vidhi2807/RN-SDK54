

import { View, Text, Share, Button, TextInput } from 'react-native'
import React, { useState } from 'react'

const share = () => {
  const [data, setData] = useState('')

  const handleShare = async () => {
    await Share.share({ message: 'www.bing.com' })
  }

  const handleShare2 = async () => {
    await Share.share({ message: 'Ciaooooo' })
  }

  const handleMsg = async () => {
    await Share.share({ message: data })
  }

  const handleShareFile = async () => {
    const fileUri = 'file:///storage/emulated/0/Download/example.pdf'

    try {
      await Share.share({
        title: 'Share file',
        message: 'Check this file',
        url: fileUri,
      })
    } catch (error) {
      console.log('Share file error:', error)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'blue', padding: 20 }}>
      <Text>share</Text>
      <Button title="sharing url" onPress={handleShare} />
      <Button title="sharing message" onPress={handleShare2} />

      <TextInput
        placeholder="enter the msg u wanna share"
        value={data}
        onChangeText={setData}
        style={{ backgroundColor: 'white', marginVertical: 10, padding: 10 }}
      />
      <Button title="share msg" onPress={handleMsg} />
      <Button title="share file" onPress={handleShareFile} />
    </View>
  )
}

export default share






