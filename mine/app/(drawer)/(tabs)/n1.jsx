// // import {
// //   View,
// //   Text,
// //   Button,
// //   TextInput,
// //   StyleSheet,
// // } from "react-native";

// // import * as Notifications from "expo-notifications";
// // import { useState } from "react";

// // Notifications.setNotificationHandler({
// //   handleNotification: async () => ({
// //     shouldShowBanner: true,
// //     shouldShowList: true,
// //     shouldPlaySound: true,
// //     shouldSetBadge: true,
// //   }),
// // });

// // export default function NotificationScreen() {

// //   const [message, setMessage] = useState("");
// //   const [seconds, setSeconds] = useState(" ");
// //   const [status, setStatus] = useState("");

// //   const handleNoti = async () => {

// //     const permission =
// //       await Notifications.requestPermissionsAsync();

// //     if (!permission.granted) {
// //       setStatus("Notification permission denied");
// //       return;
// //     }

// //     if (message.trim() === "") {
// //       setStatus("Please enter a message");
// //       return;
// //     }

// //     await Notifications.scheduleNotificationAsync({
// //       content: {
// //         title: "Hello Sirr 😎",
// //         body: message,
// //       },

// //       trigger: {
// //         type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
// //         seconds: Number(seconds),
// //       },
// //     });

// //     setStatus(`Notification scheduled after ${seconds} seconds`);
// //   };

// //   return (
// //     <View style={styles.container}>

// //       <Text style={styles.heading}>
// //         Notiiii
// //       </Text>

// //       <TextInput
// //         placeholder="Enter notification message"
// //         value={message}
// //         onChangeText={setMessage}
// //         style={styles.input}
// //       />

// //       <TextInput
// //         placeholder="Enter seconds"
// //         value={seconds}
// //         onChangeText={setSeconds}
// //         keyboardType="numeric"
// //         style={styles.input}
// //       />

// //       <Button
// //         title="Send Notification"
// //         onPress={handleNoti}
// //       />

// //       <Text style={styles.status}>
// //         {status}
// //       </Text>

// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: "pink",
// //     padding: 20,
// //   },

// //   heading: {
// //     fontSize: 25,
// //     marginBottom: 20,
// //   },

// //   input: {
// //     width: "90%",
// //     borderWidth: 1,
// //     borderColor: "gray",
// //     backgroundColor: "white",
// //     padding: 12,
// //     marginBottom: 15,
// //     borderRadius: 8,
// //   },

// //   status: {
// //     marginTop: 20,
// //     fontSize: 16,
// //   },
// // });

// // import{View , Button , Text} from "react-native"
// // import * as Notifications from "expo-notifications"

// // Notifications.setNotificationHandler({
// //   handleNotification : async()=>({
// //     shouldPlaySound : true,
// //     shouldShowList : true ,
// //     shouldSetBadge : true ,
// //     shouldShowBanner : true ,
// //   })

// // })

// // export default function notify(){

// //   const handleNotifications = async()=>{
// //     const permission = await Notifications.requestPermissionsAsync();
// //     if(!permission.granted){
// //       return;
// //     }

// //     await Notifications.scheduleNotificationAsync({
// //       content :{
// //         title : "hello",
// //         body : "hii",
// //       },
// //       trigger : null ,
// //     })

// //   }
// //   return(
// //     <View>
// //       <Text>Notificationsss</Text>

// //       <Button title="notii" onPress={handleNotifications}/>
// //       <Button title="second notii" onPress={handleSecond}/>
// //       <Button title="cancel notiii" onPress={cancelAll}> </Button>
// //     </View>
// //   )
// // }

// import{View , Button , text} from "react-native"
// import {useState} from "react"
// import * as Notifications from "expo-notifications"

// function NotificationScreen() {
//   const [notiID , SetNotiID] useState(null);
//   const handleNotii = async()=>{
//     const permission = await Notifications.requestPermissionsAsync();
//     if(!permission.granted){
//       console.log()
//     }

//   }

//   return(
//     <View>
//       <Text>Notification</Text>
//       <Button title="notii" onPress={handelNotii}/>
//       <Button title = "second time" onPress={handleSecond}/>
//       <Button title = "cancel notii" onPress={cancelAll}/>
//     </View>
//   )

// }

// export default NotificationScreen;
