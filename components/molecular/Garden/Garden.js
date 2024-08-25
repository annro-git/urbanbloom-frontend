import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as LucideIcons from 'lucide-react-native';


export default Garden = ({ name, gpURI, description, chooseGP }) => {

    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { chooseGP(name) }} style={styles.touchablepp}>
                    {(!gpURI || gpURI.length === 0 || gpURI.includes(null)) && <View >
                        <LucideIcons.HousePlus style={styles.nopp} size={50} color={"black"} opacity={0.5} />
                    </View>}
                    {gpURI && gpURI.length > 0 && !gpURI.includes(null) && <Image source={{ uri: gpURI }} style={styles.gpuri} />}
                </TouchableOpacity>
                <Text style={styles.name}>
                    {name}
                </Text>
            </View>
            <View style={styles.descriptionc}>
                <Text>
                    Présentation: {description}
                </Text>
            </View>
            <View>
                <TouchableOpacity style={styles.voirc}>
                    <Text>Voir</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5F7C7D',
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
    name: {
        fontSize: 20,
        marginLeft: 15,
    },

    button: {
        backgroundColor: 'lightgreen',
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    descriptionc: {
        marginTop: 10,
        height: '30%',
    },
    voirc: {
        alignSelf: 'center',
        backgroundColor: 'lightblue',
        borderRadius: 10,
        marginTop: 30,
        width: '20%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
    },
    gpuri: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    nopp: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 1,
    },
})