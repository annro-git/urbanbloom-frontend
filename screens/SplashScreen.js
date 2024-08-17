import { View, TouchableOpacity } from "react-native"
import { Trash2 } from "lucide-react-native"

import AsyncStorage from "@react-native-async-storage/async-storage"
import Logotype from "../components/molecular/Logotype"
import Button from "../components/atomic/Button"

const SplashSreen = ({ navigation }) => {

    const { navigate } = navigation

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
            <View
                style={{
                    width: '80%',
                    gap: 20,
                }}
            >
                <Button onPress={() => navigate('SignIn')} text="Se connecter" primary="#294849" secondary="white" />
                <Button onPress={() => navigate('SignUp')} text="Créer un compte" primary="white" secondary="#294849" border="#294849" />
            </View>

            {/* on press : empty urbanbloom AsyncStorage key */}
            <View style={{ position: "absolute", bottom: 0, right: 0, margin: 20}}>
                <TouchableOpacity onPress={() => AsyncStorage.removeItem('persist:urbanbloom')}>
                    <Trash2 color='red' size={32} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SplashSreen