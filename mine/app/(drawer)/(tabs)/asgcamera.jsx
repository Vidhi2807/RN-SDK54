// import { View, Text , Button, Image } from 'react-native'
// import { useRef , useState } from 'react'
// import { useCameraPermissions , CameraView} from 'expo-camera'
// import React from 'react'
// import Slider from '@react-native-community/slider'

// const CameraScreen = () => {
//     const cameraRef = useRef(null);

// const [facing , setfacing] = useState("back");
// const [flash , setflash] = useState("off");
// const [photo , setPhoto] = useState(null);
// const [torch , setTorch] = useState(false)

// const handlePicture = async() => {
//     const result = await cameraRef.current.takePictureAsync();
//     console.log(result);
//     setPhoto(result.uri);
// }


// const [Permission , requestPermission] = useCameraPermissions();
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
//       <Text>camera screen full</Text>
//       <CameraView ref = {cameraRef} 
//       facing = {facing }
//        flash ={flash}
//         torch = {torch}
//          style = {{flex : 1}}/>
//       <Button title = "flip camera" onPress={() => {setfacing(facing === "back" ? "front" : "back")}}/>
//         <Button title = "Flash" onPress={() => {setflash(flash === "off" ? "on" : "off")}}/>
//             <Button title = "torch" onPress={()=>{setTorch(torch === false ? true:false)}}/>
// <Slider minimumValue={0} 
// maximumValue={1} 
// value={zoom} 
// onValueChange={(value) => setZoom(value)}
// />

// <Button title = "Click Picture" onPress={handlePicture}/>
// {
//     photo
//      && 
//     (<Image source = {{uri : photo }}  style = {{height : 200 , width : 200}}/>)
// }


//     </View>
//   )
// }

// export default CameraScreen




// import { View, Text,Button, StyleSheet,Image,TextInput,ScrollView,} from "react-native";
// import { CameraView,useCameraPermissions,} from "expo-camera";
// import * as Location from "expo-location";
// import { useEffect, useRef, useState } from "react";


// export default function App() {

//     const cameraRef = useRef(null);
//     const [cameraPermission, requestCameraPermission] = useCameraPermissions();
//     const [camera, setCamera] = useState("back");
//     const [flash, setFlash] = useState("off");
//     const [photo, setPhoto] = useState(null);
//     const [video, setVideo] = useState(null);
//     const [recording, setRecording] = useState(false);
    

//     const [location, setLocation] = useState(null);
//     const [lastLocation, setLastLocation] =    useState(null);
//     const [address, setAddress] = useState("");
//     const [heading, setHeading] = useState(null);
//     const [tracking, setTracking] = useState(false);
//     const [locationPermission, setLocationPermission] = useState(false);
//     const [search, setSearch] = useState("");
//     const [searchedLocation, setSearchedLocation] =
//         useState(null);

//     const [distance, setDistance] = useState(null);
//     const [screen, setScreen] = useState("home");

//     const askCameraPermission = async () => {
//         const result =
//             await requestCameraPermission();
//         if (!result.granted) {
//             alert("Camera permission denied");
//         }
//     };

//     const askLocationPermission = async () => {
//         const result =
//             await Location.requestForegroundPermissionsAsync();
//         if (result.granted) {
//             setLocationPermission(true);
//         } else {
//             alert("Location permission denied");
//         }
//     };

//     const getLocation = async () => {
//         if (!locationPermission) {
//             await askLocationPermission();
//             return;
//         }
//         const result =  await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High, });

//         setLocation(result);

//         const places =await Location.reverseGeocodeAsync({
//                 latitude:
//                     result.coords.latitude,
//                 longitude:
//                     result.coords.longitude
//             });
//         if (places.length > 0) {
//             const place = places[0];
//             const fullAddress =
//                 `${place.name || ""} ${place.street || ""
//                 } ${place.city || ""} ${place.region || ""
//                 } ${place.country || ""}`;
//             setAddress(fullAddress);
//         }

//     };

//     const getLastLocation = async () => {
//       const result = await Location.getLastKnownPositionAsync();
//         if (result) {
//             setLastLocation(result);
//         } else {
//             alert("No last location available");
//         }
//     };

