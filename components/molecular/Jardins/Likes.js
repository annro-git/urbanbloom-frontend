import { Text, TouchableOpacity, View } from "react-native"
import { useSelector } from "react-redux"
import { ThumbsUp, Sun, TreeDeciduous, Heart } from "lucide-react-native"

const Likes = ({ likes, postId, gardenId, onLikesChange }) => {

    const user = useSelector(state => state.user)

    const toogleLike = async (likeType) => {
        const { token } = user
        const response = await fetch(`${global.BACKEND_URL}/garden/${ gardenId }/post/${ postId }/like`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, likeType })
        })
        const json = await response.json()
        if(!json.result) return
        onLikesChange()
    }

    return (
        <View style={{ flexDirection: 'row', gap: 5, }}>
            <TouchableOpacity onPress={() => toogleLike('sun')} style={{ flexDirection: 'row', alignItems:'flex-end'}}>
                <Sun size={24} color={ likes.sun && likes.sun.find(like => like === user.username) ? '#466760' : '#C5BBA2'} style={{ zIndex: 4 }} />
                <Text style={{ fontSize: 12, fontFamily: 'Lato_400Regular', color: '#000000BB', padding: 2, color:'white', width: 20, height: 20, left: -6, top: 6, backgroundColor:'#C5BBA2', borderRadius: 30, textAlign: 'center' }}>{ likes.sun ? likes.sun.length : 0 }</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toogleLike('thumb')} style={{ flexDirection: 'row', alignItems:'flex-end'}}>
                <ThumbsUp size={24} color={ likes.thumb && likes.thumb.find(like => like === user.username) ? '#466760' : '#C5BBA2'} style={{ zIndex: 4 }} />
                <Text style={{ fontSize: 12, fontFamily: 'Lato_400Regular', color: '#000000BB', padding: 2, color:'white', width: 20, height: 20, left: -6, top: 6, backgroundColor:'#C5BBA2', borderRadius: 30, textAlign: 'center' }}>{ likes.thumb ? likes.thumb.length : 0 }</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toogleLike('tree')} style={{ flexDirection: 'row', alignItems:'flex-end'}}>
                <TreeDeciduous size={24} color={ likes.tree && likes.tree.find(like => like === user.username) ? '#466760' : '#C5BBA2'} style={{ zIndex: 4 }} />
                <Text style={{ fontSize: 12, fontFamily: 'Lato_400Regular', color: '#000000BB', padding: 2, color:'white', width: 20, height: 20, left: -6, top: 6, backgroundColor:'#C5BBA2', borderRadius: 30, textAlign: 'center' }}>{ likes.tree ? likes.tree.length : 0 }</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toogleLike('heart')} style={{ flexDirection: 'row', alignItems:'flex-end'}}>
                <Heart size={24} color={ likes.heart && likes.heart.find(like => like === user.username) ? '#466760' : '#C5BBA2'} style={{ zIndex: 4 }} />
                <Text style={{ fontSize: 12, fontFamily: 'Lato_400Regular', color: '#000000BB', padding: 2, color:'white', width: 20, height: 20, left: -6, top: 6, backgroundColor:'#C5BBA2', borderRadius: 30, textAlign: 'center' }}>{ likes.heart ? likes.heart.length : 0 }</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Likes