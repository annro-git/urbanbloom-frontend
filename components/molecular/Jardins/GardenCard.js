import { View, Text, Image } from "react-native"
import { MessageCircleMore } from "lucide-react-native"

import Button from "../../atomic/Button"

const GardenCard = ({ name, description, ppURI, members }) => {
    return (
        <View style={{ borderRadius: 10, padding: 20, backgroundColor: '#BDCEBB', width: '100%', gap: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                <Image source={{ uri: ppURI }} style={{ width: 100, height: '100%', borderRadius: 5, borderWidth: 0, borderColor: '#466760' }} />
                <View style={{ flex: 1, gap: 10, paddingTop: 10 }}>
                    <View>
                        <Text style={{ fontSize: 16, fontFamily: 'Lato_700Bold', width: '100%', color: '#000000BF' }}>{name}</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'Lato_400Regular', color: '#466760' }}>{members} jardiniers</Text>
                    </View>
                    <Text style={{ color: '#000000BF', paddingBottom: 10 }}>{description}</Text>
                    <Button text='Participer' primary='#466760' secondary='white' fontSize={ 16 } padding={ 10 } />
                </View>
            </View>
        </View>
    )
}

export default GardenCard