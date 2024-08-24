import { useNavigation } from "@react-navigation/native"
import { View, TouchableOpacity, StatusBar, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { UserRound } from "lucide-react-native"
import { updateLocation } from "../../reducers/user"

import * as Location from 'expo-location'
import Logotype from "./Logotype"
import WeatherIcon from "./Weather/WeatherIcon"
import AsyncStorageCleaner from "../atomic/AsyncStorageCleaner"

const CustomHeader = ({ route }) => {

    const dispatch = useDispatch()
    const { navigate } = useNavigation()

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if(status === 'granted'){
                await Location.watchPositionAsync({ distanceInterval: 10 },
                (location) => {
                    const { latitude, longitude } = location.coords
                    dispatch(updateLocation({ latitude, longitude }))
                })
            }
        })()
    }, [])

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
                <AsyncStorageCleaner navigate={ navigate } size={ 16 }/>
                {/* --------------------------------------------------------------------- */}
                
                <TouchableOpacity onPress={() => navigate('Weather')}>
                    <WeatherIcon color= { route.name === 'Weather' ? '#FEC2A9' : '#BDCEBB' } />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Profile')}>
                    <UserRound size={32} color={ route.name === 'Profile' ? '#FEC2A9' : '#BDCEBB' } />
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
