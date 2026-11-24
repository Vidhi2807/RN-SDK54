// import { View , Text , Button } from "react-native";
// import * as Location from "expo-location"
// import { useState } from "react";

// export default function LocationScreen(){

// const [address , setAddress] = useState(null);

// const handleGetAddress = async()=>{
//   const address = await Location.geocodeAsync("bihar")
//   console.log(address)
// }

//     return(
//         <View style = {{flex : 1 , justifyContent : "center" , alignItems : "center" , backgroundColor : "pink"}}>
//             <Text>
//                 React native expo location class
//             </Text>
//             <View style = {{height:20}}/>
//             <Button title = "get address" onPress={handleGetAddress}/>

//         </View>
//     )

// }
//  ///


//  import { View , Text , Button } from "react-native";
// import * as Location from "expo-location"
// import { useState } from "react";

// export default function LocationScreen(){

// const [address , setAddress] = useState(null);

// const handleGetAddress = async()=>{
//     const permission = await Location.requestForegroundPermissionsAsync();
//     if(!permission.granted){
//         alert("permision denied")
//         return;
//     }

//     const currentLocation = await Location.getCurrentPositionAsync()
//     console.log(currentLocation);

//     const getAddress = await Location.reverseGeocodeAsync({
//         latitude:currentLocation.coords.latitude ,
//         longitude:currentLocation.coords.longitude
//     })
//     console.log(getAddress);
//    setAddress (getAddress[0]);
// }

//     return(
//         <View style = {{flex : 1 , justifyContent : "center" , alignItems : "center" , backgroundColor : "pink"}}>
//             <Text>
//                 React native expo location class
//             </Text>
//             <View style = {{height:20}}/>
//             <Button title = "get address" onPress={handleGetAddress}/>
// {address && (
//   <Text>
//     {`City: ${address.city}
// State: ${address.region}
// Country: ${address.country}`}
//   </Text>
// )}
//         </View>
//     )

// }


// //


