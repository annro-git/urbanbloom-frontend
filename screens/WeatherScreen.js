import { ScrollView, Text, View } from "react-native"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useIsFocused } from "@react-navigation/native"
import { ChevronsUp, ChevronsDown, Sun, CloudSun, CloudFog, CloudSunRain, CloudRain, CloudRainWind, CloudSnow, CloudLightning, Snowflake, CloudDrizzle, CloudHail } from "lucide-react-native"

import dayjs from 'dayjs'
import 'dayjs/locale/fr'

const wmoValues = [
    {wmo: 0, icon: Sun, text: 'Dégagé'},
    {wmo: 1, icon: Sun, text: 'Parsemé'},
    {wmo: 2, icon: CloudSun, text: 'Nuageux'},
    {wmo: 3, icon: CloudSun, text: 'Couvert'},
    {wmo: 45, icon: CloudFog, text: 'Brouillard'},
    {wmo: 48, icon: CloudFog, text: 'Brumeux'},
    {wmo: 51, icon: CloudFog, text: 'Bruine'},
    {wmo: 53, icon: CloudDrizzle, text: 'Bruine'},
    {wmo: 55, icon: CloudDrizzle, text: 'Bruine'},
    {wmo: 56, icon: CloudDrizzle, text: 'Bruine verglaçante'},
    {wmo: 57, icon: CloudDrizzle, text: 'Bruine verglaçante'},
    {wmo: 61, icon: CloudSunRain, text: 'Pluie'},
    {wmo: 63, icon: CloudSunRain, text: 'Pluie'},
    {wmo: 65, icon: CloudRain, text: 'Pluie'},
    {wmo: 66, icon: CloudRainWind, text: 'Pluie verglaçante'},
    {wmo: 67, icon: CloudRainWind, text: 'Pluie verglaçante'},
    {wmo: 71, icon: CloudSnow, text: 'Neige'},
    {wmo: 73, icon: CloudSnow, text: 'Neige'},
    {wmo: 75, icon: Snowflake, text: 'Neige'},
    {wmo: 77, icon: Snowflake, text: 'Neige'},
    {wmo: 80, icon: CloudRainWind, text: 'Averses'},
    {wmo: 81, icon: CloudRainWind, text: 'Averses'},
    {wmo: 82, icon: CloudRainWind, text: 'Averses'},
    {wmo: 85, icon: CloudSnow, text: 'Neige'},
    {wmo: 86, icon: CloudSnow, text: 'Neige'},
    {wmo: 95, icon: CloudLightning, text: 'Orageux'},
    {wmo: 96, icon: CloudHail, text: 'Grêle'},
    {wmo: 99, icon: CloudLightning, text: 'Orage et grêle'},
]

