import React, { useState, useEffect } from 'react';
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
    const [refreshing, setRefreshing] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        if (region) {
            setInitialLoading(false);
        }
    }, [region]);

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
            latitude: newRegion.latitude, //
            longitude: newRegion.longitude,
            latitudeDelta: newRegion.latitudeDelta,
            longitudeDelta: newRegion.longitudeDelta,
        });
    };
    const setRegionAtCenter = () => {
        if (center) {
            setRefreshing(true);
            setRegion({
                latitude: center.latitude,
                longitude: center.longitude,
                latitudeDelta: center.latitudeDelta,
                longitudeDelta: center.longitudeDelta,
            });

            setTimeout(() => setRefreshing(false), 800);
        }
    };
    if (!region || initialLoading) {
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
                // key={`map-${region.latitude}-${region.longitude}`}
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
            {(loading && !initialLoading) || refreshing ? (
                <View style={[styles.centered, styles.overlay]}>
                    <ActivityIndicator size="large" />
                </View>
            ) : null}
            {error && (
                <View style={[styles.centered, styles.errorOverlay]}>
                    <Text style={{ color: 'red' }}>{error}</Text>
                </View>
            )}
            <MarkerInfoModal
                modalVisible={modalVisible}
                closeModal={closeModal}
                selectedPlace={selectedPlace}
            />
            {!initialLoading && (
                <TouchableOpacity
                    style={[
                        styles.refreshButton,
                        (refreshing || loading) && { opacity: 0.6 },
                    ]}
                    onPress={setRegionAtCenter}
                    disabled={refreshing || loading}
                >
                    <Ionicons
                        name={
                            refreshing || loading
                                ? 'hourglass-outline'
                                : 'search-outline'
                        }
                        size={20}
                    />
                    <Text>
                        {refreshing || loading ? '검색중...' : '새로고침'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default MapScreen;
