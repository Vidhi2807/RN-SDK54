// // // code of add ocntacts to async :

// // import React, { useState } from "react";
// // import { View, Text, TextInput, Button, Alert } from "react-native";
// // import * as Contacts from "expo-contacts";

// // export default function App() {
// //   const [name, setName] = useState("");
// //   const [phone, setPhone] = useState("");
// //   const [email, setEmail] = useState("");

// //   const addContact = async () => {
// //     const permission = await Contacts.requestPermissionsAsync();

// //     if (!permission.granted) {
// //       Alert.alert("Permission denied");
// //       return;
// //     }

// //     const contact = {
// //       [Contacts.Fields.FirstName]: name,
// //       [Contacts.Fields.PhoneNumbers]: [
// //         {
// //           label: "mobile",
// //           number: phone,
// //         },
// //       ],
// //       [Contacts.Fields.Emails]: [
// //         {
// //           label: "work",
// //           email: email,
// //         },
// //       ],
// //     };

// //     await Contacts.addContactAsync(contact);

// //     Alert.alert("Success", "Contact added successfully!");

// //     setName("");
// //     setPhone("");
// //     setEmail("");
// //   };

// //   return (
// //     <View>
// //       <Text>Add New Contact</Text>

// //       <TextInput
// //         placeholder="Enter name"
// //         value={name}
// //         onChangeText={setName}
// //       />

// //       <TextInput
// //         placeholder="Enter phone number"
// //         value={phone}
// //         onChangeText={setPhone}
// //         keyboardType="phone-pad"
// //       />

// //       <TextInput
// //         placeholder="Enter email"
// //         value={email}
// //         onChangeText={setEmail}
// //         keyboardType="email-address"
// //       />

// //       <Button title="Add Contact" onPress={addContact} />
// //     </View>
// //   );
// // } 

// // //


// // import {View , Button} from "react-native";
// // import * as Contacts from "expo-contacts"
// // import { requestPermission } from "react-native-contacts";

// // export default function app(){

// //   const requestPermission = async()=>{
// //     const permission = await Contacts.requestPermissionsAsync();
// //     console.log("permission");
// //   };

// // return(
// //   <View style = {{flex:1 , justifyContent : "center" , alignItems:"center"}}>
  
// //     <Button title ="request conatct permission" onPress={requestPermission}/>
// //   </View>
// // )


// // }





// import {View , Text , Button} from "react-native";
// import * as Contacts from "expo-contacts"


// export default function app(){

// const requestPermission = async()=>{
//   const permission = await Contacts.requestPermissionsAsync()
//     console.log("permission");
  
// }

//   return(
//     <View style = {{flex:1 , justifyContent : "center" , alignItems : "center"}}>
//       <Text>request for contact</Text>
//       <Button title = "request permission for contacts" onPress={requestPermission}/>
//     </View>
//   )
// }






















// import{View , Text , FlatList} from "react-native";
// import { requestPermission } from "react-native-contacts";


// export default function app (){
// const data = [
//   "a",
//     "b",
//   "a",
//   "a",
//   "a",
//   "a",
//   "a",
//   "a",
//   "a",
//       "a",

// ]


//   return(
//     <View>
//       <FlatList
//       data={data}
//       renderItem={({item})=><Text>{item}</Text>}
//       keyExtractor={(item,index)=>index.toString()}
    
      

      
//       />
//     </View>
//   )
// }



