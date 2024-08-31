import { View, Text } from "react-native"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Sun, CloudSun, CloudFog, CloudSunRain, CloudRain, CloudRainWind, CloudSnow, CloudLightning, Snowflake, CloudDrizzle, CloudHail } from "lucide-react-native"

const wmoValues = {
    0: {icon: Sun, text: 'Dégagé'},
    1: {icon: Sun, text: 'Parsemé'},
    2: {icon: CloudSun, text: 'Nuageux'},
    3: {icon: CloudSun, text: 'Couvert'},
    45: {icon: CloudFog, text: 'Brouillard'},
    48: {icon: CloudFog, text: 'Brumeux'},
    51: {icon: CloudFog, text: 'Bruine'},
    53: {icon: CloudDrizzle, text: 'Bruine'},
    55: {icon: CloudDrizzle, text: 'Bruine'},
    56: {icon: CloudDrizzle, text: 'Bruine verglaçante'},
    57: {icon: CloudDrizzle, text: 'Bruine verglaçante'},
    61: {icon: CloudSunRain, text: 'Pluie'},
    63: {icon: CloudSunRain, text: 'Pluie'},
    65: {icon: CloudRain, text: 'Pluie'},
    66: {icon: CloudRainWind, text: 'Pluie verglaçante'},
    67: {icon: CloudRainWind, text: 'Pluie verglaçante'},
    71: {icon: CloudSnow, text: 'Neige'},
    73: {icon: CloudSnow, text: 'Neige'},
    75: {icon: Snowflake, text: 'Neige'},
    77: {icon: Snowflake, text: 'Neige'},
    80: {icon: CloudRainWind, text: 'Averses'},
    81: {icon: CloudRainWind, text: 'Averses'},
    82: {icon: CloudRainWind, text: 'Averses'},
    85: {icon: CloudSnow, text: 'Neige'},
    86: {icon: CloudSnow, text: 'Neige'},
    95: {icon: CloudLightning, text: 'Orageux'},
    96: {icon: CloudHail, text: 'Grêle'},
    99: {icon: CloudLightning, text: 'Orage et grêle'},
}

const WeatherIcon = ({ color }) => {

    const user = useSelector(state => state.user)
    const [weatherIcon, setWeatherIcon] = useState({temp: '', wmo: ''})

    useEffect(() => {
        const { latitude, longitude } = user.lastLocation
        if(latitude && longitude){
            (async() => {
                const omUrl = `https://api.open-meteo.com/v1/forecast?`
                const omReq = [
                    `latitude=${latitude}`,
                    `&longitude=${longitude}`,
                    '&current=temperature_2m',
                    '&current=weather_code',
                ]
                const response = await fetch(omUrl+omReq.join(''))
                const json = await (response.json())
                setWeatherIcon({ temp: json.current.temperature_2m, wmo: json.current.weather_code })
            })()
        }
    }, [user])

    console.log(weatherIcon)

    return (
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', }}>
            {weatherIcon.wmo &&
                wmoValues[weatherIcon.wmo].icon.render({color, size: 32})
            }
            { weatherIcon.temp &&
                <Text style={{ color: color, fontSize: 16, fontFamily: 'Lato_700Bold' }}>{Math.round(weatherIcon.temp)}°C</Text>
            }
        </View>
    )
}

export default WeatherIcon