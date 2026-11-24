// import { View, Text, Button, FlatList, Image, Alert, TextInput } from "react-native";

// import * as Contacts from "expo-contacts";
// import { useState } from "react";

// export default function ContactScreen() {
//   const [contacts, setContacts] = useState([]);

//   // Add Contact states
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");

//   // Get Contacts
//   const getContacts = async () => {
//     const permission = await Contacts.requestPermissionsAsync();

//     if (!permission.granted) {
//       Alert.alert("Permission Denied", "Contact permission is required.");

//       return;
//     }

//     const { data } = await Contacts.getContactsAsync({
//       fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
//     });

//     setContacts(data);
//   };

//   // Add Contact
//   const addContact = async () => {
//     const permission = await Contacts.requestPermissionsAsync();

//     if (!permission.granted) {
//       Alert.alert("Permission denied");
//       return;
//     }

//     const contact = {
//       [Contacts.Fields.FirstName]: name,
//       [Contacts.Fields.PhoneNumbers]: [
//         {
//           label: "mobile",
//           number: phone,
//         },
//       ],
//       [Contacts.Fields.Emails]: [
//         {
//           label: "work",
//           email: email,
//         },
//       ],
//     };

//     try {
//       await Contacts.addContactAsync(contact);

//       Alert.alert("Success", "Contact added successfully!");

//       setName("");
//       setPhone("");
//       setEmail("");

//       // Refresh contacts after adding
//       getContacts();
//     } catch (error) {
//       Alert.alert("Error", "Failed to add contact");
//     }
//   };

//   const handleDelete = (item) => {
//     Alert.alert(
//       "Delete contact",
//       `are you sure that you want to delete this contact ${item.name}?`,
//       [
//         { text: "cancel", style: "cancel" },
//         {
//           text: "delete",
//           style: "destructive",
//           onPress: async () => {
//             await Contacts.removeContactAsync(item.id);
//             setContacts((prev) =>
//               prev.filter((ele) => ele.id !== item.id)
//             );
//           },
//         },
//       ]
//     );
//   };

//   // Render Contact
//   const renderContact = ({ item }) => {
//     const phone = item.phoneNumbers?.[0]?.number || "No Phone Number";

//     const firstLetter = item.name?.charAt(0)?.toUpperCase() || "?";

//     return (
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           padding: 15,
//           marginBottom: 10,
//           borderWidth: 1,
//           borderColor: "#ddd",
//           borderRadius: 12,
//           backgroundColor: "white",
//         }}
//       >
//         {/* Contact Image / Avatar */}

//         {item.imageAvailable && item.image?.uri ? (
//           <Image
//             source={{ uri: item.image.uri }}
//             style={{
//               width: 60,
//               height: 60,
//               borderRadius: 30,
//             }}
//           />
//         ) : (
//           <View
//             style={{
//               width: 60,
//               height: 60,
//               borderRadius: 30,
//               backgroundColor: "#4F46E5",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 26,
//                 fontWeight: "bold",
//                 color: "white",
//               }}
//             >
//               {firstLetter}
//             </Text>
//           </View>
//         )}

//         {/* Contact Information */}

//         <View
//           style={{
//             flex: 1,
//             marginLeft: 15,
//           }}
//         >
//           {/* Name */}

//           <Text
//             style={{
//               fontSize: 18,
//               fontWeight: "bold",
//               color: "#222",
//             }}
//             numberOfLines={1}
//           >
//             {item.name || "Unknown Name"}
//           </Text>

//           {/* Phone */}

//           <Text
//             style={{
//               marginTop: 6,
//               fontSize: 14,
//               color: "#666",
//             }}
//           >
//             {phone}
//           </Text>
//         </View>

//         {/* Delete Button */}

//         <Button
//           title="Delete"
//           color="red"
//           onPress={() => handleDelete(item)}
//         />
//       </View>
//     );
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//         padding: 20,
//         paddingTop: 60,
//       }}
//     >
//       <Button title="Get Contacts" onPress={getContacts} />

//       {/* Add New Contact */}

//       <Text style={{ marginTop: 20, fontSize: 20 }}>
//         Add New Contact
//       </Text>

//       <TextInput
//         placeholder="Enter name"
//         value={name}
//         onChangeText={setName}
//         style={{
//           borderWidth: 1,
//           borderColor: "#ccc",
//           padding: 10,
//           marginTop: 10,
//         }}
//       />

//       <TextInput
//         placeholder="Enter phone number"
//         value={phone}
//         onChangeText={setPhone}
//         keyboardType="phone-pad"
//         style={{
//           borderWidth: 1,
//           borderColor: "#ccc",
//           padding: 10,
//           marginTop: 10,
//         }}
//       />

//       <TextInput
//         placeholder="Enter email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         style={{
//           borderWidth: 1,
//           borderColor: "#ccc",
//           padding: 10,
//           marginTop: 10,
//         }}
//       />

//       <Button
//         title="Add Contact"
//         onPress={addContact}
//       />

//       <FlatList
//         data={contacts}
//         keyExtractor={(item) => item.id}
//         renderItem={renderContact}
//         contentContainerStyle={{
//           marginTop: 20,
//         }}
//       />
//     </View>
//   );
// }

