import colors from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: 200,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 8,
        backgroundColor: colors.grayApple,
        borderRadius: 20,
    },
    closeButtonText: {
        fontSize: 16,
    },
    address: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 14,
        marginBottom: 5,
    },
    urlButton: {
        backgroundColor: colors.greenLight,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    urlButtonText: {
        fontSize: 14,
    },
});
