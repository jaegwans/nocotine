import colors from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grayLighter,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 24,
        gap: 20,
    },
    cardsWrapper: {
        width: '100%',
        gap: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.grayLighter,
    },
    cardContainer: {
        backgroundColor: colors.white,
        width: 170,
        height: 250,
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
    },
    cardTitleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        padding: 10,
        color: colors.black,
    },
    cardImageContainer: {
        width: '100%',
        height: 200,
        position: 'absolute',
        bottom: -20,
        zIndex: 1,
    },
});
