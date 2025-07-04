import colors from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grayLighter,
    },
    scrollContainer: {
        padding: 24,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.grayLighter,
        gap: 20,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.grayLighter,
        gap: 30,
    },

    errorText: {
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 30,
    },
});
