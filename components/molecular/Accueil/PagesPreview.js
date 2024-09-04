import { TouchableOpacity, Text, Image } from "react-native"

const PagesPreview = ({ name, image, navigate }) => {

    return (
        <TouchableOpacity style={{ padding: 10, alignItems: 'center', width: 'auto' }} onPress={() => navigate('Ressources', name)}>
            <Image source={{ uri: image }} style={{ width: 64, height: 64, borderRadius: 64 }} />
            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 14, paddingTop: 5, textAlign: 'center' }}>{ name }</Text>
        </TouchableOpacity>
    )
}

export default PagesPreview