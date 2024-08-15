import { useNavigation } from "@react-navigation/native"
import { View, Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import Logotype from "./Logotype"

const CustomHeader = props => {

    const navigation = useNavigation()

    return (
        <SafeAreaView
            style={{
                alignItems: 'center',
                backgroundColor: '#294849',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20,
                paddingTop: 0,
            }}
        >
            <TouchableOpacity onPress={() => navigation.navigate('Accueil')}>
                <Logotype size={32} color={'white'} fontSize={16} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', gap: 20 }}>
                <Text>Weather</Text>
                <Text>Account</Text>
            </View>
        </SafeAreaView>
    )
}

export default CustomHeader