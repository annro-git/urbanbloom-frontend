import { StyleSheet, Text, View } from 'react-native';
import Logo from '../assets/logo.svg'

export default function LogotypeV() {
    return (
        <View style={styles.container}>
            {/* require('../assets/logo.svg') */}
            <Logo width={60} height={65} />
            <Text style={styles.logoa}>Urban<Text style={styles.logob}>Bloom</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    logoa: {
        fontFamily: 'Lato_300Light',
        fontSize: 24,
        textTransform: 'uppercase',
        color: '#666666',
        marginTop: 10,
    },
    logob: {
        fontFamily: 'Lato_900Black'
    }
  });