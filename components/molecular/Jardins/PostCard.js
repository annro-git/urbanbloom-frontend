import { ReplyAll, UserRound } from "lucide-react-native"
import { useEffect, useState } from "react"
import { View, Text, Image, Pressable } from "react-native"
import { useSelector } from "react-redux"

import Likes from "./Likes"
import dayjs from 'dayjs'
import 'dayjs/locale/fr'

const PostCard = ({ createdAt, likes, owner, repliesCount, text, title, gardenId, postId, pictures, setLikes, setPost }) => {

    const user = useSelector(state => state.user)

    const [ownerPPURI, setOwnerPPURI] = useState(null)

    useEffect(() => {
        (async() => {
            const { token } = user
            const username = owner
            const response = await fetch(`${global.BACKEND_URL}/user/pp`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', token, username }
            })
            const json = await response.json()
            if(!json.result) return
            setOwnerPPURI(json.ppURI)
        })()
    }, [])

    return (
        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20, gap: 10 }}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                {ownerPPURI
                    ? <Image source={{ uri: ownerPPURI }} style={{ width: 48, height: 48, borderRadius: 48 }} />
                    : <View style={{ width: 48, height: 48, borderRadius: 48, backgroundColor: '#C5BBA2', justifyContent: 'center', alignItems: 'center' }}>
                        <UserRound size={ 32 } color='white' />
                    </View>
                }
                <View style={{ gap: 5 }}>
                    <Pressable onPress={() => setPost()}>
                        <Text style={{ fontSize: 16, fontFamily: 'Lato_700Bold' }}>{ title }</Text>
                    </Pressable>
                    <Text style={{ fontSize: 12, fontFamily: 'Lato_400Regular' }}>
                        par { owner }, { dayjs(createdAt).locale('fr').fromNow() }
                    </Text>
                </View>
            </View>
            <Pressable onPress={() => setPost()}>
                <Text style={{ fontSize: 14, fontFamily: 'Lato_400Regular' }}>{ text }</Text>
            </Pressable>
            {pictures.length > 0 &&
                <Pressable onPress={() => setPost()}>
                    <View>
                        {pictures.length > 1 &&
                            <Text style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: '#FFFFFFAA', zIndex: 3, padding: 5, borderTopLeftRadius: 5, fontSize: 12, fontFamily: 'Lato_400Regular'}}>{pictures.length} photos</Text>
                        }
                        <Image source={{ uri: pictures[0] }} style={{ width: '100%', height: 100, borderRadius: 10 }} />
                    </View>
                </Pressable>
            }
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                <Likes
                    likes={ likes } 
                    owner={ owner } 
                    gardenId={ gardenId } 
                    postId={ postId } 
                    setLikes={ setLikes }
                />
                <Pressable style={{ flexDirection: 'row', gap: 5, alignItems: 'center', paddingVertical: 5, paddingHorizontal: 10, top: 5, backgroundColor:'#466760', borderRadius: 10, }} onPress={() => setPost()}>
                    <ReplyAll size={ 24 } color='white' />
                    <Text style={{ fontSize: 12, fontFamily: 'Lato_400Regular',  color:'white' }}>{ repliesCount }</Text>
                </Pressable>
            </View>   
        </View>
    )
}

export default PostCard