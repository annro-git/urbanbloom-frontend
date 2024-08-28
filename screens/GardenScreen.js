import { useEffect, useState } from "react"
import { ScrollView, View, Text, TouchableOpacity, Keyboard, Image } from "react-native"
import { ArrowLeftIcon } from "lucide-react-native"
import { useSelector } from "react-redux"
import { useIsFocused } from "@react-navigation/native"

import GardenCard from "../components/molecular/Jardins/GardenCard"
import Button from "../components/atomic/Button"
import PostCard from "../components/molecular/Jardins/PostCard"
import CreateGardenForm from "../components/molecular/Jardins/CreateGardenForm"
import ReplyForm from "../components/molecular/Jardins/ReplyForm"
import ReplyCard from "../components/molecular/Jardins/ReplyCard"
import Likes from "../components/molecular/Jardins/Likes"

const GardenScreen = ({ navigation }) => {

    const { navigate } = navigation

    const user = useSelector(state => state.user)
    const isFocused = useIsFocused()

    const [currentGardens, setCurrentGardens] = useState([])
    const [currentGarden, setCurrentGarden] = useState(null)
    const [currentPosts, setCurrentPosts] = useState([])
    const [currentPost, setCurrentPost] = useState(null)
    const [gardenScreenMode, setGardenScreenMode] = useState('list') // list / create / garden / post
    const [updater, setUpdater] = useState(false)

    // Get User Gardens
    useEffect(() => {
        (async() => {
            const response = await fetch(`${global.BACKEND_URL}/user/gardens/details`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', token: user.token }
            })
            const json = await response.json()
            json.result && setCurrentGardens(json.gardens)
        })()
    }, [gardenScreenMode])


    // Get Current Garden Posts
    useEffect(() => {
        if(currentGarden){
            (async() => {
                const { token } = user
                const { id } = currentGarden
                const response = await fetch(`${global.BACKEND_URL}/garden/${id}/posts`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', token }
                })
                const json = await response.json()
                if(!json.result) return
                
                setCurrentPosts(json.posts)
            })()
        }
    }, [currentGarden, updater, isFocused, gardenScreenMode])
    
    // Get Current Post
    const showPost = async(gardenId, postId) => {
        const { token } = user
        const response = await fetch(`${global.BACKEND_URL}/garden/${gardenId}/post/${postId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', token }
            })
        const json = await response.json()
        if(!json.result) return
        
        const post = json.post
        post.gardenId = gardenId
        post.postId = postId

        onShowPost(post)
    }    

    const onLikesChange = () => {
        setUpdater(e => !e)
    }

    const onShowPost = e => {
        setCurrentPost(e)
        setGardenScreenMode('post')
    }

    const handleMore = garden => {
        setCurrentGarden(garden)
        setGardenScreenMode('garden')
    }

    return (
        <View style={{ backgroundColor: '#F9F2E0' }}>
            {gardenScreenMode === 'list' &&
                <ScrollView
                    contentContainerStyle={{ alignItems: 'center', minHeight: '100%', paddingVertical: 20, gap: 20 }}
                    keyboardShouldPersistTaps="always"
                >
                    {currentGardens.length !== 0 
                        ? <View style={{ width: '80%', gap: 20 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'Lato_700Bold', color: '#294849', lineHeight: 24 }}>Vos jardins</Text>
                            {currentGardens.map((garden, index) => {
                                const { name, description, ppURI, members } = garden
                                return(
                                    <GardenCard 
                                        key={ index } 
                                        name={ name } 
                                        description={ description } 
                                        ppURI={ ppURI } 
                                        members={ members }
                                        onSelect={() => handleMore(garden) } 
                                    />
                                )
                            })}
                        </View>
                        : <View style={{ justifyContent: 'center', alignItems: 'center', gap: 20, width: '80%', paddingVertical: 20 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Lato_400Regular', textAlign: 'center' }}>Vous n'êtes inscrit à aucun Jardin {'\n'}pour le moment !</Text>
                            <Button text='Rechercher' primary='#466760' secondary='white' onPress={() => navigate('Recherche')} />
                        </View>
                    }
                    <View style={{ width: '80%' }}>
                        <Button text='Nouveau jardin' primary='white' secondary='#466760' onPress={() => setGardenScreenMode('create')} />
                    </View>
                </ScrollView>
            }
            {gardenScreenMode === 'create' &&
                <ScrollView 
                    contentContainerStyle={{ alignItems: 'center', minHeight: '100%' }}
                    keyboardShouldPersistTaps="always"
                >
                    <View style={{ width: '80%', gap: 20, paddingVertical: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                            <TouchableOpacity onPress={() => setGardenScreenMode('list')} >
                                <ArrowLeftIcon size={ 24 } color='#294849' />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, fontFamily: 'Lato_700Bold', color: '#294849', lineHeight: 24 }}>Créer un jardin</Text>
                        </View>
                    </View>
                    <CreateGardenForm 
                        style={{ width: '80%', gap: 20, paddingBottom: 20 }} 
                        setGardenScreenMode={ setGardenScreenMode } 
                    />
                </ScrollView>
            }
            {gardenScreenMode === 'garden' &&
                <ScrollView 
                    contentContainerStyle={{ alignItems: 'center', minHeight: '100%' }}
                    keyboardShouldPersistTaps="always"
                >
                    <View style={{ width: '80%', gap: 20, paddingVertical: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                            <TouchableOpacity onPress={() => setGardenScreenMode('list')} >
                                <ArrowLeftIcon size={ 24 } color='#294849' />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, fontFamily: 'Lato_700Bold', color: '#294849', lineHeight: 24, flex: 1 }}>{ currentGarden.name }</Text>
                            
                        </View>
                        <View>
                            {currentPosts.length > 0
                                ? <View style={{ gap: 20 }}>
                                    {currentPosts
                                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                        .map((post, index) => {
                                            const { createdAt, likes, owner, repliesCount, text, title, id, pictures } = post
                                            return(
                                                <PostCard
                                                    key={ index }
                                                    createdAt={ createdAt }
                                                    likes={ likes }
                                                    owner={ owner }
                                                    repliesCount={ repliesCount }
                                                    text={ text }
                                                    title={ title }
                                                    gardenId={ currentGarden.id }
                                                    postId={ id }
                                                    pictures={ pictures }
                                                    onLikesChange={ onLikesChange }
                                                    showPost={() => showPost(currentGarden.id, id) }
                                                />
                                            )
                                        })
                                    }
                                </View>
                                : <Text>Aucun message pour le moment</Text>
                            }
                        </View>
                    </View>
                </ScrollView>
            }
            {gardenScreenMode === 'post' &&
            <View style={{ height: '100%' }}>
                <ScrollView 
                    contentContainerStyle={{ alignItems: 'center' }}
                    keyboardShouldPersistTaps="always"
                >
                    <View style={{ width: '80%', gap: 20, paddingVertical: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                            <TouchableOpacity onPress={() => setGardenScreenMode('garden')} >
                                <ArrowLeftIcon size={ 24 } color='#294849' />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ fontSize: 20, fontFamily: 'Lato_700Bold', color: '#294849', lineHeight: 24, flex: 1 }}>{ currentPost.title }</Text>
                                <Text style={{ fontSize: 14, fontFamily: 'Lato_700Bold', color: '#000000BF' }} >{ currentGarden.name }</Text>
                                <Text style={{ fontSize: 12, fontFamily: 'Lato_400Regular', color: '#000000BF' }} >{ currentPost.owner } </Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, gap: 20, borderWidth: 1, borderColor: '#294849' }}>
                           <Text>{ currentPost.text }</Text>
                           {currentPost.pictures.length > 0 &&
                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                    {currentPost.pictures.map((picture, index) => {
                                        return (
                                            <Image source={{ uri: picture }} key={ index } style={{ width: 64, height: 64, borderRadius: 5 }} />
                                        )
                                    })}
                                </View>
                           }
                           <Likes likes={ currentPost.likes } owner={ currentPost.owner } gardenId={ currentPost.gardenId } postId={ currentPost.postId } onLikesChange={() => showPost(currentPost.gardenId, currentPost.postId) } />
                        </View>
                        {currentPost.replies.length > 0
                            ? <View style={{ gap: 20 }}>
                                {currentPost.replies
                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                    .map((reply, index) => {
                                        const { owner, text, createdAt } = reply
                                        return(
                                            <ReplyCard
                                                key={ index }
                                                owner={ owner }
                                                text={ text }
                                                createdAt={ createdAt }
                                            />
                                        )
                                    })
                                }
                            </View>
                            : <Text>Aucune réponse pour le moment</Text>
                        }
                    </View>
                </ScrollView>
                <ReplyForm gardenId={ currentPost.gardenId } postId={ currentPost.postId } showPost={() => showPost(currentPost.gardenId, currentPost.postId)} />
            </View>
            }
        </View>
    )
}

export default GardenScreen
