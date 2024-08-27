
import { TouchableOpacity, StyleSheet, Text, View, TextInput } from 'react-native';
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato'

    export default function ForgotPassword({ navigation}) {

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
              
                <Text style={styles.title}>Mot de passe oublié</Text>
                <View style={styles.inputC}>
                    <Text style={styles.email}>Email</Text>
                    <TextInput style={styles.input} placeholder="" />
                </View>
                <TouchableOpacity style={styles.reinitialiserC} title="Envoyer" onPress={() => navigation.navigate('Sign-in')} >
                    <Text style={styles.reinitialiser}>Réinitialiser mon mot de passe</Text>
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
            fontSize: 25,
            marginTop: 20,
            marginBottom: 30,
        },
        inputC: {
            width: '80%',
        },
        input: {
            borderWidth: 1,
            borderColor: 'black',
            padding: 10,
            borderRadius: 5,
            marginBottom: 20,
            height: 40,
        },
        
        reinitialiser: {
            fontFamily: 'Lato_700Bold',
            fontSize: 15,
            color: 'white',
        },
        reinitialiserC: {
            backgroundColor: 'black',
            paddingTop: 10,
            paddingBottom: 13,
            borderRadius: 5,
            width: '80%',
            alignItems: 'center',
            marginBottom: 20,
        },
    })