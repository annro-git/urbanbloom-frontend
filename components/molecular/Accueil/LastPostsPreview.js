import { TouchableOpacity, Text } from "react-native"

import dayjs from 'dayjs'
import 'dayjs/locale/fr'

const LastPostsPreview = ({ post, navigate, index }) => {

    return (
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', backgroundColor: index%2 === 0 ? '#FFFFFFBB' : 'white', borderRadius: 5, padding: 10 }} onPress={() => navigate('Jardins', {garden:{id: post.from.garden.id}})}>
            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16 }}>{post.title}</Text>
            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 14 }}>{post.from.owner}, {dayjs(post.createdAt).locale('fr').fromNow()}</Text>
        </TouchableOpacity>
    )
}

export default LastPostsPreview