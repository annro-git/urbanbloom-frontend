import { TouchableOpacity, View, Text } from "react-native"
import { useState } from "react"

import Logotype from "../components/molecular/Logotype"
import InputText from "../components/atomic/InputText"

const AuthScreen = ({ navigation }) =>  {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={{
            alignItems: 'center',
            backgroundColor: 'white', 
            flex: 1,
            gap: 20,
            justifyContent: 'center',
            padding: 20,
        }}>
            <Logotype direction='vertical' color='#FF0' size={64} />
            <InputText value={ email } onChangeText={e => setEmail(e)} placeholder='Email'/>
            <InputText value={ password } onChangeText={e => setPassword(e)} placeholder='Password' secureTextEntry={ true } />
            <TouchableOpacity onPress={() => navigation.navigate('Tab')}>
                <Text>GO</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AuthScreen