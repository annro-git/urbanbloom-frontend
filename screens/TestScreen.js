import { View, Text, TouchableOpacity } from "react-native"

const TestScreen = ({ navigation }) => {

    const { navigate } = navigation

    return (
        <View style={{ backgroundColor: '#F9F2E0', flex: 1, justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => navigate('Auth') } style={{ height: 50, backgroundColor: 'aqua', justifyContent: 'center', alignItems: 'center' }}>
                <Text>GO</Text>
            </TouchableOpacity>
        </View>
    )
    
}

export default TestScreen