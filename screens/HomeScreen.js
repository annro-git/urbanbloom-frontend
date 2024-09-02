import { ScrollView, Text, View } from "react-native"
import { useSelector } from "react-redux"

import Button from "../components/atomic/Button"

const HomeScreen = ({ navigation }) => {

    const { navigate } = navigation
    const user = useSelector(state => state.user)

    return (
        <ScrollView
            contentContainerStyle={{ backgroundColor: '#F9F2E0', alignItems: 'center', minHeight: '100%' }}
            keyboardShouldPersistTaps="always"
        >
            <View style={{ width: '80%', gap: 20, paddingVertical: 20 }} >
                <Text style={{ fontSize: 20, fontFamily: 'Lato_700Bold', color: '#294849', lineHeight: 24 }}>Bienvenue, {user.username}</Text>
                <Button text="TEST" onPress={() => navigate('Jardins', {test: 'coucou'})}/>
            </View>
        </ScrollView>
    )
}

export default HomeScreen