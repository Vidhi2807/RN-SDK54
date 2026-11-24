
// import {
//   View,
//   Text,
//   Button,
//   FlatList,
//   Alert,
//   Image,
//   TextInput,
// } from "react-native";
// import * as Contacts from "expo-contacts";
// import React, { useState } from "react";

// const contact = () => {
//   const [contacts, setContacts] = useState([]);
//   const [text, setText] = useState("");
//   const [search, setSearch] = useState([]);

//   const getContacts = async () => {
//     try {
//       const { status } = await Contacts.requestPermissionsAsync();

//       if (status !== "granted") {
//         Alert.alert("Permission not granted");
//         return;
//       }

//       const { data } = await Contacts.getContactsAsync({
//         fields: [
//           Contacts.Fields.PhoneNumbers,
//           Contacts.Fields.FirstName,
//           Contacts.Fields.Image,
//         ],
//       });

//       setContacts(data);
//     } catch (error) {
//       console.log("Error:", error);
//       Alert.alert("Error", error.message);
//     }
//   };

//   const filterContacts = () => {
//     const filteredData = contacts.filter(
//       (contact) =>
//         contact.firstName
//           ?.toLowerCase()
//           .includes(text.toLowerCase()) ||
//         contact.phoneNumbers?.[0]?.number?.includes(text)
//     );


//     setSearch(filteredData);
//   };
 
//   const toDelete = async (id) => {
//     const updatedContacts = contacts.filter(
//       (contact) => contact.id !== id
//     );

//     setContacts(updatedContacts);
  
// };
//   return (
//     <View style={{ flex: 1, backgroundColor: "teal" }}>
//       <Text>Contact</Text>

//       <Button title="Load Contacts" onPress={getContacts} />

//       <TextInput
//         placeholder="Search"
//         value={text}
//         onChangeText={setText}
//       />

//       <Button title="Search" onPress={filterContacts} />

//       <FlatList 
//         data={contacts}
//         keyExtractor={(item) => item.id}
//         renderItem={({item}) => (
//           <View>
//             <Text>{item.firstName}</Text>
//             <Text>
//               {item.phoneNumbers?.[0]?.number}
//             </Text>
//             {item.imageAvailable && item.image?.uri && (
//               <Image
//                 source={{ uri: item.image.uri }}             
//                 style={{
//                   width: 50,
//                   height: 50,
//                 }}
//               />
//             )}
//             <Button title = "delete" onPress={toDelete(item.id)} style = {{backgroundColor : "black"}}/>
//           </View> )}/>
     
//       <FlatList
//         data={search}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View>
//             <Text>{item.firstName}</Text>

//             <Text>
//               {item.phoneNumbers?.[0]?.number}
//             </Text>
//           </View>
//         )}
//       />

//     </View>
//   );
// };

// export default contact;