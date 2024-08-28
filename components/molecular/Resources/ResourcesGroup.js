import { StyleSheet, View, Text, ImageBackground } from 'react-native';


export default ResourcesGroup = ({ name }) => {


    const images = {
        'Légumes': require('../../../assets/vecteezy_group-of-fresh-tomatoes-and-organic-vegetables-background-in_2286671.jpg'),
        'Fruits': require('../../../assets/vecteezy_colorful-fruit-in-stands_1955168.jpg'),
        'Fleurs': require('../../../assets/flowers-398941_640.jpg'),
        'Outils': require('../../../assets/shed-2806281_640.jpg'),
    };

    const imageSource = images[name];

    return (
        <View style={styles.container} >
            <ImageBackground source={imageSource} style={styles.background} resizeMode="cover">
                <Text style={styles.title}>{name}</Text>
            </ImageBackground>
        </View>
    );

}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
    },
    background: {
        backgroundColor: '#fff',
        alignItems: 'center',
        overflow: 'hidden',
        height: '100%',
        width: '100%',
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 20,
        textShadowRadius: 10,
        textShadowColor: '#fff',
    },
});
