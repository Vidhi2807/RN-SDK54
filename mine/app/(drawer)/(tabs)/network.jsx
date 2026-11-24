// import { View , Text , Button } from "react-native";
// import React from "react";
// import * as Network from 'expo-network'

// export default function NetworkScreen() {

//     const handleGetNetwork = async () => {
//         const res = await Network.getNetworkStateAsync();

//         console.log(res);
//     }

//     const state = Network.useNetworkState();

//     // on this this handleGetNetwork and state are doing the same thing just one diff is first handle function is static means if i shiftt from wifi to mobile network it will not automaticlly updat we have to update it manually but the second state updates automaticlly and also shows the values on UI

//     const handleIpAddress = async () => {
//         const res = await Network.getIpAddressAsync();

//         console.log(res);
//     }


//     // anand function to check in mine

//     // const getIpAddress = async () => {
//     //     let res = await Network.getIpAddressAsync();
//     //     console.log('Native IP:', res);

//     //     if (res === '0.0.0.0') {
//     //         try {
//     //             const response = await fetch('https://api.ipify.org?format=json');
//     //             const data = await response.json();
//     //             console.log('Public IP:', data.ip);
//     //             res = data.ip;
//     //         } catch (error) {
//     //             console.error('Fallback IP fetch failed', error);
//     //         }
//     //     }
//     //     return res;
//     // };

//     const handleAirplan = async () => {
//         const res = await Network.isAirplaneModeEnabledAsync();

//         console.log(res);
//     };

//     // const handleAddNetworkListener = async () => {
//     //     const res = await Network.addNetworkStateListener();

//     //     console.log(res);
//     // };

//     const allFunction = () => {
//         // handleAddNetworkListener();
//         handleGetNetwork();
//         handleIpAddress();
//         // getIpAddress(); // anand function to check in mine
//         handleAirplan();
//     }

//     return (

//         <View style={{flex:1, backgroundColor:"teal" , alignItems:"center", justifyContent:"center"}}>

//             <Text>Network Class</Text>
            
//             {/* <Button title="Get Network" onPress={handleGetNetwork} /> */}

//             <Text>Type: {state.type}</Text>

//             <Text>Connected: {String(state.isConnected)}</Text>

//             <Text>
//                 Internet Reachable : {String(state.isInternetReachable)}
//             </Text>

//             {/* <Button title="Get Ip Add" onPress={handleIpAddress} />

//             <Button title="Chck Airpalan" onPress={handleAirplan} />

//             <Button title="Add Network Lis" onPress={handleAddNetworkListener} /> */}

//             <Button title="All" onPress={allFunction} /> 

//         </View>

//     )

// }