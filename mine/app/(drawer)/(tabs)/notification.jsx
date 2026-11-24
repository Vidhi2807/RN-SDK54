// // simple notifictaion :::::::::::::::::::::


// // import {View,Text, Button } from 'react-native';
// // import * as Notifications from 'expo-notifications';


// // Notifications.setNotificationHandler({
// //   handleNotification: async () => ({
// //     shouldShowBanner : true,
// //     shouldShowList: true,
// //     shouldShowSound: true,
// //     shouldSHowBadge: true,
// //   }),
// // });


// // export default function NotificationScreen() {
// //   const handleNotification = async() => {
// //     const permission = await Notifications.requestPermissionsAsync();
// //     if(!permission.granted){
// //       return;
// //     }
// //     await Notifications.scheduleNotificationAsync({
// //       content: {
// //         title:" Oyee chloo ",
// //         body: "bunk kre class ?",
// //       },
// //       trigger: null,
// //     });


// //   };
// //   return(
// //     <View style={{marginTop: 250, padding: 50, backgroundColor: 'yellow', borderRadius: 1 }}>
// //       <Text >Notification class</Text>

// //       <Button title="get notification" onPress={handleNotification} />
// //     </View>
// //   ) 

// // }


// // with timmeee :::::::::::

// import React, { useState } from 'react';
// import { View, Text, Button } from 'react-native';
// import * as Notifications from 'expo-notifications';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldPlaySound: true,
//     shouldShowBanner: true,
//     shouldShowList: true,
//     shouldSetBadge: true,
//   }),
// });

// function NotificationScreen() {
//   const [notificationId, setNotificationId] = useState(null);

//   const handleNotification = async () => {
//     const permission = await Notifications.requestPermissionsAsync();

//     if (permission.status !== 'granted') {
//       alert('Notification permission denied');
//       return;
//     }

//     const id = await Notifications.scheduleNotificationAsync({
//       content: {
//         title: 'Hello This is Reminder',
//         body: 'Native Notification class',
//       },
//       trigger: {
//         type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
//         seconds: 5,
//         repeats:true
//       },
//     });

//     setNotificationId(id);
//     console.log('Notification ID:', id);
//   };
//   const handleSecond=async()=>{
//         await Notifications.scheduleNotificationAsync({
//             content:{
//                 title:"This is the second notification",
//                 body:"Practicing to add multiple notifications"
//             },
//             trigger:{
//                 type:Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
//                 seconds:2,
//                 repeats:true
//             }
//         })
//   }

//   const cancelNotification = async () => {
//     console.log(notificationId);
//     if (notificationId) {
//       await Notifications.cancelScheduledNotificationAsync(notificationId);
//       console.log('Notification cancelled');
//     }
//   };
//   const cancelAll = async()=>{
//     await Notifications.cancelAllScheduledNotificationsAsync();
//     console.log("All the notifications canceled");
//   }

//   return (
//     <View
//       style={{
//         backgroundColor: '#fff',
//         justifyContent: 'center',
//         alignItems: 'center',
//         flex: 1,
//       }}
//     >
//       <Text>Notifications</Text>

//       <Button
//         title="Get Notification"
//         onPress={handleNotification}
//       />
//       <Button title="second notification" onPress={handleSecond}></Button>

//       <Button
//         title="Cancel Notification"
//         onPress={cancelNotification}
//       />
//       <Button title="Cancel All the notifications" onPress={cancelAll}></Button>
//     </View>
//   );
// }

// export default NotificationScreen;


































