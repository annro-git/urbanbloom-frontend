import { View, Text } from "react-native"
import { Cloud, CloudDrizzle, CloudFog, CloudHail, CloudLightning, CloudRain, CloudRainWind, CloudSnow, CloudSun, CloudSunRain, Sun, Wind } from "lucide-react-native"

const WeatherIcon = ({ color }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10 }}>
            <CloudRain color={ color } size={32} />
            <Text style={{ color: color, fontSize: 16, fontFamily: 'Lato_700Bold' }}>19°C</Text>
        </View>
    )
}

export default WeatherIcon