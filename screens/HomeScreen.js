
import Event from '../components/Event';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

export default HomeScreen = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        
        const fetchedEvents = [
            { id: 1, date: '01/01/2022', hour: '10:00', title: 'Event 1' },
            { id: 2, date: '02/01/2022', hour: '11:00', title: 'Event 2' },
        ];
        setEvents(fetchedEvents);
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.agenda}>Agenda</Text>
                {events.map(event => (
                    <Event key={event.id} date={event.date} hour={event.hour} title={event.title} />
                ))}
            </View>
            <View> 
                <Text style={styles.partages}>Partages</Text>

            </View>
            <View>
                <Text style={styles.aujardin}>Au jardin</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    agenda: {
        fontSize: 20,
    },
    partages: {
        fontSize: 20,
    },
    aujardin: {
        fontSize: 20,
    },
    event: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});