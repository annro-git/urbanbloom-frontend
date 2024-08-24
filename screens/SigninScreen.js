import { ScrollView, View, Text } from "react-native"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
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
    const { token } = useSelector(state => state.user)

    useEffect(() => {
        fetch(`${global.BACKEND_URL}/user/gardens`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                dispatch(updateGardens(data.gardens))
            })
    }, [])

    const handleSignin = async () => {
        const response = await fetch(`${global.BACKEND_URL}/user/token`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', email, password }
        })
        const json = await response.json()
        if (!json.result) {
            setError(json.error)
            return
        }
        dispatch(updateUser({ email, token: json.token, username: json.username }))
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
                {error && <Text style={{ color: 'red' }}>{error}</Text>}
                <InputText
                    value={email}
                    onChangeText={e => setEmail(e)}
                    placeholder="Email"
                    color="#C5BBA2"
                    autoCapitalize="none"
                    autoComplete="email"
                    inputMode="email"
                />
                <InputText
                    value={password}
                    onChangeText={e => setPassword(e)}
                    placeholder="Mot de passe"
                    color="#C5BBA2"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onSubmitEditing={() => handleSignin()}
                />
                <Button onPress={() => handleSignin()} text="Se connecter" primary="#294849" secondary="white" />
            </View>
        </ScrollView>
    )
}

export default SigninScreen