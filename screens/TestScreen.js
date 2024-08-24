import { View, Text, TouchableOpacity } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { add } from "../reducers/test"

import InputText from "../components/atomic/InputText"
import Button from "../components/atomic/Button"
import CustomCamera from "../components/molecular/CustomCamera"
import InputDate from "../components/atomic/InputDate"

const TestScreen = () => {

    const dispatch = useDispatch()
    const [test, setTest] = useState('')
    const testRedux = useSelector(state => state.test.value)
    const [cameraOverlay, setCameraOverlay] = useState(null)
    const [pictureUrls, setPictureUrls] = useState([])
    const [selectedDate, setSelectedDate] = useState('')

    const camera = () => {
        return (
            <CustomCamera 
                facingOption='back' 
                closeCamera={() => setCameraOverlay(null)} 
                savePictureURI={(e) => setPictureUrls([...pictureUrls, e])} 
                pictureUrls={ pictureUrls } 
            />
        )
    }
    
    return (
        <View style={{ backgroundColor: '#F9F2E0', flex: 1, justifyContent: 'center', alignItems: 'center', position:'relative',  minHeight: '100%' }}>
            <View style={{ width: '80%', gap: 10 }}>
                <View style={{ zIndex: 2 }}>
                    <InputDate
                        color='#C5BBA2'
                        padding={ 20 }
                        size={ 16 }
                        placeholder="Sélectionner une date"
                        onPick={ setSelectedDate }
                    />
                </View>
                <InputText value={test} onChangeText={e => setTest(e)} />
                <TouchableOpacity 
                    onPress={() => dispatch(add(test)) } 
                    style={{ height: 50, backgroundColor: '#00000033', justifyContent: 'center', alignItems: 'center', width: '100%' }}
                >
                    <Text>GO</Text>
                </TouchableOpacity>
                <Text>State : {test}</Text>
                <Text>Selector : {testRedux}</Text>
                <Button 
                    text='Camera'
                    primary='white'
                    onPress={() => setCameraOverlay(camera)}
                />
                <Text>{selectedDate}</Text>
            </View>
            { cameraOverlay }
        </View>
    )
    
}

export default TestScreen