// // import { View, Text,Button } from 'react-native'
// // import * as Network from 'expo-network'
// // import React from 'react'


// // const network = () => {
// //   const check = async()=>{
// //     const res = Network.isAirplaneModeEnabledAsync();
// //     console.log(res);
// //   }
// //   return (
// //     <View>
// //       <Text>network</Text>
// //       <Button title = "check" onPress={check}/>
// //     </View>
// //   )
// // }

// // export default network









// import{useEffect , useState} from "react";
// import{View,Text,Button} from "react-native";
// import * as Network from "expo-netwrok";

// export default function App(){
//     useEffect(()=>{
//         const subscription = Network.addNetworkStateListener((state)=>{
//             console.log("network changed : ",state);
//         });
//         return()=>{
//             subscription.remove();
//         };
// },[]);

//     return(
//         <View style ={{flex:1 , justifyContent : "center" , backgroundColor : "aqua"}}/>
//     )
// }