import { StyleSheet, Text, View } from 'react-native';
import Logo from '../assets/logo.svg'

export default function LogotypeV(props) {
    return (
        <View style={[styles.container, props.inHeader ? styles.containerinheader : null]}>
            {/* require('../assets/logo.svg') */}
            <Logo width={props.width} height={props.height} />
            <Text style={[styles.logoa, props.inHeader ? styles.logoainheader : null]}>Urban
                <Text style={styles.logob}>Bloom</Text>
            </Text>
        </View >
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
    },
    containerinheader: {
        flexDirection: 'row',
        paddingLeft: 20,
    },
    logoainheader: {
        fontFamily: 'Lato_300Light',
        fontSize: 15,
        textTransform: 'uppercase',
        color: '#666666',
        marginLeft: 5,
        marginBottom: 11,
    }
});