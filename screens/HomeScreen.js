import Header from '../components/Header';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Header title='Home' />
            <View>
                <Text>Agenda</Text>
                
            </View>
            <View> 
                <Text>Partages</Text>

            </View>
            <View>
                <Text>Au jardin</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});