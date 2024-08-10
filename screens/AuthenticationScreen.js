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
            <View style={styles.titlecontainer}>
                <Text style={styles.title}>Bonjour</Text>
                <Text>"Tagline"</Text>
            </View>
            <TouchableOpacity style={styles.seconnecterC} title="Se connecter" onPress={() => navigation.navigate('Sign-in')} >
                <Text style={styles.seconnecter}>Se connecter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.créerC} title="Créer un compte" onPress={() => navigation.navigate('Sign-up')} >
                <Text style={styles.créer}>Créer un compte</Text>
            </TouchableOpacity>
            <Text styles={styles.continuer}>Continuer avec:</Text>
            <View style={styles.socials}>
                <FontAwesome name='google' size={25} color='#000' />
                <FontAwesome name='apple' size={25} color='#000' />
                <FontAwesome name='facebook' size={25} color='#000' />
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
    titlecontainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontFamily: 'Lato_900Black',
        fontSize: 30,
        marginTop: 30,
    },
    socials: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        marginTop: 10,
    },
    seconnecterC: {
        width: '80%',
        marginTop: 20,
        backgroundColor: 'black',
        paddingTop: 10,
        paddingBottom: 13,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    seconnecter: {
        color: 'white',
        fontFamily: 'Lato_400Regular',
        textAlign: 'center',
    },
    créerC: {
        width: '80%',
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 40,
        paddingTop: 10,
        paddingBottom: 13,
    },
    créer: {
        color: 'black',
        fontFamily: 'Lato_400Regular',
        textAlign: 'center',
    },
    continuer: {
        fontFamily: 'Lato_400Regular',
    },

});