import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato';


export default function Event(props) {

    let [loaded] = useFonts({
        Lato_300Light,
        Lato_400Regular,
        Lato_700Bold,
        Lato_900Black,
      })
    
      if (!loaded) {
        return null
      }

    const { date, hour, title } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.hour}>{hour}</Text>
            <Text style={styles.title}>|      {title}</Text>
            <View style={styles.icons}>
                <TouchableOpacity>
                    <LucideIcons.CircleX size={20} color={'#ccc'} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <LucideIcons.CircleHelp size={20} color={'#ccc'} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <LucideIcons.CircleCheck size={20} color={'#ccc'} />
                </TouchableOpacity>
            </View>
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
        marginRight: 5,
        fontFamily: 'Lato_400Regular',
    },
    hour: {
        fontFamily: 'Lato_400Regular',
        marginRight: 20,
    },
    title: {
        fontFamily: 'Lato_400Regular',
        marginRight: 70,
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

});