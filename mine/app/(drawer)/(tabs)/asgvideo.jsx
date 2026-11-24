
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
//       <CameraView style ={{flex:1}} ref = {videoRef} mode="video"/>
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