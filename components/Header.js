import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const Header = ({ style }) => {

    const inHeader = true;

    return (
        <View style={[styles.headerContainer, style]}>
        
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%',
        height: '15%',
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Header;