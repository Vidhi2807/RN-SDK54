// // import { Button, StyleSheet, Text, View } from "react-native";

// // import { File, Paths } from "expo-file-system";

// // export default function DownloadScreen() {
// //   const downloadPDF = async () => {
// //     const url = "https://some-domain.com/resume.pdf";

// //     const destination = new File(Paths.cache, "resume.pdf");

// //     const file = await File.downloadFileAsync(url, destination, {
// //       idempotent: true,
// //       onProgress:({bytes})
// //     });

// //     console.log("Downloaded file:", file.uri);
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>PDF Downloader</Text>

// //       <Button title="Download Resume" onPress={downloadPDF} />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     padding: 20,
// //     backgroundColor: "red",
// //   },

// //   title: {
// //     fontSize: 24,
// //     marginBottom: 20,
// //   },
// // });

// import { useState } from "react";

// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
// } from "react-native";

// import {
//   File,
//   Paths,
// } from "expo-file-system";

// export default function DownloadCenter() {
//   const [progress, setProgress] =
//     useState(0);

//   const [status, setStatus] =
//     useState("Not downloaded");

//   const downloadFile = async () => {
//     try {
//       setStatus("Downloading...");
//       setProgress(0);

//       const url =
//         "https://pdfobject.com/pdf/sample.pdf";

//       const destination = new File(
//         Paths.document,
//         "sample.pdf"
//       );

//       const file =
//         await File.downloadFileAsync(
//           url,
//           destination,
//           {
//             idempotent: true,

//             onProgress: ({
//               bytesWritten,
//               totalBytes,
//             }) => {
//               if (totalBytes > 0) {
//                 setProgress(
//                   bytesWritten /
//                     totalBytes
//                 );
//               }
//             },
//           }
//         );

//       setProgress(1);
//       setStatus("Downloaded");

//       console.log(
//         "File:",
//         file.uri
//       );
//     } catch (error) {
//       console.error(error);
//       setStatus("Download failed");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         Download Center
//       </Text>

//       <Text>
//         React Native PDF
//       </Text>

//       <Button
//         title="Download"
//         onPress={downloadFile}
//       />

//       <Text>
//         Progress:{" "}
//         {Math.round(progress * 100)}%
//       </Text>

//       <Text>
//         Status: {status}
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//     gap: 16,
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: "700",
//   },
// });

// import { View, Button, Text } from "react-native";
// import { File, Paths, Directory } from "expo-file-system";
// import * as Sharing from "expo-sharing";
// import { useState } from "react";

// export default function FileSystem() {
//   const [data, setData] = useState("");

//   const fileDir = new Directory(Paths.document, "directory"); // for paths : document , cache , bundled
//   const newFile = new File(fileDir, "file.txt");

//   const handleReadData = () => {
//     if (!fileDir.exists) {
//       fileDir.create({
//         idempotent: true,
//         intermediates: true,
//       });
//     }

//     if (!newFile.exists) {
//       newFile.create();
//     }

//     newFile.write("hello from native class");
//     alert("File created successfully!");
//   };

//   const handleGetData = async () => {
//     if (!newFile.exists) {
//       alert("File doesn't exist");
//       return;
//     }

//     const res = await newFile.text();
//     setData(res);
//   };

//   const handleDownload = async () => {
//     if (!newFile.exists) {
//       alert("Create the file first!");
//       return;
//     }

//     if (await Sharing.isAvailableAsync()) {
//       await Sharing.shareAsync(newFile.uri);
//     } else {
//       alert("Sharing is not available on this device");
//     }
//   };

//   return (
//     <View style={{ padding: 20, marginTop: 50 }}>
//       <Text>React Native File System</Text>

//       <Button title="Create File" onPress={handleReadData} />

//       <Button title="Get Data" onPress={handleGetData} />

//       <Text>{data}</Text>

//       <Button title="Download File" onPress={handleDownload} />
//     </View>
//   );
// }

// downlaod file :

// import { File, Directory, Paths } from "expo-file-system";

// async function downloadFile() {
//   try {
//     const url = "https://pdfobject.com/pdf/sample.pdf";

//     const destination = new Directory(Paths.cache, "pdfs");

//     destination.create({
//       idempotent: true,
//       intermediates: true,
//     });

//     const file = await File.downloadFileAsync(url, destination,
// );

//     console.log("Downloaded successfully");

//     console.log("URI:", file.uri);

//     console.log("Exists:", file.exists);

//     console.log("Size:", file.size);
//   } catch (error) {
//     console.error("Download failed:", error);
//   }
// }

import { useState } from "react";

import { View, Text, Button, StyleSheet } from "react-native";

import { File, Paths } from "expo-file-system";

export default function DownloadCenter() {
  const [progress, setProgress] = useState(0);

  const [status, setStatus] = useState("Not downloaded");

  const downloadFile = async () => {
    try {
      setStatus("Downloading...");
      setProgress(0);

      const url = "https://pdfobject.com/pdf/sample.pdf";

      const destination = new File(Paths.document, "sample.pdf");

      const file = await File.downloadFileAsync(url, destination, {
        idempotent: true,

        onProgress: ({ bytesWritten, totalBytes }) => {
          if (totalBytes>0) {
            setProgress(bytesWritten / totalBytes);
          }
        },
      });
      setProgress(1);
      setStatus("Downloaded");

      console.log("File:", file.uri);
    } catch (error) {
      console.error(error);
      setStatus("Download failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Download Center</Text>

      <Text>React Native PDF </Text>

      <Button title="Download" onPress={downloadFile} />

      <Text>Progress: {Math.round(progress * 100)}%</Text>

      <Text>Status: {status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
  },
});
