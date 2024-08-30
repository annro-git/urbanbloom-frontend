import { Text, Image, TouchableOpacity } from "react-native"

const PageBloc = ({ page, selectPage }) => {

    const { _id, name, image } = page

    return (
        <TouchableOpacity style={{ width: '30%', justifyContent: 'flex-start', alignItems: 'center' }} onPress={() => selectPage(name)}>
            <Image source={{ uri: image }} style={{ width: 64, height: 64, borderRadius: 64 }} />
            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 14, paddingTop: 10, textAlign: 'center' }}>{ name }</Text>
        </TouchableOpacity>
    )
}

export default PageBloc