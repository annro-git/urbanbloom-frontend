import { StyleSheet, Text, View } from 'react-native';
import Logo from '../assets/logo.svg'

export default function LogotypeVHeader() {
    return (
        <View style={styles.container}>
            {/* require('../assets/logo.svg') */}
            <Logo width={30} height={35} style={styles.logo}/>
            <Text style={styles.logoa}>Urban<Text style={styles.logob}>Bloom</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: 20,
        alignItems: 'center',
    },
    logo: {
       
    },
    logoa: {
        fontFamily: 'Lato_300Light',
        fontSize: 15,
        textTransform: 'uppercase',
        color: '#666666',
    },
    logob: {
        fontFamily: 'Lato_900Black',
    },
  });