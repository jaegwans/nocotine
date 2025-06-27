import axios from 'axios';
import Constants from 'expo-constants';

const KAKAO_MAPS_API_KEY = Constants.expoConfig?.extra?.KAKAO_MAPS_API_KEY;
export type Place = {
    name: string;
    latitude: number;
    longitude: number;
    address?: string;
    [key: string]: any;
};

export async function searchNearbyPlaces(
    latitude: number,
    longitude: number,
    keyword: string,
    radius: number = 5000
): Promise<Place[]> {
    const url = 'https://dapi.kakao.com/v2/local/search/keyword.json';

    const params = {
        query: keyword,
        x: longitude,
        y: latitude,
        radius,
    };

    const headers = {
        Authorization: `KakaoAK ${KAKAO_MAPS_API_KEY}`,
    };

    const res = await axios.get(url, { params, headers });
    if (!res.data.documents) {
        throw new Error('Kakao Maps API error: no documents');
    }
    // Kakao 응답 구조에 맞게 파싱
    return res.data.documents.map((item: any) => ({
        name: item.place_name,
        latitude: Number(item.y),
        longitude: Number(item.x),
        address: item.road_address_name || item.address_name,
        place_id: item.id,
        phone: item.phone,
        category: item.category_name,
        url: item.place_url,
    }));
}
