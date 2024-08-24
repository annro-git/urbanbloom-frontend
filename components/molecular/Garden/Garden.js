import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';


export default Garden = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: 'https://cdn.pixabay.com/photo/2016/03/02/13/56/wheelbarrow-1232408_1280.jpg' }}
                    style={styles.image}>
                </Image>
                <Text>
                    {props.name}
                </Text>
            </View>
            <View>
                <Text>
                    Présentation: {props.description}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        height: 200,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },
   
    button: {
        backgroundColor: 'lightgreen',
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
})