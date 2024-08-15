import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function Event(props) {

    const { date, hour, title } = props;

    

    return (
        <View style={styles.container}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.hour}>{hour}</Text>
            <Text style={styles.title}>|   {title}</Text>  
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    date: {
        fontSize: 10,
    },
});