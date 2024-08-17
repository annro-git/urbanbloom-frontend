import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato';

export default function Partage(props) {

    let [loaded] = useFonts({
        Lato_300Light,
        Lato_400Regular,
        Lato_700Bold,
        Lato_900Black,
    })



    const { username } = props;

    if (!loaded) {
        return null
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://avatar.iran.liara.run/public/boy?username=Ash' }} style={styles.logo} />
            <View style={styles.text}>
                <Text style={styles.partage}>{username}</Text>
                <Text style={styles.contenu}> a partagé un événement</Text>
            </View>
        </View>

    )


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
    logo: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10
    },
    partage: {
        fontFamily: 'Lato_400Regular',
    },
    contenu: {
        fontFamily: 'Lato_400Regular',
    },
    text: {
        flexDirection: 'column',
        justifyContent: 'flex-start',

    },
})