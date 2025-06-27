import { View, Text, Alert, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { Place, searchNearbyPlaces } from '../apis/searchNearbyPlaces';

function getDeltaFromRadius(radius: number) {
    const delta = radius / 1000 / 111;
    return delta;
}

function getRadiusfromDelta(delta: number) {
    return delta * 1000 * 111;
}

export const useStopSmokingCenterMap = () => {
    const [region, setRegion] = useState<Region | null>(null);
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [myLocation, setMyLocation] =
        useState<Location.LocationObject | null>(null);

    const radius = 5000; //5km
    const delta = getDeltaFromRadius(radius);

    const DEFAULT_KEYWORDS = ['보건소', '금연'];

    const hasLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('위치 권한이 필요합니다! 설정에서 허용해주세요.');
            return false;
        }
        return true;
    };

    const fetchRegion = async () => {
        const hasPermission = await hasLocationPermission();
        if (!hasPermission) return;
        setLoading(true);
        setError(null);

        const loc = await Location.getCurrentPositionAsync({});

        setMyLocation(loc);

        if (!loc || !loc.coords) {
            setError('위치 정보를 가져오지 못했습니다.');
            setLoading(false);
            return;
        }

        setRegion({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: delta,
            longitudeDelta: delta,
        });
    };

    useEffect(() => {
        fetchRegion();
    }, []);

    useEffect(() => {
        if (!region) return;
        setLoading(true);
        setError(null);

        Promise.all(
            DEFAULT_KEYWORDS.map((keyword) =>
                searchNearbyPlaces(
                    region.latitude,
                    region.longitude,
                    keyword,
                    5000 //getRadiusfromDelta(region.latitudeDelta) || 5000
                )
            )
        )
            .then((results) => {
                const uniquePlacesMap = new Map();
                results.flat().forEach((place) => {
                    const key =
                        place.place_id ||
                        `${place.name}-${place.latitude}-${place.longitude}`;
                    uniquePlacesMap.set(key, place);
                });
                const uniquePlaces = Array.from(uniquePlacesMap.values());
                setPlaces(uniquePlaces);
            })
            .catch((e) => {
                setError('주변 장소를 불러오지 못했습니다.');
            })
            .finally(() => setLoading(false));
    }, [region]);

    return {
        region,
        places,
        loading,
        error,
        setRegion,
        myLocation,
    };
};
