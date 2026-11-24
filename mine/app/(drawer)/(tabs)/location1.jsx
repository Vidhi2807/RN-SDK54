// import { View , Button , Text } from "react-native"
// import * as Location from "expo-location";
// import { useState } from "react";

// export default function app (){

//    const [location ,setLocation] = useState(null);
//     const getLocation = async()=>{
//         const permissions = await Location.requestForegroundPermissionsAsync();
//         if(!permissions.granted){
//             console.log("permission denied");
//             return;
//         }

//         const location = await Location.getCurrentPositionAsync();
//         console.log(location);
//     }
//     return(
//         <View style = {{flex : 1 , alignItems : "center" , justifyContent : "center"}}>
//             <Button title = " get current location " onPress={getLocation}/>

//             { location && (
//                 <>
//               <Text> Latitude : {location.latitude}</Text>
//               <Text> longitude : {location.longitude}</Text>
//                 </>
//             )}
//         </View>
//     )
// }










// import { View } from "react-native";
// export default function app1(){

//     const getLocation = async()=>{
        
//     }

//     return(
//         <View>
//             <Button title = "Get Current Location" onPress={getLocation}/>
//         </View>
//     )
// }r