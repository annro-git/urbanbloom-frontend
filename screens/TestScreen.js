import { Text, TouchableOpacity } from "react-native"

export default function TestScreen({ navigation }) {
    return (
        <>
            <Text>Test</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Tab') } style={{ height: 50, backgroundColor: 'blue' }}>
                <Text>GO</Text>
            </TouchableOpacity>
        </>
    )
}