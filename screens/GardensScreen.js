import Header from '../components/Header';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default GardensScreen = () => {
    return (
        <View style={styles.container}>
            <Header title='Gardens' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});