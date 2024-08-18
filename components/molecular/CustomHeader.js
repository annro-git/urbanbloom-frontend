import { useNavigation } from "@react-navigation/native"
import { View, TouchableOpacity, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { UserRound } from "lucide-react-native"

import Logotype from "./Logotype"
import WeatherIcon from "./Weather/WeatherIcon"

/* AsyncStorage cleaner imports */
import { Trash2 } from "lucide-react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
/* -------------------------- */

const CustomHeader = ({ route }) => {

    const { navigate } = useNavigation()
    const isWeatherFocused = route.name === 'Weather'
    const isProfileFocused = route.name === 'Profile'

    return (
        <SafeAreaView
            style={{
                alignItems: 'center',
                backgroundColor: '#294849',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20,
                paddingTop: 0,
                gap: 20,
            }}
        >
            <StatusBar barStyle='light-content' backgroundColor='#294849' />
            <TouchableOpacity onPress={() => navigate('Accueil')}>
                <Logotype size={32} color={'white'} fontSize={18} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>

                {/* on press : empty urbanbloom AsyncStorage key, then navigate to Splash */}
                <TouchableOpacity onPress={() => {
                    AsyncStorage.removeItem('persist:urbanbloom')
                    navigate('Splash')
                }}>
                    <Trash2 color='red' size={16} />
                </TouchableOpacity>
                {/* --------------------------------------------------------------------- */}
                
                <TouchableOpacity onPress={() => navigate('Weather')}>
                    <WeatherIcon color= { isWeatherFocused ? '#FEC2A9' : '#BDCEBB' } />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Profile')}>
                    <UserRound size={32} color={ isProfileFocused ? '#FEC2A9' : '#BDCEBB' } />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default CustomHeader