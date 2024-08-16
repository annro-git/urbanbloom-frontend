import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import Logotype from "../molecular/Logotype"
import { useEffect, useState } from "react"
import * as LucideIcons from 'lucide-react-native';

const CustomHeader = props => {

    const IP = '192.168.1.11'
    const token = '1kng1LLkUufcsktC3AhLD3P4N0MkepXn'

    const [cityName, setCityName] = useState('Paris')
    const [temp, setTemp] = useState('')
    const [weatherIcon, setWeatherIcon] = useState('')
    const [ppURI, setPpURI] = useState("https://avatar.iran.liara.run/public/boy?username=Ash")

    console.log(ppURI);

    const fetchWeather = async () => {

        try {
            const response = await fetch(`http://${IP}:3000/user/weather/${cityName}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTemp(Math.round(data.data.main.temp) + '°C');

            let icon;
            switch (data.data.weather[0].main) {
                case 'Clouds':
                    icon = <LucideIcons.Cloud size={24} color="black" />;
                    break;
                case 'Rain':
                    icon = <LucideIcons.CloudRain size={24} color="black" />;
                    break;
                case 'Clear':
                    icon = <LucideIcons.Sun size={24} color="black" />;
                    break;
                case 'Snow':
                    icon = <LucideIcons.CloudSnow size={24} color="black" />;
                    break;
                case 'Thunderstorm':
                    icon = <LucideIcons.CloudLightning size={24} color="black" />;
                    break;
                case 'Drizzle':
                    icon = <LucideIcons.CloudDrizzle size={24} color="black" />;
                    break;
                case 'Mist':
                    icon = <LucideIcons.CloudFog size={24} color="black" />;
                    break;
                default:
                    icon = <LucideIcons.Cloud size={24} color="black" />;
                    break;
            }
            setWeatherIcon(icon);
        } catch (error) {
            console.error('Fetch weather failed:', error);
            // Vous pouvez définir un état d'erreur ici si nécessaire
        }
    };

    const fetchProfilePicture = async () => {
        try {
            const response = await fetch(`http://${IP}:3000/user/infos`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    }
                });
           
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data)
            setPpURI(data.user.ppURI);
        } catch (error) {
            console.error('Fetch profile picture failed:', error);
        }


    }

    useEffect(() => {
        fetchWeather();
        fetchProfilePicture();
    }, [])

    return (
        <View>
            <View style={styles.container}>
                <Logotype size={35} />
                <Text style={styles.logoa}>Urban<Text style={styles.logob}>Bloom</Text></Text>
                <TouchableOpacity style={styles.weather}>
                    {weatherIcon}
                    <Text>{temp}</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.ppc}>
                    <Image
                        style={styles.profilpicture}
                        source={{uri: ppURI}}
                        onError={(e) => console.error('Image load error:', e.nativeEvent.error)} />
                </TouchableOpacity>
            </View>

        </View>
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