import { View, Text, ScrollView } from "react-native"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateGardens } from "../reducers/user"

import InputSelect from "../components/atomic/InputSelect"
import RadioButtonGroup from "../components/atomic/RadioButtonGroup"
import TextArea from "../components/atomic/TextArea"
import Button from "../components/atomic/Button"
import TextInput from "../components/atomic/InputText"

const typeOptions = [
    { label: 'Message', value: 'message' },
    { label: 'Evénement', value: 'event' }
]

const PostScreen = ({ navigation }) => {

    const { navigate } = navigation

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const [gardenOptions, setGardenOptions] = useState([])
    const [selectedGarden, setSelectedGarden] = useState('')
    const [type, setType] = useState('message')
    const [message, setMessage] = useState({ title: '', text: '', pictures: []})

    const handleSendMessage = async() => {
        const messageBody = {
            token: user.token,
            title: message.title,
            text: message.text,
            pictures: message.pictures,
        }
        const response = await fetch(`${global.BACKEND_URL}/garden/${selectedGarden.id}/post`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(messageBody)
        })
        const json = await response.json()
        console.log(json)
    }

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
    }, [])

    return (
        <ScrollView contentContainerStyle={{ backgroundColor: '#F9F2E0', alignItems: 'center', paddingVertical: 20, minHeight: '100%' }} >
            <View style={{ width: '80%', gap: 20 }} >
                <View style={{ zIndex: 9 }}>
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
                            onChangeText={e => setMessage({title: e, text: message.text, pictures: message.pictures})}
                            fontSize={ 16 }
                        />
                        <TextArea
                            placeholder="Message..."
                            color='#C5BBA2'
                            value={ message.text }
                            onChangeText={e => setMessage({title: message.title, text: e, pictures: message.pictures})}
                            fontSize={ 14 }
                        />
                        <View>
                            <Button
                                primary='#466760'
                                secondary='white'
                                text='Envoyer'
                                onPress={() => handleSendMessage()}
                            />
                        </View>
                    </View>
                }
            </View>
        </ScrollView>
    )
}

export default PostScreen