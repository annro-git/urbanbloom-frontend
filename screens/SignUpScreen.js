
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
          
            <Text style={styles.title}>Bienvenue</Text>
            <View style={styles.inputC}>
                <Text style={styles.identifiant}>Identifiant</Text>
                <TextInput style={styles.input} placeholder="" />
            </View>
            <View style={styles.inputC}>
                <Text style={styles.email}>Email</Text>
                <TextInput style={styles.input} placeholder="" />
            </View>
            <View style={styles.inputC}>
                <Text style={styles.mdp}>Mot de passe</Text>
                <TextInput style={styles.input} placeholder="" />
            </View>
            <TouchableOpacity style={styles.seconnecterC} title="Créer un compte" onPress={() => navigation.navigate('TabNavigator')} >
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
        marginBottom: 20,
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
    identifiant: {
        fontFamily: 'Lato_700Bold',
        fontSize: 15,
    },
    email: {
        fontFamily: 'Lato_700Bold',
        fontSize: 15,
    },
    mdp: {
        fontFamily: 'Lato_700Bold',
        fontSize: 15,
    },
    seconnecterC: {
        width: '80%',
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 13,
        marginTop: 20,
    },
    seconnecter: {
        color: '#fff',
        textAlign: 'center',
    },
})