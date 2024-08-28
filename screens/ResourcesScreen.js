
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ResourcesGroup from '../components/molecular/Resources/ResourcesGroup';
import { useFocusEffect } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

export default ResourcesScreen = ({ navigation }) => {

    /* const [isReset, setIsReset] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            if (!isReset) {
                const resetAction = CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Resources' }],
                });
                navigation.dispatch(resetAction);
                setIsReset(true);
            }
        }, [navigation, isReset])
    ); */

    const resources = ['Légumes', 'Fruits', 'Fleurs', 'Outils']

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', }}>
                <Text style={styles.title}>Ressources</Text>
            </View>
            <View style={styles.resourcescontainer}>

                {resources.map((resource, i) => {
                    return <TouchableOpacity style={styles.touchable} key={i} onPress={() => navigation.navigate(resource)}>
                        <ResourcesGroup key={i} name={resource} />
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
        alignItems: 'center',
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
        backgroundColor: '#F9F3E0',
        paddingBottom: 60,
        justifyContent: 'center',
    },
    touchable: {
        width: '40%',
        height: '45%',
        margin: 15,

    }

});