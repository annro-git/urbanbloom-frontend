import Header from '../components/Header';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default PostScreen = () => {
    return (
        <View style={styles.container}>
            <Header title='Post' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});