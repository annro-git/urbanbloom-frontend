import { Text, View } from 'react-native';
import Logo from '../../assets/logo.svg'

const Logotype = props => {

    const ratio = 100*133/128/100

    return (
        <>
            <View
                style={[
                    props.direction === 'vertical' ? { flexDirection: 'column' } : { flexDirection: 'row' },
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10,
                    }
                ]}
            >
                <Logo width={props.size} height={props.size * ratio} color={props.color} />
                <Text style={{
                    color: props.color,
                    fontFamily: 'Lato_300Light', 
                    fontSize: props.fontSize,
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