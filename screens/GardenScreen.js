import { useEffect, useState } from "react"
import { ScrollView, View, Text, TouchableOpacity, Keyboard, Image } from "react-native"
import { ArrowLeftIcon } from "lucide-react-native"
import { useSelector } from "react-redux"

import GardenCard from "../components/molecular/Jardins/GardenCard"
import CustomCamera from "../components/molecular/CustomCamera"
import Button from "../components/atomic/Button"
import TextInput from "../components/atomic/InputText"
import TextArea from "../components/atomic/TextArea"
import CheckBoxGroup from "../components/atomic/CheckBoxGroup"

const interestOptions = [
    { label: 'Fruits', value: 'fruits', },
    { label: 'Légumes', value: 'vegetables', },
    { label: 'Fleurs', value: 'flowers', },
]
const bonusOptions = [
    { label: 'Accessibilité', value: 'a11y' },
    { label: 'Animaux', value: 'dogs' },
    { label: 'Point d\'eau', value: 'water' },
]

const GardenScreen = ({ navigation }) => {

    const { navigate } = navigation

    const user = useSelector(state => state.user)

    const [gardens, setGardens] = useState([])
    const [newGarden, setNewGarden] = useState({ address: '', name: '', description: '', interests: [], bonus: [] })
    const [cameraOverlay, setCameraOverlay] = useState(null)
    const [pictureUrl, setPictureUrl] = useState('')
    const [gardenScreenMode, setGardenScreenMode] = useState('list') // list / create / single

    const camera = () => {
        Keyboard.dismiss()
        return (
            <View style={{ zIndex: 3, width: '100%', height: '100%', position: 'absolute' }}>
                <CustomCamera 
                    facingOption='back' 
                    closeCamera={() => setCameraOverlay(null)} 
                    savePictureURI={e => setPictureUrl(e)} 
                    pictureUrl={ pictureUrl } 
                />
            </View>
        )
    }

    useEffect(() => {
        (async() => {
            const response = await fetch(`${global.BACKEND_URL}/user/gardens/details`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', token: user.token }
            })
            const json = await response.json()
            json.result && setGardens(json.gardens)
        })()
    }, [gardenScreenMode])

    const uploadPicture = async(picture) => {
        const image = await fetch(picture)
        const blob = await image.blob()
        const body = new FormData

        body.append('token', user.token)
        body.append('blob', {
            uri: picture,
            name: blob.data.name,
            type: blob.data.type,
        })

        const response = await fetch(`${global.BACKEND_URL}/picture`, { method: 'POST', body })
        const json = await response.json()
        if(!json.result) return
        return json.url
    }

    const handleCreateGarden = async () => {
        const { address, name, description, interests, bonus } = newGarden
        const { token } = user
        if(!address || !name || !description) return

        // Get address coordinates
        if(address.length < 3 || address.length > 200) return
        const adresseResponse = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${address}`)
        const adresseJson = await adresseResponse.json()
        if(!adresseJson.features[0].geometry.coordinates) return
        const coordinates = {
            longitude: adresseJson.features[0].geometry.coordinates[0],
            latitude: adresseJson.features[0].geometry.coordinates[1],
        }

        // upload picture
        let ppURI = ''
        if(pictureUrl){
            ppURI = await uploadPicture(pictureUrl)
        }

        // Post new Garden
        const gardenBody = { token, name, coordinates, description, interests, bonus, ppURI }
        console.log(gardenBody)
        const response = await fetch(`${global.BACKEND_URL}/garden`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gardenBody),
        })
        const json = await response.json()
        if(!json.result) return

        setNewGarden({ address: '', name: '', description: '', interests: [], bonus: [] })
        setPictureUrl('')
        setGardenScreenMode('list')
    }
    
    return (
        <View style={{ backgroundColor: '#F9F2E0' }}>
            {gardenScreenMode === 'list' &&
                <ScrollView
                    contentContainerStyle={{ alignItems: 'center', minHeight: '100%', paddingVertical: 20, gap: 20 }}
                    keyboardShouldPersistTaps="always"
                >
                    {gardens.length !== 0 
                        ? <View style={{ width: '90%', gap: 20 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'Lato_700Bold', color: '#294849', lineHeight: 24 }}>Vos jardins</Text>
                            {gardens.map((garden, index) => {
                                const { name, description, ppURI, members } = garden
                                return(
                                    <GardenCard key={ index } name={ name } description={ description } ppURI={ ppURI } members={ members } />
                                )
                            })}
                        </View>
                        : <View style={{ justifyContent: 'center', alignItems: 'center', gap: 20, width: '80%', paddingVertical: 20 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Lato_400Regular', textAlign: 'center' }}>Vous n'êtes inscrit à aucun Jardin {'\n'}pour le moment !</Text>
                            <Button text='Rechercher' primary='#466760' secondary='white' onPress={() => navigate('Recherche')} />
                        </View>
                    }
                    <View style={{ width: '80%' }}>
                        <Button text='Nouveau jardin' primary='white' secondary='#466760' onPress={() => setGardenScreenMode('create')} />
                    </View>
                </ScrollView>
            }
            {gardenScreenMode === 'create' &&
                <ScrollView 
                    contentContainerStyle={{ alignItems: 'center', minHeight: '100%' }}
                    keyboardShouldPersistTaps="always"
                >
                    <View style={{ width: '80%', gap: 20, paddingVertical: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                            <TouchableOpacity onPress={() => setGardenScreenMode('list')} >
                                <ArrowLeftIcon size={ 24 } color='#294849' />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, fontFamily: 'Lato_700Bold', color: '#294849', lineHeight: 24 }}>Créer un jardin</Text>
                        </View>
                        <TextInput 
                            value={ newGarden.name }
                            onChangeText={e => setNewGarden({
                                address: newGarden.address, 
                                name: e, 
                                description: newGarden.description, 
                                interests: newGarden.interests, 
                                bonus: newGarden.bonus
                            })}
                            placeholder='Nom du jardin' 
                            color='#C5BBA2'
                        />
                        <TextInput 
                            value={ newGarden.address }
                            onChangeText={e => setNewGarden({
                                address: e, 
                                name: newGarden.name, 
                                description: newGarden.description, 
                                interests: newGarden.interests, 
                                bonus: newGarden.bonus
                            })}
                            placeholder='Adresse du jardin' 
                            color='#C5BBA2'
                        />
                        <TextArea
                            value={ newGarden.description }
                            onChangeText={e => setNewGarden({
                                address: newGarden.address, 
                                name: newGarden.name, 
                                description: e, 
                                interests: newGarden.interests, 
                                bonus: newGarden.bonus
                            })}
                            placeholder='Description du jardin...' 
                            color='#C5BBA2'
                        />
                        <View>
                            <Text style={{ fontSize: 16, fontFamily: 'Lato_700Bold', color: '#294849' }}>Intérêts</Text>
                            <CheckBoxGroup
                                options={ interestOptions }
                                selected={ newGarden.interests }
                                onSelect={ e => setNewGarden({
                                    address: newGarden.address,
                                    name: newGarden.name,
                                    description: newGarden.description,
                                    interests: e,
                                    bonus: newGarden.bonus
                                })}
                                color='#000000BF'
                            />
                        </View>
                        <View>
                            <Text style={{ fontSize: 16, fontFamily: 'Lato_700Bold', color: '#294849' }}>Bonus</Text>
                            <CheckBoxGroup
                                options={ bonusOptions }
                                selected={ newGarden.bonus }
                                onSelect={ e => setNewGarden({
                                    address: newGarden.address,
                                    name: newGarden.name,
                                    description: newGarden.description,
                                    interests: newGarden.interests,
                                    bonus: e
                                })}
                                color='#000000BF'
                            />
                        </View>
                        {pictureUrl &&
                            <TouchableOpacity onPress={() => setPictureUrl('')}>
                                <Image
                                    source={{ uri: pictureUrl }}
                                    style={{ resizeMode: 'cover', width: 100, height: 100, borderRadius: 10 }}
                                />
                            </TouchableOpacity>
                        }
                        <Button
                            primary='white'
                            secondary='#466760'
                            text='Prendre une photo'
                            onPress={() => setCameraOverlay(camera)}
                        />
                        <Button
                            primary='#466760'
                            secondary='white'
                            text='Créer'
                            onPress={() => handleCreateGarden()}
                        />
                    </View>
                </ScrollView>
            }
            {gardenScreenMode === 'single' &&
                <ScrollView 
                    contentContainerStyle={{ alignItems: 'center', minHeight: '100%' }}
                    keyboardShouldPersistTaps="always"
                >
                    <TouchableOpacity onPress={() => setGardenScreenMode('list')} >
                        <ArrowLeftIcon size={ 32 } color={ 'black' } />
                    </TouchableOpacity>
                </ScrollView>
            }
            { cameraOverlay }
        </View>
    )
}

export default GardenScreen
