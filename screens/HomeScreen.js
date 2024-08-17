import Event from '../components/molecular/Event';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato';
import * as LucideIcons from 'lucide-react-native';

export default HomeScreen = () => {

    let [loaded] = useFonts({
        Lato_300Light,
        Lato_400Regular,
        Lato_700Bold,
        Lato_900Black,
      })
    
    const [events, setEvents] = useState([]);
    const [showAllEvents, setShowAllEvents] = useState(false);

    useEffect(() => {

        const fetchedEvents = [
            { id: 1, date: '01/01/2022', hour: '10:00', title: 'Event 1' },
            { id: 2, date: '02/01/2022', hour: '11:00', title: 'Event 2' },
            { id: 3, date: '03/01/2022', hour: '12:00', title: 'Event 3' },
            { id: 4, date: '04/01/2022', hour: '13:00', title: 'Event 4' },
        ];
        setEvents(fetchedEvents);
    }, []);

    const displayedEvents = showAllEvents ? events : events.slice(0, 3);

    if (!loaded) {
        return null
      }

    return (
        <View style={styles.container}>
            <View style={styles.agendac}>
                <Text style={styles.agenda}>Agenda</Text>
                {displayedEvents.map(event => (
                    <Event key={event.id} date={event.date} hour={event.hour} title={event.title} />
                ))}
                {events.length > 3 && (
                    <TouchableOpacity style={styles.showall} onPress={() => setShowAllEvents(!showAllEvents)}>
                        <LucideIcons.CircleEllipsis name={showAllEvents ? "expand-less" : "expand-more"} size={20} color="#2c4943" />
                    </TouchableOpacity>
                )}
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
    agendac: {
        marginBottom: 20,
        marginTop: 10,
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
    showall: {
        marginTop: 10,
        alignItems: 'center',
    },
});