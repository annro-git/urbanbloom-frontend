import { View, Text } from "react-native"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Sun, CloudSun, CloudFog, CloudSunRain, CloudRain, CloudRainWind, CloudSnow, CloudLightning, Snowflake, CloudDrizzle, CloudHail } from "lucide-react-native"

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

    return (
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', }}>
            {weatherIcon.wmo &&
                wmoValues.find(e => e.wmo === weatherIcon.wmo).icon.render({color, size: 32})
            }
            { weatherIcon.temp &&
                <Text style={{ color: color, fontSize: 16, fontFamily: 'Lato_700Bold' }}>{Math.round(weatherIcon.temp)}°C</Text>
            }
        </View>
    )
}

export default WeatherIcon