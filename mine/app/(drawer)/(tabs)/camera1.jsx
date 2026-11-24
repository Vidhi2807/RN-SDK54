// import { View, Text , Button, Image } from 'react-native'
// import { useCameraPermissions , CameraView} from 'expo-camera'
// import React from 'react'
// import { useRef , useState } from 'react'
// import Slider from '@react-native-community/slider'

// const Assigncam = () => {
// const [Permission , requestPermission] = useCameraPermissions();
// const [facing , setfacing] = useState("back");
// const cameraRef = useRef(null);
// const [zoom , setZoom] = useState(0);
// const [flash , setflash] = useState("off");
// const [photo , setPhoto] = useState(null);

// const handlePicture = async() => {
//     const result = await cameraRef.current.takePictureAsync();
//     console.log(result);
//     setPhoto(result.uri);
// }



// if(!Permission?.granted){
//     return (
//         <View>
//             <Text>Grant Camera Permission</Text>
//             <Button title = "Grant Permission" onPress={requestPermission}/>
//         </View>
//     )
// }

//   return (
//     <View style = {{flex : 1}}>
//       <Text>assigncam</Text>
//       <CameraView ref = {cameraRef} facing = {facing } flash ={flash} zoom = {zoom} style = {{flex : 1}}/>
//       <Button title = "flip camera" onPress={() => {setfacing(facing === "back" ? "front" : "back")}}/>
//         <Button title = "Flash" onPress={() => {setflash(flash === "off" ? "on" : "off")}}/>
// <Slider minimumValue={0} maximumValue={1} value={zoom} onValueChange={(value) => setZoom(value)}/>

// <Button title = "Click Picture" onPress={handlePicture}/>
// {
//     photo
//      && 
//     (<Image source = {{uri : photo }}  style = {{height : 200 , width : 200}}/>)
// }



//     </View>
//   )
// }

// export default Assigncam







// import { CameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera";
// import { VideoView, useVideoPlayer } from "expo-video";
// import { useRef, useState } from "react";
// import { Button, View } from "react-native";

// export default function CameraScreen(){

//   const videoRef = useRef(null);
//   const[video , setVideo] = useState(null);
//   const[cameraPermission , requestCameraPermission] = useCameraPermissions();
//   const [audioPermission , requestAudioPermission] = useMicrophonePermissions();

// const player = useVideoPlayer(video);

// if(!cameraPermission || !audioPermission){
//   return(
//     <View/>
//   )
// }

// if(!cameraPermission.granted || !audioPermission.granted){
//   return(
//     <View>
//       <Button title = "permission granted for camera " onPress ={requestCameraPermission} />
//      <View style = {{height:20}}/>
//      <Button title = "permission granted for audio " onPress ={requestAudioPermission}/>
//     </View>
//   )
// }

// const handleStartRecording = async()=>{
//   const result = await videoRef.current.recordAsync();
//   console.log(result);
//   setVideo(result.uri);
// };

// const handleStopRecording = async()=>{
//   await videoRef.current.stopRecording();
// };


//   return(
//     <View Style={{flex:1}} >
//       <CameraView style={{flex:1}} ref = {videoRef} mode="video"/>
//       <Button title = "start recording " onPress = {handleStartRecording}/>

//       <View style = {{height : 20}}/>

//       <Button title = "stop recording " onPress = {handleStopRecording}/>

//   {
//     video && (
//       <VideoView player={player} style = {{height: 300 , width : "100%" }}/>
//     )
//   }

//     </View>
//   );
// }