import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


export default FruitsScreen = () => {

    const { token } = useSelector(state => state.user)
    const [fruits, setFruits] = useState([])

    useEffect(() => {
        fetch(`${global.BACKEND_URL}/user/pages`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token
            },
        })
            .then(response => response.json())
            .then(data => {
                setFruits(data.pages.fruits)
            })
            .catch(error => console.error(error))
    }
        , []);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const options = { day: '2-digit', month: '2-digit' };
        return date.toLocaleDateString('fr-FR', options); // Vous pouvez personnaliser le format ici
    };

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.fruits}>Fruits</Text>
            </View>
            <ScrollView>
                {fruits.map((fruit, i) => {
                    return (<View key={i} styles={styles.fruitcontainer}>
                        <View style={styles.header}>
                            <View style={{  alignItems: 'center', width: '50%' }}>
                                <Image source={{ uri: fruit.image }} style={{ borderRadius: 50, height: 60, width: '35%'}} />
                                <Text style={styles.name}>{fruit.name}</Text>
                            </View>
                            <View style={styles.dates}>
                                <Text style={styles.sow}>Semis: {formatDate(fruit.sow.start)} au {formatDate(fruit.sow.end)}</Text>
                                <Text style={styles.harvest}>Récolte: {formatDate(fruit.harvest.start)} au {formatDate(fruit.harvest.end)}</Text>
                            </View>
                        </View>
                        <Text style={styles.text}>{fruit.text}</Text>
                    </View>
                    )
                })}
            </ScrollView>
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
    fruits: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 25,
        marginBottom: 5,
        textAlign: 'center',
        borderRadius: 10,
        width: 200,

    },
    header: {
       
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    fruitcontainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 15,
        padding: 15,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 20,
        marginTop: 5,   
    },
    text: {
        fontSize: 16,
        margin: 20,
        textAlign: 'justify',
        marginBottom: 35,
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
        borderBottomWidth: 1,
        marginBottom: 35,
    },
    dates: {
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    


});