import React, { useState } from 'react';
import {
    ActivityIndicator,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import MapView, { Callout, Marker, Region } from 'react-native-maps';
import { styles } from './MapScreen.styles';
import { useStopSmokingCenterMap } from '@/hooks/useStopSmokingCenterMap';
import { Place } from '@/apis/searchNearbyPlaces';
import MarkerInfoModal from './components/MarkerInfoModal';
import pinImage from '@/assets/images/pin.png';
import pinActiveImage from '@/assets/images/pinActive.png';
import profile from '@/assets/images/profile.png';
import Ionicons from '@expo/vector-icons/Ionicons';

const MapScreen = () => {
    const { region, places, loading, error, setRegion, myLocation } =
        useStopSmokingCenterMap();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [center, setCenter] = useState<Region | null>(null);

    const handleMarkerPress = (place: Place) => {
        setSelectedPlace(place);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedPlace(null);
    };
    const setCenterAtMapViewRegion = (newRegion: Region) => {
        setCenter({
            latitude: newRegion.latitude,
            longitude: newRegion.longitude,
            latitudeDelta: newRegion.latitudeDelta,
            longitudeDelta: newRegion.longitudeDelta,
        });
    };
    const setRegionAtCenter = () => {
        if (center) {
            setRegion({
                latitude: center.latitude,
                longitude: center.longitude,
                latitudeDelta: center.latitudeDelta,
                longitudeDelta: center.longitudeDelta,
            });
        }
    };
    if (!region || loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={styles.map}
                region={region}
                showsUserLocation
                // key={`${region.latitude},${region.longitude}-${places.length}`}
                onRegionChangeComplete={setCenterAtMapViewRegion}
            >
                {places.map((place) => (
                    <Marker
                        key={place.place_id || place.name + place.latitude}
                        coordinate={{
                            latitude: place.latitude,
                            longitude: place.longitude,
                        }}
                        pinColor="green"
                        onPress={() => handleMarkerPress(place)}
                    >
                        <View style={styles.markerContainer}>
                            <Image
                                source={
                                    selectedPlace?.place_id === place.place_id
                                        ? pinActiveImage
                                        : pinImage
                                }
                                style={{ width: 32, height: 32 }}
                                resizeMode="contain"
                            />
                            <Text style={styles.markerText}>{place.name}</Text>
                        </View>
                    </Marker>
                ))}
                <Marker
                    coordinate={{
                        latitude: myLocation?.coords.latitude || 37.5665, // default 서울 시청
                        longitude: myLocation?.coords.longitude || 126.978,
                    }}
                    anchor={{ x: 0.5, y: 0.5 }}
                >
                    <View style={styles.markerContainer}>
                        <Image
                            source={profile}
                            style={{ width: 32, height: 32 }}
                            resizeMode="contain"
                        />
                        <Text style={styles.markerText}>현재 위치</Text>
                    </View>
                </Marker>
            </MapView>
            {loading && (
                <View style={[styles.centered, styles.overlay]}>
                    <ActivityIndicator size="large" />
                </View>
            )}
            {error && (
                <View style={[styles.centered, styles.errorOverlay]}>
                    <ActivityIndicator size="small" color="red" />
                </View>
            )}
            <MarkerInfoModal
                modalVisible={modalVisible}
                closeModal={closeModal}
                selectedPlace={selectedPlace}
            />
            {!loading && !error && (
                <TouchableOpacity
                    style={styles.refreshButton}
                    onPress={setRegionAtCenter}
                >
                    <Ionicons name="search-outline" size={20} />
                    <Text>새로고침</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default MapScreen;
