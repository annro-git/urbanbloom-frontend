import { Text, View } from 'react-native';
import Logo from '../../assets/logo.svg'

const Logotype = ({ color, direction, fontSize, size }) => {

    const ratio = 100*133/128/100

    return (
        <>
            <View
                style={[
                    direction === 'vertical' ? { flexDirection: 'column' } : { flexDirection: 'row' },
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10,
                    }
                ]}
            >
                <Logo width={size} height={size * ratio} color={color} />
                <Text style={{
                    color: color,
                    fontFamily: 'Lato_300Light', 
                    fontSize: fontSize,
                    textTransform: 'uppercase', 
                }}>
                    Urban
                    <Text style={{ fontFamily: 'Lato_700Bold' }}>
                        Bloom
                    </Text>
                </Text>
            </View>
        </>
    )
}



export default Logotype