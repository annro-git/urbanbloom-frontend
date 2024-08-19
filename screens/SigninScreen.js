import { ScrollView, View, Text } from "react-native"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateUser } from "../reducers/user"

import InputText from '../components/atomic/InputText'
import Button from "../components/atomic/Button"
import Logotype from "../components/molecular/Logotype"

const SigninScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const { navigate } = navigation
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSignin = async () => {
        const response = await fetch('http://192.168.1.24:3000/user/token', {
            method: 'GET',
            headers: {'Content-Type': 'application/json', email, password }
        })
        const json = await response.json()
        if(!json.result){
            setError(json.error)
            return
        }
        dispatch(updateUser({ email, password, token: json.token}))
        navigate('Tab')
    }

    return (
        <ScrollView contentContainerStyle={{
            alignItems: 'center',
            backgroundColor: 'white', 
            flex: 1,
            gap: 20,
            justifyContent: 'center',
            padding: 20,
        }}>
            <Logotype direction='vertical' color='#294849' size={64} fontSize={20} />
            <View
                style={{
                    width: '80%',
                    gap: 20,
                }}
            >
                {error && <Text style={{ color: 'red' }}>{ error }</Text>}
                <InputText
                    value={ email } 
                    onChangeText={ e => setEmail(e) } 
                    placeholder="Email" 
                    color="#C5BBA2" 
                    autoCapitalize="none" 
                    autoComplete="email" 
                    inputMode="email"
                />
                <InputText
                    value={ password } 
                    onChangeText={ e => setPassword(e) } 
                    placeholder="Mot de passe" 
                    color="#C5BBA2" 
                    secureTextEntry={ true } 
                    autoCapitalize="none" 
                    onSubmitEditing={() => handleSignin()}
                />
                <Button onPress={() => handleSignin()} text="Se connecter" primary="#294849" secondary="white" />
            </View>
        </ScrollView>
    )
}

export default SigninScreen