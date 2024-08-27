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
        <ImageBackground source={imageSource} style={styles.background}>
            
                <Text style={styles.title}>{name}</Text>
            
        </ImageBackground>
    );

}


const styles = StyleSheet.create({

    
    background: {
        backgroundColor: '#fff',
        alignItems: 'center',
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        width: 350,
        height: 475,

   
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 20,
        textShadowRadius: 10, 
        textShadowColor: '#fff', 
    },
});
