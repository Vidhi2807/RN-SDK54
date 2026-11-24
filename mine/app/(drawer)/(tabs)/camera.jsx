import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function CameraScreen() {
  const cameraRef = useRef(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions({
    writeOnly: true,
  });
  const [facing, setFacing] = useState("back");
  const [flash, setFlash] = useState("off");
  const [torch, setTorch] = useState(false);
  const [shutterSound, setShutterSound] = useState(true);
  const [photoUri, setPhotoUri] = useState(null);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Ready");

  const hasCameraPermission = cameraPermission?.granted;

  const toggleFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
    setTorch(false);
  };

  const toggleFlash = () => {
    setFlash((current) => {
      if (current === "off") return "on";
      if (current === "on") return "auto";
      return "off";
    });
  };

  const ensureMediaPermission = async () => {
    if (mediaPermission?.granted) return true;

    const requestedPermission = await requestMediaPermission();
    return requestedPermission?.granted;
  };

  const takePhoto = async () => {
    if (!cameraRef.current || isTakingPhoto) return;

    try {
      setIsTakingPhoto(true);
      setSaveStatus("Capturing...");

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.92,
        shutterSound,
      });

      setPhotoUri(photo.uri);
      setSaveStatus("Saving...");

      const canSave = await ensureMediaPermission();
      if (!canSave) {
        setSaveStatus("Gallery permission denied");
        Alert.alert(
          "Gallery permission needed",
          "Allow photos permission to save pictures to your Android gallery."
        );
        return;
      }

      await MediaLibrary.saveToLibraryAsync(photo.uri);
      setSaveStatus("Saved to gallery");
    } catch (error) {
      setSaveStatus("Capture failed");
      Alert.alert("Camera error", error?.message ?? "Could not take photo.");
    } finally {
      setIsTakingPhoto(false);
    }
  };

  if (!cameraPermission) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color="#111827" size="large" />
      </View>
    );
  }

  if (!hasCameraPermission) {
    return (
      <SafeAreaView style={styles.permissionScreen}>
        <View style={styles.permissionCard}>
          <View style={styles.permissionIcon}>
            <Ionicons name="camera" size={34} color="#111827" />
          </View>
          <Text style={styles.permissionTitle}>Camera access</Text>
          <Text style={styles.permissionText}>
            Allow camera permission to take photos and save them to your gallery.
          </Text>
          <Pressable style={styles.permissionButton} onPress={requestCameraPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        flash={flash}
        enableTorch={facing === "back" && torch}
        mode="picture"
        animateShutter
      />

      <SafeAreaView style={styles.overlay}>
        <View style={styles.topBar}>
          <ControlButton
            active={flash !== "off"}
            icon={flash === "auto" ? "flash-outline" : "flash"}
            label={flash === "auto" ? "Auto" : flash === "on" ? "On" : "Off"}
            onPress={toggleFlash}
          />
          <ControlButton
            active={torch}
            disabled={facing !== "back"}
            icon={torch ? "bulb" : "bulb-outline"}
            label={torch ? "Torch" : "Torch"}
            onPress={() => setTorch((current) => !current)}
          />
          <ControlButton
            active={!shutterSound}
            icon={shutterSound ? "volume-high" : "volume-mute"}
            label={shutterSound ? "Sound" : "Muted"}
            onPress={() => setShutterSound((current) => !current)}
          />
        </View>

        <View style={styles.focusFrame}>
          <View style={[styles.corner, styles.topLeftCorner]} />
          <View style={[styles.corner, styles.topRightCorner]} />
          <View style={[styles.corner, styles.bottomLeftCorner]} />
          <View style={[styles.corner, styles.bottomRightCorner]} />
        </View>

        <View style={styles.bottomPanel}>
          <View style={styles.statusPill}>
            <Ionicons name="images" size={15} color="#D1FAE5" />
            <Text style={styles.statusText}>{saveStatus}</Text>
          </View>

          <View style={styles.captureRow}>
            <View style={styles.previewSlot}>
              {photoUri ? (
                <Image source={{ uri: photoUri }} style={styles.previewImage} />
              ) : (
                <Ionicons name="image-outline" size={25} color="#D1D5DB" />
              )}
            </View>

            <Pressable
              accessibilityRole="button"
              disabled={isTakingPhoto}
              style={({ pressed }) => [
                styles.shutterButton,
                (pressed || isTakingPhoto) && styles.shutterButtonPressed,
              ]}
              onPress={takePhoto}
            >
              {isTakingPhoto ? (
                <ActivityIndicator color="#111827" />
              ) : (
                <View style={styles.shutterInner} />
              )}
            </Pressable>

            <Pressable style={styles.flipButton} onPress={toggleFacing}>
              <Ionicons name="camera-reverse" size={29} color="#F9FAFB" />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

function ControlButton({ active, disabled, icon, label, onPress }) {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.controlButton,
        active && styles.controlButtonActive,
        disabled && styles.controlButtonDisabled,
        pressed && !disabled && styles.controlButtonPressed,
      ]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={21} color={active ? "#111827" : "#F9FAFB"} />
      <Text style={[styles.controlText, active && styles.controlTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 14,
  },
  controlButton: {
    alignItems: "center",
    backgroundColor: "rgba(17, 24, 39, 0.58)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
    height: 58,
    justifyContent: "center",
    minWidth: 76,
    paddingHorizontal: 12,
  },
  controlButtonActive: {
    backgroundColor: "#FDE68A",
    borderColor: "#FBBF24",
  },
  controlButtonDisabled: {
    opacity: 0.45,
  },
  controlButtonPressed: {
    transform: [{ scale: 0.96 }],
  },
  controlText: {
    color: "#F9FAFB",
    fontSize: 11,
    fontWeight: "700",
  },
  controlTextActive: {
    color: "#111827",
  },
  focusFrame: {
    alignSelf: "center",
    height: 220,
    position: "relative",
    width: 220,
  },
  corner: {
    borderColor: "rgba(255, 255, 255, 0.92)",
    height: 34,
    position: "absolute",
    width: 34,
  },
  topLeftCorner: {
    borderLeftWidth: 3,
    borderTopWidth: 3,
    left: 0,
    top: 0,
  },
  topRightCorner: {
    borderRightWidth: 3,
    borderTopWidth: 3,
    right: 0,
    top: 0,
  },
  bottomLeftCorner: {
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    bottom: 0,
    left: 0,
  },
  bottomRightCorner: {
    borderBottomWidth: 3,
    borderRightWidth: 3,
    bottom: 0,
    right: 0,
  },
  bottomPanel: {
    backgroundColor: "rgba(3, 7, 18, 0.72)",
    borderTopColor: "rgba(255, 255, 255, 0.14)",
    borderTopWidth: 1,
    paddingBottom: 26,
    paddingHorizontal: 22,
    paddingTop: 14,
  },
  statusPill: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "rgba(6, 78, 59, 0.7)",
    borderRadius: 8,
    flexDirection: "row",
    gap: 7,
    marginBottom: 15,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  statusText: {
    color: "#ECFDF5",
    fontSize: 12,
    fontWeight: "700",
  },
  captureRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  previewSlot: {
    alignItems: "center",
    backgroundColor: "rgba(17, 24, 39, 0.86)",
    borderColor: "rgba(255, 255, 255, 0.24)",
    borderRadius: 8,
    borderWidth: 1,
    height: 58,
    justifyContent: "center",
    overflow: "hidden",
    width: 58,
  },
  previewImage: {
    height: "100%",
    width: "100%",
  },
  shutterButton: {
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderColor: "rgba(255, 255, 255, 0.42)",
    borderRadius: 42,
    borderWidth: 5,
    height: 82,
    justifyContent: "center",
    width: 82,
  },
  shutterButtonPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.96 }],
  },
  shutterInner: {
    backgroundColor: "#FFFFFF",
    borderColor: "#111827",
    borderRadius: 29,
    borderWidth: 2,
    height: 58,
    width: 58,
  },
  flipButton: {
    alignItems: "center",
    backgroundColor: "rgba(17, 24, 39, 0.86)",
    borderColor: "rgba(255, 255, 255, 0.24)",
    borderRadius: 8,
    borderWidth: 1,
    height: 58,
    justifyContent: "center",
    width: 58,
  },
  centered: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  permissionScreen: {
    alignItems: "center",
    backgroundColor: "#E5E7EB",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  permissionCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 24,
    width: "100%",
  },
  permissionIcon: {
    alignItems: "center",
    backgroundColor: "#FDE68A",
    borderRadius: 8,
    height: 64,
    justifyContent: "center",
    marginBottom: 18,
    width: 64,
  },
  permissionTitle: {
    color: "#111827",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
  },
  permissionText: {
    color: "#4B5563",
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 22,
    textAlign: "center",
  },
  permissionButton: {
    alignItems: "center",
    backgroundColor: "#111827",
    borderRadius: 8,
    minHeight: 48,
    justifyContent: "center",
    paddingHorizontal: 20,
    width: "100%",
  },
  permissionButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});