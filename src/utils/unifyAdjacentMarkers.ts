import { Place } from '../apis/searchNearbyPlaces';

export const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number => {
    const earthRadius = 6371e3; // 지구 반지름 (meter)

    const lat1Radian = (lat1 * Math.PI) / 180;
    const lat2Radian = (lat2 * Math.PI) / 180;

    const latDifference = ((lat2 - lat1) * Math.PI) / 180;
    const lonDifference = ((lon2 - lon1) * Math.PI) / 180;

    const calculation =
        Math.sin(latDifference / 2) * Math.sin(latDifference / 2) +
        Math.cos(lat1Radian) *
            Math.cos(lat2Radian) *
            Math.sin(lonDifference / 2) *
            Math.sin(lonDifference / 2);

    const distanceRatio =
        2 * Math.atan2(Math.sqrt(calculation), Math.sqrt(1 - calculation));

    return earthRadius * distanceRatio; // 미터 단위 거리 반환
};

export const getKeywordPriority = (name: string): number => {
    if (name.includes('금연')) return 1;
    if (name.includes('보건소')) return 2;
    return 3;
};

export const unifyAdjacentMarkers = (
    places: Place[],
    distanceThreshold: number = 100
): Place[] => {
    const filteredPlaces: Place[] = [];

    places.forEach((place) => {
        let shouldAdd = true;

        for (let i = 0; i < filteredPlaces.length; i++) {
            const existingPlace = filteredPlaces[i];
            const distance = calculateDistance(
                place.latitude,
                place.longitude,
                existingPlace.latitude,
                existingPlace.longitude
            );

            if (distance < distanceThreshold) {
                const currentPriority = getKeywordPriority(place.name);
                const existingPriority = getKeywordPriority(existingPlace.name);

                if (currentPriority < existingPriority) {
                    filteredPlaces[i] = place;
                }
                shouldAdd = false;
                break;
            }
        }

        if (shouldAdd) {
            filteredPlaces.push(place);
        }
    });

    return filteredPlaces;
};

// 디버깅용 함수
export const logMarkerUnification = (
    originalPlaces: Place[],
    filteredPlaces: Place[]
): void => {
    console.log(`   원본: ${originalPlaces.length}개`);
    console.log(`   통합 후: ${filteredPlaces.length}개`);
    console.log(
        `   제거됨: ${originalPlaces.length - filteredPlaces.length}개`
    );
};
