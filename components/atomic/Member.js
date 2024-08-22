import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';


export default Member = (props) => {

    return (
        <View style={styles.container}>
            <Image source={{ uri: props.uriPP }}></Image>
        </View>
    )
}