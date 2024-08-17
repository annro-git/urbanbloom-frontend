import React, { useEffect, useState } from 'react';
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

    const [fruits, setFruits] = useState([]);
    const [legumes, setLegumes] = useState([]);
    const [feta, setFeta] = useState([]);

    useEffect(() => {

        const fetchedFruits = [
            { id: 1, name: 'Pomme', image: 'https://img.freepik.com/photos-gratuite/delicieux-arrangement-pommes_23-2148917762.jpg?t=st=1723778683~exp=1723782283~hmac=e72bcca8b100eb06e013158418b159da350c29d1bea798b358303a4731d9a417&w=1060' },
            { id: 2, name: 'Poire', image: 'https://cdn.pixabay.com/photo/2022/10/01/23/26/pear-7492435_1280.jpg' },
            { id: 3, name: 'Amande', image: 'https://cdn.pixabay.com/photo/2013/02/20/11/30/almond-83766_1280.jpg' },
            { id: 4, name: 'Kaki', image: 'https://cdn.pixabay.com/photo/2015/12/19/17/38/fruit-1100023_1280.jpg' },
        ];

        setFruits(fetchedFruits);

        const fetchedLegumes = [
            { id: 1, name: 'Carotte', image: 'https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
            { id: 2, name: 'Concombre', image: 'https://cdn.pixabay.com/photo/2016/07/16/23/20/cucumber-1522921_1280.jpg' },
            { id: 3, name: 'Courgette', image: 'https://cdn.pixabay.com/photo/2016/08/30/12/05/zucchini-1630518_1280.jpg' },
            { id: 4, name: 'Aubergine', image: 'https://cdn.pixabay.com/photo/2018/10/26/18/38/eggplant-3775094_1280.jpg' },
        ];

        setLegumes(fetchedLegumes);

        const fetchFetA = [
            { id: 1, name: 'Giroflée', image: 'https://cdn.pixabay.com/photo/2022/05/10/14/33/wallflower-7187256_1280.jpg' },
            { id: 2, name: 'Rose', image: "https://get.pxhere.com/photo/plant-flower-petal-bloom-love-bouquet-gift-rose-red-romance-romantic-blooming-pink-flora-flowers-close-up-roses-petals-anniversary-valentine-bud-floristry-floribunda-macro-photography-valentine's-day-flowering-plant-garden-roses-rose-family-red-roses-flower-bouquet-land-plant-rose-order-916881.jpg" },
            { id: 3, name: 'Dahlia', image: 'https://cdn.pixabay.com/photo/2018/07/20/23/29/dahlia-3551658_1280.jpg' },
            { id: 4, name: 'Myrte', image: 'https://c.pxhere.com/photos/64/12/flower_myrtle_nature-638485.jpg!d' },

        ];

        setFeta(fetchFetA);

    }, [])

    if (!loaded) {
        return null
    }

    return (
        <View style={styles.container}>
            <Text style={styles.auxjardins}>Aux jardins</Text>
            <View style={styles.fruitsc}>
                <Text style={styles.fruits}>Fruits</Text>
                <View style={styles.listefruits}>
                    {fruits.map(fruit => (
                        <TouchableOpacity style={styles.touchable} key={fruit.id} >
                            <Image source={{ uri: fruit.image }} style={styles.logo} />
                            <Text>{fruit.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.legumesc}>
                <Text style={styles.legumes}>Légumes</Text>
                <View style={styles.listelegumes}>
                    {legumes.map(legume => (
                        <TouchableOpacity style={styles.touchable} key={legume.id} >
                            <Image source={{ uri: legume.image }} style={styles.logo} />
                            <Text>{legume.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.fetac}>
                <Text style={styles.fruits}>Fleurs et arbustes</Text>
                <View style={styles.listefeta}>
                    {feta.map(feta => (
                        <TouchableOpacity style={styles.touchable} key={feta.id} >
                            <Image source={{ uri: feta.image }} style={styles.logo} />
                            <Text>{feta.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#f0f0f0',
    },
    auxjardins: {
        fontFamily: 'Lato_400Regular',
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 10,
    },
    touchable: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    fruitsc: {
        marginBottom: 10,
        backgroundColor: '#fff',
        borderWidth: 5,
        borderRadius: 10,
        borderColor: '#f0f0f0',
    },
    fruits: {
        fontSize: 20,
        marginLeft: 10,
        marginBottom: 10,
    },
    listefruits: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    legumesc: {
        marginBottom: 10,
        backgroundColor: '#fff',
        borderWidth: 5,
        borderRadius: 10,
        borderColor: '#f0f0f0',
    },
    legumes: {
        fontSize: 20,
        marginLeft: 10,
        marginBottom: 10,
    },
    listelegumes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    fetac: {
        marginBottom: 10,
        backgroundColor: '#fff',
        borderWidth: 5,
        borderRadius: 10,
        borderColor: '#f0f0f0',
    },
    fetas: {
        fontSize: 20,
        marginLeft: 10,
        marginBottom: 10,
    },
    listefeta: {
        flexDirection: 'row',
        justifyContent: 'space-around',
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
});