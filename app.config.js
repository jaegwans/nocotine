export default ({ config }) => ({
    ...config,
    extra: {
        GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
        KAKAO_MAPS_API_KEY: process.env.KAKAO_MAPS_API_KEY,
        eas: {
            projectId: '92876fc2-e8c2-4359-9cf7-0403be5eae3a',
        },
    },
});
