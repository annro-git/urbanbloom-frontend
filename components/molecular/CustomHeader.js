import { useNavigation } from "@react-navigation/native"
import { View, TouchableOpacity, StatusBar, StyleSheet } from "react-native"
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
            <StatusBar barStyle='light-content' backgroundColor='#294849' />
            <TouchableOpacity onPress={() => navigate('Accueil')}>
                <Logotype size={32} color={'white'} fontSize={16} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', gap: 40 }}>
                <TouchableOpacity onPress={() => navigate('Weather')}>
                    <WeatherIcon color={isWeatherFocused ? '#FEC2A9' : '#BDCEBB'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Profile')}>
                    <UserRound size={32} color={isProfileFocused ? '#FEC2A9' : '#BDCEBB'} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default CustomHeader

const styles = StyleSheet.create({

    logob: {
        fontFamily: 'Lato_900Black'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoa: {
        fontFamily: 'Lato_300Light',
        fontSize: 15,
        textTransform: 'uppercase',
        color: 'black',
        marginLeft: 5,
    },
    weather: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 65,
    },
    ppc : {
        marginLeft: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilpicture: {
        width: 30,
        height: 30,
        borderRadius: 15,
    }
});
