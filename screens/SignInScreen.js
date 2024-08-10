import LogotypeV from "../components/LogotypeV";
import { TouchableOpacity, StyleSheet, Text, View, TextInput } from 'react-native';
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato'

export default function SignInScreen({ navigation }) {

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
            <View style={styles.inputC}>
                <Text style={styles.identifiant}>Identifiant</Text>
                <TextInput style={styles.input} placeholder="" />
            </View>
            <View style={styles.inputC}>
                <Text style={styles.mdp}>Mot de passe</Text>
                <TextInput style={styles.input} placeholder="" />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Mdp oublié')} >
                <Text style={styles.mdpoublié}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.seconnecterC} title="Se connecter" onPress={() => navigation.navigate('Home')} >
                <Text style={styles.seconnecter}>Se connecter</Text>
            </TouchableOpacity>

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
        fontSize: 30,
        marginTop: 30,
        marginBottom: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        height: 40,
    },
    inputC: {
        width: '80%',
    },
    seconnecterC: {
        width: '80%',
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
    },
    seconnecter: {
        color: '#fff',
        textAlign: 'center',
    },
    identifiant: {
        fontFamily: 'Lato_700Bold',
        marginBottom: 5,
    },
    mdp: {
        fontFamily: 'Lato_700Bold',
        marginBottom: 5,
    },
    mdpoublié: {
        fontFamily: 'Lato_700Bold',
        color: '#000',
        marginTop: 10,
        marginBottom: 20,
        textDecorationLine: 'underline',
    }
});
