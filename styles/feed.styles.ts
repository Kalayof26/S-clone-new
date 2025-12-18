import { StyleSheet } from 'react-native';

export const feedStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#222',
    },
    storiesContainer: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    postsContainer: {
        paddingHorizontal: 0,
    },
});
