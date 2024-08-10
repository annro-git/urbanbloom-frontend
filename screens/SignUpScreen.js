import LogotypeV from "../components/LogotypeV";
import { TouchableOpacity, StyleSheet, Text, View, TextInput } from 'react-native';
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato'

export default function SignUpScreen({ navigation }) {

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
            <View style={styles.identifiantC}>
                <Text style={styles.identifiant}>Identifiant</Text>
                <TextInput style={styles.input} placeholder="" />
            </View>
            <View style={styles.emailC}>
                <Text style={styles.email}>Email</Text>
                <TextInput style={styles.input} placeholder="" />
            </View>
            <View style={styles.mdpC}>
                <Text style={styles.mdp}>Mot de passe</Text>
                <TextInput style={styles.input} placeholder="" />
            </View>
            <TouchableOpacity style={styles.connecterC} title="Créer un compte" onPress={() => navigation.navigate('Sign-in')} >
                <Text style={styles.connecter}>Se connecter</Text>
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
        fontSize: 36,
        marginTop: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    identifiantC: {
        width: '80%',
    },
    emailC: {
        width: '80%',
    },
    mdpC: {
        width: '80%',
    },
    identifiant: {
        fontFamily: 'Lato_700Bold',
        fontSize: 18,
    },
    email: {
        fontFamily: 'Lato_700Bold',
        fontSize: 18,
    },
    mdp: {
        fontFamily: 'Lato_700Bold',
        fontSize: 18,
    },
})