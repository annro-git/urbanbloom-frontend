import { Text, TouchableOpacity, View, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import { ThumbsUp, Sun, TreeDeciduous, Heart } from "lucide-react-native"

const types = [
    { value: 'sun', icon: Sun },
    { value: 'thumb', icon: ThumbsUp },
    { value: 'tree', icon: TreeDeciduous },
    { value: 'heart', icon: Heart },
]

const Likes = ({ likes, postId, gardenId, setLikes }) => {

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
        setLikes()
    }

    return (
        <View style={styles.container}>
            {types.map((type, index) => {
                return(
                    <TouchableOpacity
                        key={ index }
                        style={ styles.button }
                        onPress={() => toogleLike(type.value)}
                    >
                        {type.icon.render({
                            size: 24,
                            color: likes[type.value] && likes[type.value]
                                .some(like => like === user.username) 
                                    ? '#466760'
                                    : '#C5BBA2',
                            style: styles.icon,
                        })}
                        <Text style={styles.text}>
                            { likes[type.value] ? likes[type.value].length : 0 }
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        gap: 5,
    },
    button: {
        flexDirection: 'row', 
        alignItems:'flex-end',
    },
    text: {
        fontSize: 12, 
        fontFamily: 'Lato_400Regular', 
        color: '#000000BB', 
        padding: 2, 
        color:'white', 
        width: 20, 
        height: 20, 
        left: -6, 
        top: 6, 
        backgroundColor:'#C5BBA2', 
        borderRadius: 30, 
        textAlign: 'center',
    },
    icon: {
        zIndex: 5,
    }
})

export default Likes