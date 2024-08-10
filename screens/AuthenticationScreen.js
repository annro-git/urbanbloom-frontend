import LogotypeV from "../components/LogotypeV";
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato'
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function AuthenticationScreen({ navigation }) {
    let [loaded] = useFonts({
        Lato_300Light,
        Lato_400Regular,
        Lato_700Bold,
        Lato_900Black,
    })

    if (!loaded) {
        return null
    }

    return (
        <View style={styles.container}>
            <LogotypeV />
            <Text style={styles.title}>Bonjour</Text>
            <Text>"Tagline"</Text>
            <TouchableOpacity style={styles.connecterC} title="Se connecter" onPress={() => navigation.navigate('Sign-in')} >
                <Text style={styles.connecter}>Se connecter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.créerC} title="Créer un compte" onPress={() => navigation.navigate('Sign-up')} >
                <Text style={styles.créer}>Créer un compte</Text>
            </TouchableOpacity>
            <Text styles={styles.continuer}>Continuer avec:</Text>
            <View style={styles.socials}>
                <FontAwesome name='google' size={25} color='#ec6e5b' />
                <FontAwesome name='apple' size={25} color='#000' />
                <FontAwesome name='facebook' size={25} color='#3b5998' />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Lato_900Black',
        fontSize: 36,
        marginTop: 30,
    },
    socials: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        marginTop: 20,
    },
    connecterC: {
        marginTop: 20,
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    connecter: {
        color: 'white',
        fontFamily: 'Lato_400Regular',
    },
    créerC: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    créer: {
        color: 'black',
        fontFamily: 'Lato_400Regular',
    },
    continuer: {
        fontFamily: 'Lato_400Regular',
    }
});