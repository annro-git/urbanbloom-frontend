import { ScrollView, View, Text } from "react-native"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateUser } from "../reducers/user"

import InputText from '../components/atomic/InputText'
import Button from "../components/atomic/Button"
import Logotype from "../components/molecular/Logotype"

const SignupScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const { navigate } = navigation

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSignup = async () => {
        const newUser = { username, email, password }
        const response = await fetch('http://192.168.1.24:3000/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        })
        const json = await response.json()
        if(!json.result){
            if(json.error.errors){
                setError(json.error.message)
                return
            }
            setError(json.error)
            return
        }
        dispatch(updateUser({ username, email, token: json.token }))
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
                <InputText value={ username } onChangeText={ e => setUsername(e) } placeholder="Identifiant" color="#C5BBA2" />
                <InputText value={ email } onChangeText={ e => setEmail(e) } placeholder="Email" color="#C5BBA2" autoCapitalize="none" autoComplete="email" inputMode="email" />
                <InputText value={ password } onChangeText={ e => setPassword(e) } placeholder="Mot de passe" color="#C5BBA2" secureTextEntry={ true } autoCapitalize="none" />
                <Button onPress={() => handleSignup()} text="Créer un compte" primary="#294849" secondary="white" />
            </View>
        </ScrollView>
    )
}

export default SignupScreen