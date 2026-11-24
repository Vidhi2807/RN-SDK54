// import {View , Button , Text , TextInput , Alert} from "react-native";
// import * as LocalAuth from "expo-local-authentication"
// import * as SecureStore from "expo-secure-store";
// import {useState} from "react";
// import { router } from "expo-router";

// export default function LocalAuthentication (){
// const [username , setUsername] = useState("");
// const [password , setPassword] = useState("");

//     const handleLogin = async ()=>{
//         if (username === "admin" && password === "12345"){
//             await SecureStore.setItemAsync("token","abc123");
//             await SecureStore.setItemAsync("biometric","true");
//             Alert.alert("success","login succesfull");
//         }else{
//             Alert.alert("Error" , "Invalid username & password");
//         }
//     };

//     const handleBiometric = async()=>{
//         const token = await SecureStore.getItemAsync("token");
//         const biometric = await SecureStore.getItemAsync("biometric");
//         if(!token || biometric !== "true"){
//             Alert.alert("Login required" , "Login with username and password first" );
//             return;
//         }

//       const hasHardware = await LocalAuth.hasHardwareAsync();
//       if(!hasHardware){
//         return;
//       }
//       const isEnrolled = await LocalAuth.isEnrolledAsync();
//       if(!isEnrolled){
//         return;
//       }

//   const res = await LocalAuth.authenticateAsync({
//     promptMessage : "Login with biometric",
//   });

//   if(res.success){
//     router.replace("/");
//   }

//     }

//     return(
//         <View style = {{flex:1,justifyContent:"center" , alignItems :"center" , backgroundColor:"yellow"}}>
//       <Text> Local Authentication</Text>

// <TextInput
// placeholder="Enter username..."
// value={username}
// onChangeText={setUsername}
// style={{
//     borderWidth : 1 ,
//     backgroundColor : "white" ,
//     padding : 8 ,
//     marginBottom :15,
// }}/>

// <TextInput
// placeholder="Enter password..."
// value={password}
// onChangeText={setPassword}
// style={{
//     borderWidth : 1 ,
//     backgroundColor : "white" ,
//     padding : 8 ,
//     marginBottom :15,
// }}/>



//       <Button title = "Auth " onPress={handleLogin}/>
//       <View style ={{height:20}}/>
//          <Button title="Biometric Login" onPress={handleBiometric}/>

//         </View >


//     )
//     };






























//     import {View , Button , Text} from "react-native";
// import * as LocalAuth from "expo-local-authentication"

// export default function LocalAuthentication (){

//     const handleAuth = async()=>{
//         const res = await LocalAuth.hasHardwareAsync();
//         console.log(res);
//     };
//     return(
//         <View>
// <Text> Local Authentication</Text>
// <Button title = "Auth " onPress={handleAuth}/>
//         </View>
//     )
// }














































































































































































































































