//     const startTracking = async () => {
//         if (!locationPermission) {
//             await askLocationPermission();
//             return;

//         }

//         setTracking(true);

//         Location.watchPositionAsync(

//             {
//                 accuracy:
//                     Location.Accuracy.High,

//                 distanceInterval: 10,

//             },

//             (newLocation) => {

//                 setLocation(newLocation);

//             }

//         );

//     };



//     const stopTracking = () => {
//         setTracking(false);

//     };
//     const takePhoto = async () => {

//         if (cameraRef.current) {

//             const result =
//                 await cameraRef.current.takePictureAsync();

//             setPhoto(result.uri);

//         }

//     };


//     // CAMERA - START VIDEO

//     const startVideo = async () => {

//         if (cameraRef.current) {

//             setRecording(true);

//             const result =
//                 await cameraRef.current.recordAsync();

//             if (result) {

//                 setVideo(result.uri);

//             }

//             setRecording(false);

//         }

//     };

// }
//     // CAMERA - STOP VIDEO

//     const stopVideo = () => {

//         if (cameraRef.current) {

//             cameraRef.current.stopRecording();

//             setRecording(false);

//         }

//     };


//     // SWITCH CAMERA

//     const changeCamera = () => {

//         if (camera === "back") {

//             setCamera("front");

//         } else {

//             setCamera("back");

//         }

//     };


//     // CHANGE FLASH

//     const changeFlash = () => {

//         if (flash === "off") {

//             setFlash("on");

//         } else if (flash === "on") {

//             setFlash("auto");

//         } else {

//             setFlash("off");

//         }

//     };

//     const searchLocation = async () => {
//         if (search === "") {
//             alert("Enter an address");
//             return;
//         }
//         const result =
//             await Location.geocodeAsync(search);

//         if (result.length > 0) {
//             setSearchedLocation(result[0]);

//         } else {
//             alert("Location not found");
//         }

//     };


//     // DISTANCE CALCULATION

//     const calculateDistance = () => {

//         if (!location || !searchedLocation) {

//             alert(
//                 "Get current location and search location first"
//             );

//             return;

//         }

//         const lat1 =
//             location.coords.latitude;

//         const lon1 =
//             location.coords.longitude;

//         const lat2 =
//             searchedLocation.latitude;

//         const lon2 =
//             searchedLocation.longitude;


    



//     // HOME SCREEN

//     if (screen === "home") {

//         return (

//             <View style={styles.container}>

//                 <Text style={styles.title}>
//                     🌍 Travel Guardian
//                 </Text>

//                 <Text style={styles.text}>
//                     Simple Camera + Location App
//                 </Text>


//                 <Button
//                     title="Camera"
//                     onPress={() =>
//                         setScreen("camera")
//                     }
//                 />

//                 <Button
//                     title="Location"
//                     onPress={() =>
//                         setScreen("location")
//                     }
//                 />

//                 <Button
//                     title="Camera + Location"
//                     onPress={() =>
//                         setScreen("capture")
//                     }
//                 />

//             </View>

//         );

//     }


//     // CAMERA SCREEN

//     if (screen === "camera") {

//         if (!cameraPermission) {

//             return (
//                 <View style={styles.container}>
//                     <Text>Loading...</Text>
//                 </View>
//             );

//         }


//         if (!cameraPermission.granted) {

//             return (

//                 <View style={styles.container}>

//                     <Text style={styles.title}>
//                         Camera Permission
//                     </Text>

//                     <Button
//                         title="Allow Camera"
//                         onPress={
//                             askCameraPermission
//                         }
//                     />

//                     <Button
//                         title="Back"
//                         onPress={() =>
//                             setScreen("home")
//                         }
//                     />

//                 </View>

//             );

//         }


//         return (

//             <View style={styles.cameraContainer}>

//                 <CameraView

//                     ref={cameraRef}

//                     style={styles.camera}

//                     facing={camera}

//                     flash={flash}

//                     onBarcodeScanned={
//                         scan
//                             ? scanCode
//                             : undefined
//                     }

//                     barcodeScannerSettings={{
//                         barcodeTypes: [
//                             "qr",
//                             "ean13",
//                             "ean8",
//                             "code128",
//                         ],
//                     }}

