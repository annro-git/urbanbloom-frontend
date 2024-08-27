
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ResourcesGroup from '../components/molecular/Resources/ResourcesGroup';

const resources = ['Légumes', 'Fruits', 'Fleurs', 'Outils']

export default ResourcesScreen = () => {
    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center', }}>
                <Text style={styles.title}>Ressources</Text>
            </View>
            <View style={styles.resourcescontainer}>

                {resources.map((resource, i) => {
                    return <TouchableOpacity key={i} onPress={() => navigation.navigate(resource)}>
                        <ResourcesGroup key={i} style={styles.resource} name={resource} />
                    </TouchableOpacity>
                })}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        backgroundColor: '#F9F3E0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 25,
        textAlign: 'center',
        borderRadius: 10,
        width: 200,
        textDecorationLine: 'underline',
    },
    resourcescontainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: '#F9F3E0',
        paddingBottom: 60,
    },
    resource: {
        margin: 10,
    },

});