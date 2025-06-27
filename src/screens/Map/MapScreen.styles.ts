import colors from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    errorOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    map: {
        flex: 1,
    },
    markerContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    markerText: {
        fontSize: 12,
        marginTop: 4,
        fontWeight: 'bold',
    },
    refreshButton: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 30,
        backgroundColor: colors.white,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
});
