import Header from '../components/Header';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default SearchScreen = () => {
    return (
        <View style={styles.container}>
            <Header title='Search' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});