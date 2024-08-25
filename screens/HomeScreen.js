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

   
    const { events } = useSelector(state => state.user);
    const [showAllEvents, setShowAllEvents] = useState(false);
    const user = useSelector(state => state.user)

    
    const displayedEvents = showAllEvents ? events : events.slice(0, 3);
   // const displayedPartages = showAllPartages ? partages : partages.slice(0, 3);

    if (!loaded) {
        return null
    }

    return (
        <ScrollView style={styles.scrollview}>
            <View style={styles.container}>
                <View style={styles.agendac}>
                    <Text style={styles.agenda}>Agenda</Text>
                    {displayedEvents.map((event, i) => (
                        <Event key={i} date={event.date} hour={event.hour} title={event.title} />
                    ))}
                    {events.length > 3 && (
                        <TouchableOpacity style={styles.showall} onPress={() => setShowAllEvents(!showAllEvents)}>
                            <LucideIcons.CircleEllipsis name={showAllEvents ? "expand-less" : "expand-more"} size={20} color="#2c4943" />
                        </TouchableOpacity>
                    )}
                </View>
                {/* <View style={styles.partagesc}>
                    <Text style={styles.partages}>Partages</Text>
                    {displayedPartages.map(partage => (
                        <Partages key={partage.id} username={partage.username} uriPP={partage.uriPP} />
                    ))}
                    {partages.length > 3 && (
                        <TouchableOpacity style={styles.showall} onPress={() => setShowAllPartages(!showAllPartages)}>
                            <LucideIcons.CircleEllipsis name={showAllPartages ? "expand-less" : "expand-more"} size={20} color="#2c4943" />
                        </TouchableOpacity>
                    )}
                </View> */}
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