//                 />


//                 <View style={styles.cameraButtons}>

//                     <Button
//                         title="Switch Camera"
//                         onPress={changeCamera}
//                     />

//                     <Button
//                         title={`Flash: ${flash}`}
//                         onPress={changeFlash}
//                     />

//                     <Button
//                         title="Take Photo"
//                         onPress={takePhoto}
//                     />


//                     {!recording ? (

//                         <Button
//                             title="Start Video"
//                             onPress={startVideo}
//                         />

//                     ) : (

//                         <Button
//                             title="Stop Video"
//                             onPress={stopVideo}
//                         />

//                     )}


//                     <Button
//                         title={
//                             scan
//                                 ? "Stop Scanner"
//                                 : "Scan QR / Barcode"
//                         }

//                         onPress={() => {

//                             setScan(!scan);

//                             setScanResult("");

//                         }}

//                     />


//                     {scanResult !== "" && (

//                         <Text style={styles.result}>
//                             Scanned: {scanResult}
//                         </Text>

//                     )}


//                     <Button
//                         title="Back"
//                         onPress={() =>
//                             setScreen("home")
//                         }
//                     />

//                 </View>


//                 {photo && (

//                     <Image
//                         source={{ uri: photo }}
//                         style={styles.preview}
//                     />

//                 )}

//                 {video && (

//                     <Text style={styles.result}>
//                         Video saved at:
//                         {"\n"}
//                         {video}
//                     </Text>

//                 )}

//             </View>

//         );

//     }


//     // LOCATION SCREEN

//     if (screen === "location") {

//         return (

//             <ScrollView
//                 contentContainerStyle={
//                     styles.container
//                 }
//             >

//                 <Text style={styles.title}>
//                     📍 Location
//                 </Text>


//                 <Button
//                     title="Request Location Permission"
//                     onPress={
//                         askLocationPermission
//                     }
//                 />


//                 <Button
//                     title="Get Current Location"
//                     onPress={getLocation}
//                 />


//                 <Button
//                     title="Get Last Known Location"
//                     onPress={getLastLocation}
//                 />


//                 <Button
//                     title={
//                         tracking
//                             ? "Stop Tracking"
//                             : "Start Live Tracking"
//                     }

//                     onPress={
//                         tracking
//                             ? stopTracking
//                             : startTracking
//                     }

//                 />


//                 <Button
//                     title="Get Compass Heading"
//                     onPress={getHeading}
//                 />
//                 {location && (
//                     <View style={styles.card}>
//                         <Text style={styles.subtitle}>
//                             Current Location
//                         </Text>

//                         <Text>
//                             Latitude:
//                             {" "}
//                             {location.coords.latitude}
//                         </Text>

//                         <Text>
//                             Longitude:
//                             {" "}
//                             {location.coords.longitude}
//                         </Text>

//                         <Text>
//                             Accuracy:
//                             {" "}
//                             {location.coords.accuracy}
//                             {" "}meters
//                         </Text>

//                         <Text>
//                             Address:
//                             {" "}
//                             {address}
//                         </Text>

//                     </View>

//                 )}


//                 {lastLocation && (

//                     <View style={styles.card}>

//                         <Text style={styles.subtitle}>
//                             Last Known Location
//                         </Text>

//                         <Text>
//                             Latitude:
//                             {" "}
//                             {lastLocation.coords.latitude}
//                         </Text>

//                         <Text>
//                             Longitude:
//                             {" "}
//                             {lastLocation.coords.longitude}
//                         </Text>

//                     </View>

//                 )}
//                 {heading !== null && (

//                     <Text style={styles.result}>
//                         🧭 Heading: {heading}°
//                     </Text>

//                 )}
//                 <View style={styles.card}>
//                     <Text style={styles.subtitle}>
//                         Search Location
//                     </Text>

//                     <TextInput style={styles.input} placeholder="Enter address"

//                         value={search} onChangeText={setSearch}

//                     />

//                     <Button
//                         title="Search"
//                         onPress={
//                             searchLocation
//                         }
//                     />
//                 </View>
//                 {searchedLocation && (

//                     <View style={styles.card}>

//                         <Text>
//                             Search Result
//                         </Text>