const WeatherScreen = () => {

    const isFocused = useIsFocused()
    const user = useSelector(state => state.user)
    const [weatherData, setWeatherData] = useState(null)
    const [locationName, setLocationName] = useState(null)


    // Get current weather and 7 days forecast from open-meteo
    useEffect(() => {
        (async() => {
            const { latitude, longitude } = user.lastLocation
            const omUrl = `https://api.open-meteo.com/v1/forecast?`
            const omReq = [
                `latitude=${latitude}`,
                `&longitude=${longitude}`,
                '&current=temperature_2m',
                '&current=relative_humidity_2m',
                '&current=weather_code',
                '&current=uv_index',
                '&forecast_hours=12',
                '&hourly=temperature_2m',
                '&hourly=weather_code',
                '&daily=temperature_2m_min',
                '&daily=temperature_2m_max',
                '&daily=weather_code',
            ]
            // console.log(omUrl+omReq.join(''))
            const response = await fetch(omUrl+omReq.join(''))
            const json = await (response.json())
            setWeatherData(json)
        })()
    }, [isFocused])
    
    // Get current location name from data.gouv
    useEffect(() => {
      (async() => {
        const { latitude, longitude } = user.lastLocation
        const response = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lat=${latitude}&lon=${longitude}`)
        const json = await response.json()
        setLocationName(json.features[0].properties.city)
      })()
    }, [isFocused])
    

    return (
        <ScrollView contentContainerStyle={{ minHeight: '100%', alignItems:'center', backgroundColor: '#F9F2E0' }}>
            <View style={{ width: '80%', gap: 20, paddingVertical: 20 }}>
                <Text style={{ fontSize: 20, color: '#000000BF', fontFamily: 'Lato_700Bold', color: '#294849', lineHeight: 24 }}>{locationName ? locationName : 'Emplacement inconnu'}</Text>
                {weatherData &&
                    <>
                    <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center', justifyContent:'space-between', backgroundColor: 'white', borderRadius: 10, padding: 20}}>
                        {wmoValues.find(e => weatherData.current.weather_code === e.wmo).icon.render({color: '#C5BBA2', size: 48})}
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                            <Text style={{ color: '#000000BF', fontFamily: 'Lato_700Bold', fontSize: 48}}>
                                {Math.round(weatherData.current.temperature_2m)}
                            </Text>
                            <View>
                                <Text style={{ color: '#000000BF', fontFamily: 'Lato_700Bold', fontSize: 20 }}>°C</Text>
                                <Text style={{ color: '#000000BF', fontFamily: 'Lato_400Regular', fontSize: 14, paddingLeft: 5 }}>{wmoValues[weatherData.current.weather_code].text}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 10}}>
                            <Text style={{ color: '#000000BF', fontFamily: 'Lato_400Regular', fontSize: 18 }}>
                                <ChevronsDown size={ 16 } color='#C5BBA2' />
                                { Math.floor(weatherData.daily.temperature_2m_min.reduce((a,c) => a + c, 0)/weatherData.daily.temperature_2m_min.length) }
                            </Text>
                            <Text style={{ color: '#000000BF', fontFamily: 'Lato_400Regular', fontSize: 18 }}>
                                <ChevronsUp size={ 16 } color='#C5BBA2' />
                                { Math.round(weatherData.daily.temperature_2m_max.reduce((a,c) => a + c, 0)/weatherData.daily.temperature_2m_max.length)}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 20 }}>
                        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20, flex: 1, flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#000000BF', fontFamily: 'Lato_400Regular', fontSize: 14 }}>Humidité:</Text>
                            <Text style={{ color: '#000000BF', fontFamily: 'Lato_700Bold', fontSize: 20 }}>{weatherData.current.relative_humidity_2m}%</Text>
                        </View>
                        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20, flex: 1, flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#000000BF', fontFamily: 'Lato_400Regular', fontSize: 14 }}>Indice UV: </Text>
                            <Text style={{ color: '#000000BF', fontFamily: 'Lato_700Bold', fontSize: 20 }}>{Math.floor(weatherData.current.uv_index)}</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: 20, color: '#000000BF', fontFamily: 'Lato_700Bold', color: '#294849', lineHeight: 24 }}>{dayjs(new Date()).locale('fr').format('dddd, D MMMM')}</Text>
                    <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
                        <ScrollView contentContainerStyle={{ flexDirection: 'row', gap: 30 }} horizontal={ true }>
                            {weatherData.hourly.time.map((hour, index) => {
                                const { temperature_2m, weather_code } = weatherData.hourly
                                return (
                                    <View key={index} style={{ justifyContent: 'center', alignItems: 'center', gap: 5}}>
                                        <Text style={{ color: '#000000BF', fontFamily: 'Lato_400Regular', fontSize: 12 }}>{dayjs(hour).locale('fr').format('HH:mm')}</Text>
                                        {wmoValues.find(e => weather_code[index] === e.wmo).icon.render({color: '#C5BBA2', size: 24})}
                                        <Text style={{ color: '#000000BF', fontFamily: 'Lato_700Bold', fontSize: 12 }}>{Math.round(temperature_2m[index])}°C</Text>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                    <Text style={{ fontSize: 20, color: '#000000BF', fontFamily: 'Lato_700Bold', color: '#294849', lineHeight: 24 }}>Cette semaine</Text>
                    <View style={{ gap: 20 }}>
                        {weatherData.daily.time.map((day, index) => {
                            if(index === 0) return
                            const { temperature_2m_min, temperature_2m_max, weather_code } = weatherData.daily
                            return (
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 10, padding: 20, alignItems: 'center' }}>
                                    <Text style={{ width: '35%', color: '#000000BF', fontFamily: 'Lato_400Regular', fontSize: 12 }}>{dayjs(day).locale('fr').format('dddd D MMM')}</Text>
                                    {wmoValues.find(e => weather_code[index] === e.wmo).icon.render({color: '#C5BBA2', size: 24})}
                                    <View style={{ flexDirection: 'row', gap: 2 }}>
                                        <ChevronsDown size={ 16 } color='#C5BBA2' />
                                        <Text style={{ color: '#000000BF', fontFamily: 'Lato_400Regular', fontSize: 12 }}>{ Math.floor(temperature_2m_min[index]) }°C</Text>
                                        <ChevronsUp size={ 16 } color='#C5BBA2' />
                                        <Text style={{ color: '#000000BF', fontFamily: 'Lato_400Regular', fontSize: 12 }}>{ Math.floor(temperature_2m_max[index]) }°C</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                    </>
                }
            </View>
        </ScrollView>
    )
}

export default WeatherScreen