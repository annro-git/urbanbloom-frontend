import { TouchableOpacity, View, Text } from "react-native"
import { useState, useEffect } from "react"
import { Trash2 } from "lucide-react-native"

import Logotype from "../components/molecular/Logotype"
import InputText from "../components/atomic/InputText"
import AsyncStorage from "@react-native-async-storage/async-storage"

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
            <Logotype direction='vertical' color='#294849' size={64} fontSize={20} />
            <InputText value={ email } onChangeText={e => setEmail(e)} placeholder='Email'/>
            <InputText value={ password } onChangeText={e => setPassword(e)} placeholder='Password' secureTextEntry={ true } />
            <TouchableOpacity onPress={() => navigation.navigate('Tab')}>
                <Text>GO</Text>
            </TouchableOpacity>

            {/* on press : empty urbanbloom AsyncStorage key */}
            <View style={{ position: "absolute", bottom: 0, right: 0, margin: 20}}>
                <TouchableOpacity onPress={() => AsyncStorage.removeItem('persist:urbanbloom')}>
                    <Trash2 color='red' size={32} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AuthScreen