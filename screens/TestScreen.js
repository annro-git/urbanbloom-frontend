import { View, Text, TouchableOpacity } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { add } from "../reducers/test"

import InputText from "../components/atomic/InputText"
import AsyncStorage from "@react-native-async-storage/async-storage"

const TestScreen = () => {

    const dispatch = useDispatch()
    const [test, setTest] = useState('')
    const testRedux = useSelector(state => state.test.value)

    return (
        <View style={{ backgroundColor: '#F9F2E0', flex: 1, justifyContent: 'center', alignItems: 'center', gap: 50 }}>
            <InputText value={test} onChangeText={e => setTest(e)} />
            <TouchableOpacity 
                onPress={() => dispatch(add(test)) } 
                style={{ height: 50, backgroundColor: '#00000033', justifyContent: 'center', alignItems: 'center', width: '100%' }}
            >
                <Text>GO</Text>
            </TouchableOpacity>
            <Text>State : {test}</Text>
            <Text>Selector : {testRedux}</Text>
        </View>
    )
    
}

export default TestScreen