//                         <Text>
//                             Latitude:
//                             {" "}       {searchedLocation.latitude}
//                         </Text>

//                         <Text>
//                             Longitude:
//                             {" "}
//                             {searchedLocation.longitude}
//                         </Text>

//                         <Button
//                             title="Calculate Distance"
//                             onPress={calculateDistance
//                             }
//                         />
//                     </View>
//                 )}
//                 {distance && (
//                     <Text style={styles.result}>
//                         📏 Distance:
//                         {" "}
//                         {distance} km
//                     </Text>
//                 )}
//                 <Button
//                     title="Back"
//                     onPress={() =>
//                         setScreen("home")
//                     }
//                 />
//             </ScrollView>
//         );
//     }
//     if (screen === "capture") {
//         if (!cameraPermission?.granted) {
//             return (
//                 <View style={styles.container}>
//                     <Text style={styles.title}>
//                         Camera Permission Required
//                     </Text>
//                     <Button
//                         title="Allow Camera" onPress={askCameraPermission
//                         }
//                     />
//                     <Button
//                         title="Back"
//                         onPress={() =>
//                             setScreen("home")
//                         }
//                     />
//                 </View>
//             );
//         }
//         return (
//             <View style={styles.cameraContainer}>
//                 <CameraView
//                     ref={cameraRef} style={styles.camera}
//                     facing="back"

//                 />
//                 <View style={styles.captureButtons}>
//                     <Button
//                         title="Get Location" onPress={getLocation}
//                     />
//                     <Button
//                         title="Capture Photo"
//                         onPress={async () => {
//                             await getLocation();
//                             await takePhoto();

//                         }}
//                     />
//                     <Button
//                         title="Back"
//                         onPress={() =>
//                             setScreen("home")
//                         }
//                     />
//                 </View>
//                 {photo && (
//                     <View style={styles.photoInfo}>
//                         <Image
//                             source={{ uri: photo }}
//                             style={styles.preview}
//                         />

//                         {location && (
//                             <Text style={styles.whiteText}>
//                                 Latitude:
//                                 {" "}
//                                 {location.coords.latitude}
//                                 {"\n"}
//                                  Longitude: {" "}
//                                 {location.coords.longitude}{"\n"}
//                                 Address:{" "}{address}{"\n"} Time: {" "} {new Date().toLocaleString()}</Text>
//              )}
//         </View>
//         )}
//         </View>
//         );
//     }
// }


// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         padding: 20,
//         justifyContent: "center",
//         backgroundColor: "#f5f5f5",
//     },
//     title: {
//         fontSize: 28,
//         fontWeight: "bold",
//         marginBottom: 20,
//         textAlign: "center",
//     },
//     subtitle: {
//         fontSize: 20,
//         fontWeight: "bold",
//         marginBottom: 10,
//     },
//     text: {
//         fontSize: 17,
//         marginBottom: 20,
//         textAlign: "center",
//     },
//     card: {
//         backgroundColor: "white",
//         padding: 15,
//         marginVertical: 10,
//         borderRadius: 10,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: "gray",
//         padding: 10,
//         marginBottom: 10,
//         borderRadius: 5,
//         backgroundColor: "white",
//     },
//     result: {
//         fontSize: 18,
//         fontWeight: "bold",
//         margin: 10,
//         textAlign: "center",
//     },
//     cameraContainer: {
//         flex: 1,
//         backgroundColor: "black",
//     },
//     camera: {
//         flex: 1,
//     },
//     cameraButtons: {
//         position: "absolute",
//         bottom: 20,
//         left: 10,
//         right: 10,
//     },
//     captureButtons: {
//         position: "absolute",
//         bottom: 30,
//         left: 20,
//         right: 20,
//     },
//     preview: {
//         width: 150,
//         height: 150,
//         margin: 10,
//         borderRadius: 10,
//     },
//     photoInfo: {
//         position: "absolute",
//         top: 50,
//         left: 10,
//         right: 10,
//         backgroundColor: "rgba(0,0,0,0.7)",
//         padding: 10,
//         borderRadius: 10,
//     },
//     whiteText: {
//         color: "white",
//         fontSize: 14,
//         marginTop: 10,
//     },

// });



