import { useSelector } from "react-redux"
import { useState } from "react"
import { View, Text, TouchableOpacity, Keyboard, Image } from "react-native"

import TextInput from "../../atomic/InputText"
import TextArea from "../../atomic/TextArea"
import CheckBoxGroup from "../../atomic/CheckBoxGroup"
import Button from "../../atomic/Button"
import CustomCamera from "../CustomCamera"

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

const CreateGardenForm = ({ style, resetGarden }) => {

    const user = useSelector(state => state.user)

    const [newGarden, setNewGarden] = useState({ address: '', name: '', description: '', interests: [], bonus: [] })
    const [pictureUrl, setPictureUrl] = useState('')
    const [cameraOverlay, setCameraOverlay] = useState(null)

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
        const response = await fetch(`${global.BACKEND_URL}/garden`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gardenBody),
        })
        const json = await response.json()
        if(!json.result) return

        setNewGarden({ address: '', name: '', description: '', interests: [], bonus: [] })
        setPictureUrl('')
        resetGarden()
    }

    return (
        <>
            <View style={ style }>
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
            { cameraOverlay }
        </>
    )
}

export default CreateGardenForm