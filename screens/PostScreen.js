import { View, Text } from "react-native"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateGardens } from "../reducers/user"

import InputSelect from "../components/atomic/InputSelect"
import RadioButtonGroup from "../components/atomic/RadioButtonGroup"

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
    const [type, setType] = useState('event')

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
        <View style={{ backgroundColor: '#F9F2E0', flex: 1, justifyContent: 'center', alignItems: 'center', gap: 50 }} >
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
            </View>
        </View>
    )
}

export default PostScreen