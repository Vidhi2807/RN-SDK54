// import { Button, View, Text } from "react-native";
// import { useState, useRef } from "react";
// import{Paths , File} from "expo-file-system";

// export default function ExpoFileSystem() {

//   const[progress , setProgress] = useState(0);
//   const taskRef = useRef(null);

//   const startDownload = async() => {
//     try{
//       const url = "https://pixabay.com/videos/download/x-203449_medium.mp4";
//       const destination = new File (Paths.document , "sample.mp4");

//       const task = File.createDownloadTask(url ,destination , {
//         onprogress:({bytesWritten,totalBytes})=>{
//           if(totalBytes>0){
//             const percentage = (bytesWritten/totalBytes)*100
//             setProgress(percentage);
//           }
//         }
//       });

//       taskRef.current = task ;
//       const file = await task.downlaodAsync();

//       if (file){
//         setProgress(100)
//         console.log(file.url);
//       }else{
//         console.log("downlaod pause")
//       }

//     }
//     catch(err){
//       console.log(err);
//     }
//   };

//   const pauseDownload = async() => {

//     const task = taskRef.current
//     if(!task || task.state!=="active"){
//       return
//     }
//     try{
//       await task.pauseAsync();

//     }catch(err){
//       console.log(err)
//     }
//   };

//   const resumeDownload = async() => {
//     const task = taskRef.current;
//     if(!task || task.state!=="paused"){
//       return
//     }
//     try{
//       const file = await task.resumeAsync()
//       if(file){
//         setProgress(100)
//         console.log(file.uri)
//       }else{
//         console.log("downlaod paused")
//       }

//     }catch(err){
//     console.log(err)
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", backgroundColor: "pink" }}>
//       <Text> expo system</Text>
//       <Text>{Math.round(progress)}%</Text>
//       <Button title=" start download" onPress={startDownload} />
//       <View style={{ height: 20 }} />
//       <Button title="pause downlaod" onPress={pauseDownload} />
//       <View style={{ height: 20 }} />
//       <Button title=" resume downlaod " onPress={resumeDownload} />
//     </View>
//   );
// }

import { View, Text, Button } from "react-native";
import { useState, useRef } from "react";
import { Paths, File } from "expo-file-system";

export default function ExpoFileSystem() {

  const [progress , setProgress] = useState(0);
  const taskRef = useRef(null);

  const startDownload = async () => {
    try{
const url ="https://pixabay.com/videos/download/x-203449_medium.mp4";
const destination = new File(Paths.document , "v.mp4");

const task = File.createDownloadTask(url,destination,{
  onprogress:({bytesWritten,totalBytes})=>{
    if(totalBytes>0){
      const percentage = (bytesWritten/totalBytes)*100;
      setProgress(percentage);
      
    }
  }

});





    }catch(err){
      console.log(err);
    }
  };

  const pauseDownload = async () => {};

  const resumeDownload = async () => {};

  return (
    <View>
      <Text> expo file system</Text>
      <Button title="" onPress={startDownload} />
      <View style={{ height: 20 }} />
      <Button title="" onPress={pauseDownload} />
      <View style={{ height: 20 }} />

      <Button title="" onPress={resumeDownload} />
    </View>
  );
}
