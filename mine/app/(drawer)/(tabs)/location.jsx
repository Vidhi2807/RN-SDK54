import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  ScrollView,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Share,
  Linking,
  Platform,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";

const { width, height } = Dimensions.get("window");
const WEATHER_API_KEY = "YOUR_OPENWEATHER_API_KEY"; // Replace with your OpenWeatherMap API Key

const LocationScreen = () => {
  // Map & Location Core States
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);
  const [address, setAddress] = useState(null);
  const [mapType, setMapType] = useState("standard");
  const mapRef = useRef(null);

  // Advanced Recording & Trip Path States
  const [isTracking, setIsTracking] = useState(false);
  const [travelledPath, setTravelledPath] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [tripDuration, setTripDuration] = useState(0);
  const timerRef = useRef(null);
  const locationSubscription = useRef(null);

  // Interactive Custom Markers Array
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Search Architecture States
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Live Weather Metrics State
  const [weather, setWeather] = useState(null);

  // UI Theme Engine States
  const [isDarkMode, setIsDarkMode] = useState(false);

  // App Mount Initializations
  useEffect(() => {
    requestPermissions();
    return () => stopLiveTracking();
  }, []);

  // Dedicated Live Route Duration Counter
  useEffect(() => {
    if (isTracking) {
      timerRef.current = setInterval(() => {
        setTripDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isTracking]);

  const requestPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location access permissions are mandatory.");
      return false;
    }
    return true;
  };

  // One-Time Fetch Location Updates
  const getCurrentLocation = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      updateLocationState(loc);
      animateToRegion(loc.coords.latitude, loc.coords.longitude);
    } catch (error) {
      Alert.alert("Error", "Could not capture modern device location coordinate matrices.");
    }
  };

  const updateLocationState = (loc) => {
    const coords = loc.coords;
    setCurrentLocation(coords);
    setLocationDetails({
      accuracy: coords.accuracy?.toFixed(1) || "N/A",
      speed: coords.speed > 0 ? (coords.speed * 3.6).toFixed(1) : "0.0",
      heading: coords.heading !== null && coords.heading >= 0 ? coords.heading.toFixed(0) : "N/A",
      altitude: coords.altitude?.toFixed(1) || "N/A",
      timestamp: new Date(loc.timestamp).toLocaleTimeString(),
    });
    reverseGeocode(coords.latitude, coords.longitude);
    fetchWeather(coords.latitude, coords.longitude);
  };

  // Continuous Realtime Dynamic Tracking Subsystem
  const startLiveTracking = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setIsTracking(true);
    setTravelledPath([]);
    setTotalDistance(0);
    setTripDuration(0);

    locationSubscription.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 2000,
        distanceInterval: 2,
      },
      (newLoc) => {
        const newCoords = newLoc.coords;
        updateLocationState(newLoc);

        setTravelledPath((prevPath) => {
          if (prevPath.length > 0) {
            const lastCoords = prevPath[prevPath.length - 1];
            const dist = calculateDistance(
              lastCoords.latitude,
              lastCoords.longitude,
              newCoords.latitude,
              newCoords.longitude
            );
            setTotalDistance((prevDist) => prevDist + dist);
          }
          return [...prevPath, { latitude: newCoords.latitude, longitude: newCoords.longitude }];
        });
      }
    );
  };

  const stopLiveTracking = () => {
    setIsTracking(false);
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }
  };

  // Geocoding & OpenWeather Engines
  const reverseGeocode = async (latitude, longitude) => {
    try {
      const geo = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (geo && geo.length > 0) setAddress(geo[0]);
    } catch (e) {
      console.log("Geocoding exception logs", e);
    }
  };

  const fetchWeather = async (lat, lon) => {
    if (WEATHER_API_KEY === "YOUR_OPENWEATHER_API_KEY") return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
      );
      const data = await response.json();
      if (data.main) {
        setWeather({
          temp: data.main.temp.toFixed(1),
          humidity: data.main.humidity,
          wind: data.wind.speed,
          desc: data.weather[0].description,
        });
      }
    } catch (e) {
      console.log("Weather service breakdown logs", e);
    }
  };

  // Haversine Linear Math Formula Utilities
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Global Reverse Places Geocoding Engine Search
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const result = await Location.geocodeAsync(searchQuery);
      if (result && result.length > 0) {
        const { latitude, longitude } = result[0];
        const newMarker = {
          id: Date.now().toString(),
          coordinate: { latitude, longitude },
          title: searchQuery,
          description: "Searched Target Node",
          color: "purple",
        };
        setMarkers((prev) => [...prev, newMarker]);
        animateToRegion(latitude, longitude);
        setSearchQuery("");
      } else {
        Alert.alert("Not Found", "Target location query yielded zero coordinate structures.");
      }
    } catch (e) {
      Alert.alert("Error", "Search vector network error.");
    } finally {
      setIsSearching(false);
    }
  };

  // Native Map Marker Interactions Matrix
  const handleMapPress = (e) => {
    const coord = e.nativeEvent.coordinate;
    const newMarker = {
      id: Date.now().toString(),
      coordinate: coord,
      title: `Marker ${markers.length + 1}`,
      description: "Tap Placed Pin",
      color: "orange",
    };
    setMarkers((prev) => [...prev, newMarker]);
  };

  const handleMapLongPress = (e) => {
    const coord = e.nativeEvent.coordinate;
    const newMarker = {
      id: Date.now().toString(),
      coordinate: coord,
      title: `Custom Target ${markers.length + 1}`,
      description: "Long Press Placed Pin",
      color: "#EC4899",
    };
    setMarkers((prev) => [...prev, newMarker]);
  };

  const deleteMarker = (id) => {
    setMarkers((prev) => prev.filter((m) => m.id !== id));
    setSelectedMarker(null);
  };

  const animateToRegion = (latitude, longitude) => {
    const region = {
      latitude,
      longitude,
      latitudeDelta: 0.012,
      longitudeDelta: 0.012,
    };
    setMapRegion(region);
    mapRef.current?.animateToRegion(region, 1000);
  };

  // Sharing & Navigation Redirect Engines
  const shareLocation = async () => {
    if (!currentLocation) return;
    try {
      await Share.share({
        message: `Current location live vector coordinates: http://maps.google.com/?q=${currentLocation.latitude},${currentLocation.longitude}`,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const openExternalMaps = (platform) => {
    if (!currentLocation) return;
    const { latitude, longitude } = currentLocation;
    const url =
      platform === "apple"
        ? `maps://app?saddr=&daddr=${latitude},${longitude}`
        : `google.navigation:q=${latitude},${longitude}`;
    Linking.openURL(url).catch(() => Alert.alert("Error", "Redirect framework application failed to boot."));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const distanceToMarker =
    currentLocation && selectedMarker
      ? calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          selectedMarker.coordinate.latitude,
          selectedMarker.coordinate.longitude
        ).toFixed(2)
      : null;

  const currentTheme = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={[styles.mainContainer, currentTheme.bgBackground]}>
      {/* Top Floating Control Navbar Header */}
      <View style={styles.topControlNavbar}>
        <Text style={[styles.appHeaderTitle, currentTheme.textMain]}>Location Hub</Text>
        <Pressable style={[styles.themeToggleButton, currentTheme.bgCard, styles.shadowContainer]} onPress={() => setIsDarkMode(!isDarkMode)}>
          <Text style={styles.themeToggleText}>{isDarkMode ? "☀️ Light" : "🌙 Dark"}</Text>
        </Pressable>
      </View>

      {/* Floating Global Search Panel */}
      <View style={[styles.headerSearch, currentTheme.bgCard, styles.shadowContainer]}>
        <TextInput
          placeholder="Search City or Place..."
          placeholderTextColor={isDarkMode ? "#71717A" : "#A1A1AA"}
          style={[styles.searchInput, currentTheme.textMain]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Pressable style={styles.searchButton} onPress={handleSearch}>
          {isSearching ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.btnText}>Search</Text>}
        </Pressable>
      </View>

      {/* Restored Native Map Component Viewport Layer */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFillObject}
          initialRegion={
            mapRegion || {
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }
          }
          mapType={mapType}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={true}
          showsTraffic={true}
          showsBuildings={true}
          showsIndoors={true}
          onPress={handleMapPress}
          onLongPress={handleMapLongPress}
        >
          {travelledPath.length > 1 && <Polyline coordinates={travelledPath} strokeColor="#3B82F6" strokeWidth={5} />}

          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
              pinColor={marker.color}
              onPress={() => setSelectedMarker(marker)}
            />
          ))}
        </MapView>

        {/* Floating HUD Controls on top of Map */}
        <View style={styles.floatingControlsContainer}>
          <Pressable
            style={[styles.circleButton, currentTheme.bgCard, styles.shadowContainer]}
            onPress={() => setMapType((prev) => (prev === "standard" ? "satellite" : prev === "satellite" ? "hybrid" : "standard"))}
          >
            <Text style={styles.iconFont}>🗺️</Text>
          </Pressable>
          <Pressable style={[styles.circleButton, isTracking ? styles.accentStopButton : styles.accentTrackButton, styles.shadowContainer]} onPress={isTracking ? stopLiveTracking : startLiveTracking}>
            <Text style={styles.iconFont}>{isTracking ? "⏹️" : "⏺️"}</Text>
          </Pressable>
          <Pressable style={[styles.circleButton, styles.locationFloatButton, styles.shadowContainer]} onPress={getCurrentLocation}>
            <Text style={styles.iconFont}>📍</Text>
          </Pressable>
        </View>
      </View>

      {/* Modern Scrolling Dashboard Performance Sheet Panel */}
      <ScrollView style={[styles.detailsMetricsSheet, currentTheme.bgCard]} contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
        
        {/* Dynamic Telemetry Metric Instruments */}
        {locationDetails && (
          <View style={[styles.speedometerDashboard, currentTheme.bgWidget]}>
            <View style={styles.speedBlock}>
              <Text style={[styles.speedMetricText, currentTheme.textMain]}>{locationDetails.speed}</Text>
              <Text style={styles.speedLabelText}>KM/H</Text>
            </View>
            <View style={styles.telemetryDivider} />
            <View style={styles.telemetryGrid}>
              <Text style={[styles.gridTextItem, currentTheme.textSub]}>🧭 Dir: <Text style={currentTheme.textMain}>{locationDetails.heading}°</Text></Text>
              <Text style={[styles.gridTextItem, currentTheme.textSub]}>🏔️ Alt: <Text style={currentTheme.textMain}>{locationDetails.altitude}m</Text></Text>
              <Text style={[styles.gridTextItem, currentTheme.textSub]}>🎯 Acc: <Text style={currentTheme.textMain}>{locationDetails.accuracy}m</Text></Text>
              <Text style={[styles.gridTextItem, currentTheme.textSub]}>🕒 Time: <Text style={currentTheme.textMain}>{locationDetails.timestamp}</Text></Text>
            </View>
          </View>
        )}

        {/* Live Route Navigation Telemetry Banner */}
        {isTracking && (
          <View style={styles.trackingRecordPill}>
            <Text style={styles.recordPillText}>⚡ Tracking Live Route</Text>
            <Text style={styles.recordPillText}>Dist: {totalDistance.toFixed(2)} km</Text>
            <Text style={styles.recordPillText}>Time: {formatTime(tripDuration)}</Text>
          </View>
        )}

        {/* Reverse Geocoding Address Card Block */}
        {address && (
          <View style={[styles.cardSection, currentTheme.bgWidget]}>
            <Text style={[styles.sectionHeaderTitle, currentTheme.textMain]}>📍 Current Address</Text>
            <Text style={[styles.addressBodySubtext, currentTheme.textSub]}>
              {address.name ? `${address.name}, ` : ""}{address.city || address.subregion || ""}, {address.region}, {address.postalCode || ""}, {address.country}
            </Text>
          </View>
        )}

        {/* Dynamic Contextual Micro Weather Station Capsule */}
        {weather && (
          <View style={[styles.cardSection, currentTheme.bgWidget]}>
            <Text style={[styles.sectionHeaderTitle, currentTheme.textMain]}>🌦️ Meteorological Metrics</Text>
            <Text style={[styles.addressBodySubtext, currentTheme.textSub]}>
              Current temperature scales at <Text style={styles.highlightText}>{weather.temp}°C</Text> with <Text style={{textTransform:'capitalize'}}>{weather.desc}</Text>. Atmosphere humidity levels at <Text style={currentTheme.textMain}>{weather.humidity}%</Text> with surface winds blowing at <Text style={currentTheme.textMain}>{weather.wind} m/s</Text>.
            </Text>
          </View>
        )}

        {/* Interactive Highlighted Pin Metadata Engine Card */}
        {selectedMarker && (
          <View style={styles.markerSelectedPillContainer}>
            <Text style={styles.markerHighlightTitle}>📌 Targeted Pin: {selectedMarker.title}</Text>
            {distanceToMarker && <Text style={styles.markerHighlightDistance}>Range vector to target: {distanceToMarker} km</Text>}
            <Pressable style={styles.deletePinBtn} onPress={() => deleteMarker(selectedMarker.id)}>
              <Text style={styles.deletePinBtnText}>Drop Target Pin</Text>
            </Pressable>
          </View>
        )}

        {/* Global Action Export Operations Core Layer Layout */}
        <View style={styles.utilitySection}>
          <Text style={[styles.sectionHeaderTitle, currentTheme.textMain, {marginBottom: 12}]}>📤 Export Map Operations</Text>
          <View style={styles.actionRowPack}>
            <Pressable style={[styles.actionPillBtn, { backgroundColor: "#10B981" }, styles.shadowContainer]} onPress={shareLocation}>
              <Text style={styles.btnText}>🔗 Share Vector</Text>
            </Pressable>
            <Pressable style={[styles.actionPillBtn, { backgroundColor: "#F59E0B" }, styles.shadowContainer]} onPress={() => openExternalMaps("google")}>
              <Text style={styles.btnText}>🗺️ Google Navigation</Text>
            </Pressable>
            {Platform.OS === "ios" && (
              <Pressable style={[styles.actionPillBtn, { backgroundColor: "#000000" }, styles.shadowContainer]} onPress={() => openExternalMaps("apple")}>
                <Text style={styles.btnText}>🍎 Apple Maps</Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LocationScreen;

// Master Theme Grid Layout Elements Design Stylesheet
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topControlNavbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15, // Drastically reduced to remove the huge gap under the drawer header
    paddingBottom: 15,
    zIndex: 60,
  },
  appHeaderTitle: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  themeToggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  themeToggleText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2563EB",
  },
  shadowContainer: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  headerSearch: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 6,
    zIndex: 50,
    position: "absolute",
    top: 70, // Shifted up since topControlNavbar is now much smaller
    left: 20,
    right: 20,
    borderRadius: 24,
    alignItems: "center",
    height: 56,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    fontWeight: "500",
  },
  searchButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 16,
    marginLeft: 10,
  },
  btnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
  },
  mapContainer: {
    width: "100%",
    flex: 0.55,
    position: "relative",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: "hidden",
  },
  mapFrame: {
    flex: 1,
  },
  floatingControlsContainer: {
    position: "absolute",
    bottom: 30,
    right: 20,
    alignItems: "center",
    zIndex: 30,
  },
  circleButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  locationFloatButton: {
    backgroundColor: "#2563EB",
  },
  accentTrackButton: {
    backgroundColor: "#EF4444",
  },
  accentStopButton: {
    backgroundColor: "#22C55E",
  },
  iconFont: {
    fontSize: 22,
    color: "#FFFFFF",
  },
  detailsMetricsSheet: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -30,
    paddingHorizontal: 20,
    paddingTop: 35,
    zIndex: 40,
  },
  speedometerDashboard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  speedBlock: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.35,
  },
  speedMetricText: {
    fontSize: 48,
    fontWeight: "800",
    letterSpacing: -1.5,
  },
  speedLabelText: {
    fontSize: 14,
    color: "#EF4444",
    fontWeight: "800",
    marginTop: 4,
    letterSpacing: 0.5,
  },
  telemetryDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#E2E8F0",
    marginHorizontal: 15,
  },
  telemetryGrid: {
    flex: 0.65,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridTextItem: {
    width: "48%",
    fontSize: 14,
    marginVertical: 6,
    fontWeight: "600",
  },
  trackingRecordPill: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#86EFAC",
    padding: 18,
    borderRadius: 24,
    marginBottom: 20,
  },
  recordPillText: {
    color: "#166534",
    fontWeight: "700",
    fontSize: 14,
  },
  cardSection: {
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  sectionHeaderTitle: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.2,
    marginBottom: 10,
  },
  addressBodySubtext: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 4,
    fontWeight: "500",
  },
  highlightText: {
    fontWeight: "700",
    color: "#2563EB",
  },
  markerSelectedPillContainer: {
    backgroundColor: "#FEF3C7",
    borderColor: "#FDE68A",
    borderWidth: 1,
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  markerHighlightTitle: {
    fontWeight: "800",
    color: "#D97706",
    fontSize: 16,
  },
  markerHighlightDistance: {
    fontSize: 14,
    color: "#92400E",
    marginVertical: 8,
    fontWeight: "600",
  },
  deletePinBtn: {
    backgroundColor: "#EF4444",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  deletePinBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  utilitySection: {
    marginBottom: 40,
  },
  actionRowPack: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionPillBtn: {
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 20,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});

// Dynamic Semantic Light & Dark Theme Sheets System
const lightStyles = StyleSheet.create({
  bgBackground: { backgroundColor: "#F8FAFC" },
  bgCard: { backgroundColor: "#FFFFFF" },
  bgWidget: { backgroundColor: "#FFFFFF" },
  textMain: { color: "#0F172A" },
  textSub: { color: "#64748B" },
});

const darkStyles = StyleSheet.create({
  bgBackground: { backgroundColor: "#0F172A" },
  bgCard: { backgroundColor: "#1E293B" },
  bgWidget: { backgroundColor: "#1E293B" },
  textMain: { color: "#F8FAFC" },
  textSub: { color: "#94A3B8" },
});