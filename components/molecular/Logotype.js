import { Text, View } from 'react-native';
import Logo from '../../assets/logo.svg'

const Logotype = props => {
    return (
        <>
            {props.direction === 'vertical'
                ?<View>
                    <Logo width={props.size} height={props.size} fill='red' />
                </View>
                :<View>
                    <Logo width={props.size} fill={props.color} />
                </View>
            }
        </>
    )
}



export default Logotype