import { Text, TouchableOpacity, View } from "react-native"
import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MapPin } from "lucide-react-native"
import { updateGardens } from "../reducers/user"
import MapView, { Marker } from "react-native-maps"

import TextInput from "../components/atomic/InputText"
import RadioButtonGroup from "../components/atomic/RadioButtonGroup"
import CheckBoxGroup from "../components/atomic/CheckBoxGroup"

const interestOptions =[
    { label: 'Fruits', value: 'fruits', },
    { label: 'Légumes', value: 'vegetables', },
    { label: 'Fleurs', value: 'flowers', },
    { label: 'Peu importe', value: '', isChecked: true },
]

const bonusOptions =[
    { label: 'Accessibilité', value: 'a11y' },
    { label: 'Animaux', value: 'dogs' },
    { label: 'Point d\'eau', value: 'water' },
]

const SearchScreen = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const [address, setAddress] = useState('')
    const [interest, setInterest] = useState('')
    const [bonus, setBonus] = useState([])
    const [markers, setMarkers] = useState([])
    const [gardenPreview, setGardenPreview] = useState(null)

    const mapRef = useRef(null)

    const getLocation = async () => {
        if(!address){
            mapRef.current.animateToRegion({
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
            })
        }
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${address}`)
        const data = await response.json()
        const { coordinates } = await data.features[0].geometry
        mapRef.current.animateToRegion({
            latitude: coordinates[1],
            longitude: coordinates[0],
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
        })
    }

    const handleGardenPreview = ({ name, description, ppURI, members, id }) => {
        setGardenPreview({ name, description, ppURI, members, id })
    }

    const handleJoin = async () => {
        const response = await fetch(`${global.BACKEND_URL}/garden/${gardenPreview.id}/member`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: user.token, username: user.username })
        })
        const json = await response.json()
        json.result && dispatch(updateGardens([...user.gardens, gardenPreview.id]))
    }

    // Set user.gardens reducer from backend
    useEffect(() => {
        (async() => {
            const response = await fetch(`${global.BACKEND_URL}/user/gardens`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', token: user.token }
            })
            const json = await response.json()
            json.result && dispatch(updateGardens(json.gardens))
        })()
    }, [])

    // Filter markers depending interest and bonus
    useEffect(() => {
      (async() => {
        const response = await fetch(`${global.BACKEND_URL}/garden/location`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', token: user.token },
            body: JSON.stringify({ interests: interest, bonus })
        })
        const json = await response.json()
        json.result && setMarkers(json.gardens)
      })()
    }, [interest, bonus])

    return (
        <View style={{ flex: 1, position:'relative' }}>
            {/* <Text style={{ position: 'absolute', zIndex: 2, backgroundColor: '#FFFFFF99' }}>Lat: {user.lastLocation.latitude}; Lon: {user.lastLocation.longitude}</Text> */}
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: user.lastLocation.latitude,
                    longitude: user.lastLocation.longitude,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                }}
                ref={ mapRef }
                showsUserLocation={ true }
                followsUserLocation={ true }
                showsMyLocationButton={ true }
                showsCompass={ true }
                showsPointsOfInterest={ false }
                toolbarEnabled={ false }
                loadingEnabled={ true }
            >
                { markers.map((marker, index) => {
                    const { latitude, longitude, name, description, ppURI, members, id } = marker
                    return(
                        <Marker
                            coordinate={{ latitude, longitude }}
                            onPress={() => handleGardenPreview({ name, description, ppURI, members, id })}
                            key={ index }
                        >
                            <View style={{ width: 32, height: 32 }}>
                                    <MapPin size={ '100%' } color={'#466760'} />
                            </View>
                        </Marker>
                    )
                }) }
            </MapView>
            <View style={{ width: '100%', position: 'absolute', bottom: 0, padding: 20 }} >
                <View
                    style={{
                        backgroundColor: '#FFFFFFCC',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#466760',
                        padding: 20,
                    }}
                >

                    {/* Gardens details */
                        gardenPreview &&
                        <View style={{ width: '100%', paddingBottom: 20, gap: 20 }}>
                            <View>
                                <Text style={{ fontSize: 18, fontFamily: 'Lato_700Bold' }}>{ gardenPreview.name }</Text>
                                <Text style={{ fontSize: 14, fontFamily: 'Lato_300Light' }}>{ gardenPreview.members } jardinier(s)</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ width: '70%' }}>{ gardenPreview.description }</Text>

                                { /* Toggle join / subscribed button depending user.gardens */
                                    user.gardens.indexOf(gardenPreview.id) > -1
                                    ? <View style={{ backgroundColor: '#BDCEBB', borderRadius: 5, justifyContent: 'center', alignItems: 'center', padding: 10, flex: 1 }} >
                                        <Text style={{ fontSize: 16, fontFamily: 'Lato_400Regular', color: 'white' }} >Inscrit</Text>
                                    </View>
                                    : <TouchableOpacity style={{ backgroundColor: '#466760', borderRadius: 5, justifyContent: 'center', alignItems: 'center', padding: 10, flex: 1 }} onPress={() => handleJoin()}>
                                        <Text style={{ fontSize: 16, fontFamily: 'Lato_400Regular', color: 'white' }} >Rejoindre</Text>
                                    </TouchableOpacity>
                                }

                            </View>
                        </View>
                    }

                    <TextInput
                        value={ address } 
                        onChangeText={ e => setAddress(e) } 
                        placeholder="Saisissez une adresse" 
                        color="#466760" 
                        padding={10} 
                        onSubmitEditing={ () => getLocation() }
                        onPress={ () => setGardenPreview(null) }
                        onBlur={ () => getLocation() }
                    />
                    <Text style={{ fontSize: 16, fontFamily: 'Lato_400Regular', color: '#466760', paddingVertical: 10 }}>Intérêt : </Text>
                    <RadioButtonGroup 
                        options={ interestOptions }
                        selected={ interest }
                        onSelect={ setInterest }
                        color='#466760'
                    />
                    <Text style={{ fontSize: 16, fontFamily: 'Lato_400Regular', color: '#466760', paddingVertical: 10 }}>Bonus : </Text>
                    <CheckBoxGroup
                        options={ bonusOptions }
                        selected={ bonus }
                        onSelect={ setBonus }
                        color='#466760'
                        fontSize={ 14 }
                    />
                </View>
            </View>
        </View>
    )
}

export default SearchScreen