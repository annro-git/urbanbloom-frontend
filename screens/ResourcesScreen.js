import Header from '../components/Header';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default RessourcesScreen = () => {
    return (
        <View style={styles.container}>
            <Header title='Ressources' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});