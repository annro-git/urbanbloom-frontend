import { View } from "react-native"
import { useEffect } from "react"
import { useSelector } from "react-redux"

import Logotype from "../components/molecular/Logotype"
import Button from "../components/atomic/Button"
import AsyncStorageCleaner from "../components/atomic/AsyncStorageCleaner"

const SplashSreen = ({ navigation }) => {

    const { navigate } = navigation
    const isLogged = useSelector(state => state.user.token)

    useEffect(() => {
      isLogged.length !== 0 && navigate('Tab')
    }, [])
    

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
                <AsyncStorageCleaner navigate={ navigate } size={ 32 } />
            </View>
            {/* -------------------------------------------- */}
        </View>
    )
}

export default SplashSreen