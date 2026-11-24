// import { View, Text , Button} from 'react-native'
// import * as imagePicker from 'expo-image-picker'
// import * as Sharing from 'expo-sharing'
// import React from 'react'

// const share3 = () => {
//     const shareImage = async() =>{

    
//         const result = await imagePicker.launchImageLibraryAsync({
//             mediaTypes : ["images"],
//             allowsEditing : false,
//             quality : 1
//         })
//         if(result.canceled){
//             return;
//         }
//         const available = await Sharing.isAvailableAsync();
//         if(!available){
//             console.log("sharing not available");
//             return;
//         }
//         const Imageuri = await result.assets[0].uri;
        
//         await Sharing.shareAsync(Imageuri)

//     }
//   return (
//     <View>
//       <Text>share3</Text>
//       <Button title = "sharing image" onPress = {shareImage}/>
//     </View>
//   )
// }

// export default share3


































