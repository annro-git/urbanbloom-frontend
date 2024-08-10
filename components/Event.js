import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function Event() {
    return (
        <View style={styles.container}>
            <Text>Event</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});