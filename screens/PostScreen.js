import { View, Text, ScrollView, Image, TouchableOpacity, Keyboard } from "react-native"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateGardens } from "../reducers/user"
import { useIsFocused } from "@react-navigation/native"

import InputSelect from "../components/atomic/InputSelect"
import RadioButtonGroup from "../components/atomic/RadioButtonGroup"
import CustomCamera from "../components/molecular/CustomCamera"
import TextArea from "../components/atomic/TextArea"
import Button from "../components/atomic/Button"
import TextInput from "../components/atomic/InputText"
import InputDate from "../components/atomic/InputDate"

const typeOptions = [
    { label: 'Message', value: 'message' },
    { label: 'Evénement', value: 'event' }
]

const PostScreen = () => {

    const isFocused = useIsFocused()

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const [gardenOptions, setGardenOptions] = useState([])
    const [selectedGarden, setSelectedGarden] = useState('')
    const [type, setType] = useState('message')
    const [message, setMessage] = useState({ title: '', text: ''})
    const [cameraOverlay, setCameraOverlay] = useState(null)
    const [pictureUrls, setPictureUrls] = useState([])
    const [event, setEvent] = useState({ title: '', text: '', date: '' })

    const camera = () => {
        Keyboard.dismiss()
        return (
            <View style={{ zIndex: 3, width: '100%', height: '100%', position: 'absolute' }}>
                <CustomCamera 
                    facingOption='back' 
                    closeCamera={() => setCameraOverlay(null)} 
                    savePictureURI={(e) => setPictureUrls([...pictureUrls, e])} 
                    pictureUrls={ pictureUrls } 
                />
            </View>
        )
    }

    const uploadPictures = async(pictures) => {
        let result=[]
        for (const picture of pictures) {
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
            result.push(json.url)
        }
        return result
    }

    const handleSendMessage = async() => {
        const { title, text } = message
        const { token } = user
        if(!title || !text){
            console.log('Missing/Empty field(s)')
            return
        }
        let pictures = []
        if(pictureUrls){
            const uploadResult = await uploadPictures(pictureUrls)
            pictures = uploadResult
        }
        const messageBody = { token, title, text, pictures }
        const response = await fetch(`${global.BACKEND_URL}/garden/${selectedGarden.id}/post`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(messageBody)
        })
        const json = await response.json()
        if(json.result){
            setMessage({ title: '', text: ''})
            setPictureUrls([])
        }
    }

    const handleSendEvent = async() => {
        const { title, text, date } = event
        const { token } = user
        if(!title || !text || !date){
            console.log('Missing/empty field(s)')
            return
        }
        let pictures = []
        if(pictureUrls){
            const uploadResult = await uploadPictures(pictureUrls)
            pictures = uploadResult
        }
        const eventBody = { token, title, text, date, pictures }
        const response = await fetch(`${global.BACKEND_URL}/garden/${selectedGarden.id}/event`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventBody)
        })
        const json = await response.json()
        if(json.result){
            setEvent({ title: '', text: '', date: ''})
            setPictureUrls([])
        }
    }
    // Refresh User Gardens Names on screen focus
    useEffect(() => {
        (async() => {
            const response = await fetch(`${global.BACKEND_URL}/user/gardens`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', token: user.token }
            })
            const json = await response.json()
            json.result && dispatch(updateGardens(json.gardens))

            const responseB = await fetch(`${global.BACKEND_URL}/garden/name`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', token: user.token },
                body: JSON.stringify({ gardenIds: json.gardens })
            })
            const jsonB = await responseB.json()
            jsonB.result && setGardenOptions(jsonB.gardens)
        })()
    }, [isFocused])

    return (
        <ScrollView
            contentContainerStyle={{ backgroundColor: '#F9F2E0', alignItems: 'center', minHeight: '100%' }}
            keyboardShouldPersistTaps="always"
        >
            <View style={{ width: '80%', gap: 20, paddingVertical: 20 }} >
                <Text style={{ fontSize: 20, fontFamily: 'Lato_700Bold', color: '#294849', lineHeight: 24 }}>Publier</Text>
                <View style={{ zIndex: 3 }}>
                    <InputSelect
                        placeholder='Sélectionnez un jardin'
                        options={ gardenOptions }
                        onSelect={ setSelectedGarden }
                        selected={ selectedGarden }
                        color='#C5BBA2'
                    />
                </View>
                <RadioButtonGroup
                    options={ typeOptions }
                    selected={ type }
                    onSelect={ setType }
                    color='#000000BF'
                    fontSize={ 16 }
                />
                { type === 'message' &&
                    <View style={{ gap: 20 }}>
                        <TextInput
                            placeholder="Titre"
                            color='#C5BBA2'
                            value={ message.title }
                            onChangeText={e => setMessage({title: e, text: message.text})}
                            fontSize={ 16 }
                        />
                        <TextArea
                            placeholder="Message..."
                            color='#C5BBA2'
                            value={ message.text }
                            onChangeText={e => setMessage({title: message.title, text: e})}
                            fontSize={ 14 }
                        />
                        {pictureUrls.length > 0 &&
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
                                {
                                    pictureUrls.map((picture, index) => {
                                        return(
                                            <TouchableOpacity key={index} onPress={() => setPictureUrls(pictureUrls.filter(e => e !== picture))}>
                                                <Image 
                                                    source={{ uri: picture }} 
                                                    style={{ resizeMode: 'cover', width: 100, height: 100, borderRadius: 10 }}
                                                />
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        }
                        <View style={{ gap: 20 }}>
                            <Button
                                primary='white'
                                secondary='#466760'
                                text='Prendre une photo'
                                onPress={() => setCameraOverlay(camera)}
                            />
                            <Button
                                primary='#466760'
                                secondary='white'
                                text='Envoyer'
                                onPress={() => handleSendMessage()}
                            />
                        </View>
                    </View>
                }
                { type === 'event' &&
                    <View style={{ gap: 20 }}>
                        <View style={{ zIndex: 2 }}>
                            <InputDate
                                color='#C5BBA2'
                                padding={ 20 }
                                size={ 16 }
                                placeholder="Sélectionner une date"
                                onPick={e => setEvent({title: event.title, text: event.text, date: e})}
                            />
                        </View>
                        <TextInput
                            placeholder="Titre"
                            color='#C5BBA2'
                            value={ event.title }
                            onChangeText={e => setEvent({title: e, text: event.text, date: event.date})}
                            fontSize={ 16 }
                        />
                        <TextArea
                            placeholder="Description..."
                            color='#C5BBA2'
                            value={ event.text }
                            onChangeText={e => setEvent({title: event.title, text: e, date: event.date})}
                            fontSize={ 14 }
                        />
                        {pictureUrls.length > 0 &&
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
                                {
                                    pictureUrls.map((picture, index) => {
                                        return(
                                            <TouchableOpacity key={index} onPress={() => setPictureUrls(pictureUrls.filter(e => e !== picture))}>
                                                <Image 
                                                    source={{ uri: picture }} 
                                                    style={{ resizeMode: 'cover', width: 100, height: 100, borderRadius: 10 }}
                                                />
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        }
                        <View style={{ gap: 20 }}>
                            <Button
                                primary='white'
                                secondary='#466760'
                                text='Prendre une photo'
                                onPress={() => setCameraOverlay(camera)}
                            />
                            <Button
                                primary='#466760'
                                secondary='white'
                                text='Envoyer'
                                onPress={() => handleSendEvent()}
                            />
                        </View>
                    </View>
                }
            </View>
            { cameraOverlay }
        </ScrollView>
    )
}

export default PostScreen