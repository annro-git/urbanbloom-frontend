import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LogotypeVHeader from './LogotypeVHeader';

const Header = ({ style }) => {
    return (
        <View style={[styles.headerContainer, style]}>
            <LogotypeVHeader />
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