import { useNavigation } from "@react-navigation/native"
import { View, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { UserRound } from "lucide-react-native"

import Logotype from "./Logotype"
import WeatherIcon from "./Weather/WeatherIcon"

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
            }}
        >
            <TouchableOpacity onPress={() => navigate('Accueil')}>
                <Logotype size={32} color={'white'} fontSize={16} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', gap: 40 }}>
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