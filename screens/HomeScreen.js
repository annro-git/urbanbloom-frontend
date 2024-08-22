import Event from '../components/molecular/Event';
import Partages from '../components/molecular/Partages/Partages';
import AuJardin from '../components/molecular/Garden/AuJardin';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
    const [partages, setPartages] = useState([]);
    const [showAllEvents, setShowAllEvents] = useState(false);
    const [showAllPartages, setShowAllPartages] = useState(false);

    const { token } = useSelector(state => state.user);

    useEffect(() => {

        fetch(`${global.BACKEND_URL}/gardens`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            }
        }
        )
            .then(response => response.json())
            .then(data => dispatch(updateGardens(data)))



        fetch(`${global.BACKEND_URL}/events`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                },
            }
        )
            .then(response => response.json())
            .then(data => setEvents(data))

        /* const fetchedEvents = [
            { id: 1, date: '01/01/2024', hour: '10:00', title: 'Event 1' },
            { id: 2, date: '02/01/2024', hour: '11:00', title: 'Event 2' },
            { id: 3, date: '03/01/2024', hour: '12:00', title: 'Event 3' },
            { id: 4, date: '04/01/2024', hour: '13:00', title: 'Event 4' },
        ]; */

        const fetchedPartages = [
            { id: 1, username: 'John Doe', uriPP: 'https://avatar.iran.liara.run/public/35' },
            { id: 2, username: 'Jane Doe', uriPP: 'https://avatar.iran.liara.run/public/71' },
            { id: 3, username: 'Ash', uriPP: 'https://avatar.iran.liara.run/public/41' },
            { id: 4, username: 'Yoda', uriPP: 'https://avatar.iran.liara.run/public/45' },
        ];
        setPartages(fetchedPartages);
    }, []);

    const displayedEvents = showAllEvents ? events : events.slice(0, 3);
    const displayedPartages = showAllPartages ? partages : partages.slice(0, 3);

    if (!loaded) {
        return null
    }

    return (
        <ScrollView style={styles.scrollview}>
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
                <View style={styles.partagesc}>
                    <Text style={styles.partages}>Partages</Text>
                    {displayedPartages.map(partage => (
                        <Partages key={partage.id} username={partage.username} uriPP={partage.uriPP} />
                    ))}
                    {partages.length > 3 && (
                        <TouchableOpacity style={styles.showall} onPress={() => setShowAllPartages(!showAllPartages)}>
                            <LucideIcons.CircleEllipsis name={showAllPartages ? "expand-less" : "expand-more"} size={20} color="#2c4943" />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.aujardin}>
                    <AuJardin />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollview: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    agendac: {
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: '#f0f0f0',
        paddingBottom: 10,
    },
    agenda: {
        fontSize: 20,
        marginLeft: 10,
    },
    event: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    showall: {
        alignItems: 'center',
        marginTop: 5,
        marginBottom: -5,
    },
    partagesc: {
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        paddingBottom: 10,
    },
    partages: {
        fontSize: 20,
        marginLeft: 10,
    },

});