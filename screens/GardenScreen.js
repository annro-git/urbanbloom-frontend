import { useState, useEffect } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native"
import { useSelector } from "react-redux"
import { useIsFocused } from "@react-navigation/native"
import { ArrowLeft } from "lucide-react-native"

import GardenCard from "../components/molecular/Jardins/GardenCard"
import PostCard from "../components/molecular/Jardins/PostCard"
import ReplyCard from "../components/molecular/Jardins/ReplyCard"
import ReplyForm from "../components/molecular/Jardins/ReplyForm"
import Button from "../components/atomic/Button"
import CreateGardenForm from "../components/molecular/Jardins/CreateGardenForm"
import Likes from "../components/molecular/Jardins/Likes"
import dayjs from 'dayjs'
import 'dayjs/locale/fr'

const GardenScreen = ({ navigation }) => {

    const { navigate } = navigation

    const isFocused = useIsFocused()

    const user = useSelector(state => state.user)

    const [currentGardens, setCurrentGardens] = useState(null)
    const [currentGarden, setCurrentGarden] = useState(null)
    const [currentPosts, setCurrentPosts] = useState(null)
    const [currentPost, setCurrentPost] = useState(null)
    const [currentEvents, setCurrentEvents] = useState(null)
    const [currentEvent, setCurrentEvent] = useState(null)
    const [gardenForm, setGardenForm] = useState(false)
    const [init, setInit] = useState(false)

    // Set Gardens
    useEffect(() => {
      (async() => {
        const { token } = user
        const response = await fetch(`${global.BACKEND_URL}/user/gardens/details`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', token }
        })
        const json = await response.json()
        if(!json.result) return
        setCurrentGardens(json.gardens)
      })()
    }, [isFocused, init])

    // Reset Garden
    const resetGarden = () => {
        setCurrentGarden(null)
        setCurrentPosts(null)
        setCurrentPost(null)
        setCurrentEvents(null)
        setCurrentEvent(null)
        setGardenForm(false)
        setInit(!init)
    }

    // Set Garden
    const setGarden = async(garden) => {
        const { token } = user
        const response = await fetch(`${global.BACKEND_URL}/garden/${garden.id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', token }
        })
        const json = await response.json()
        if(!json.result) return
        setCurrentEvent(null)
        setCurrentEvents(json.events)
        setCurrentPost(null)
        setCurrentPosts(json.posts)
        setCurrentGarden(garden)
    }

    // Set Post
    const setPost = async(garden, post) => {
        const { token } = user
        const response = await fetch(`${global.BACKEND_URL}/garden/${garden.id}/post/${post.id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', token }
            })
        const json = await response.json()
        if(!json.result) return
        setCurrentEvent(null)
        setCurrentEvents(null)
        setCurrentPost(json.post)
        setCurrentPosts(null)
    }

    // Set Likes
    const setLikes = (post) => {
        if(!currentPost){
            setGarden(currentGarden)
            return
        }
        setPost(currentGarden, post)
    }

    return (
        <>
        {/* Default */}
        {!gardenForm && !currentGarden && !currentPost && !currentEvent &&
        <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={styles.wrapper}>
            
            {currentGardens && currentGardens.length > 0
                ? <>
                <View style={styles.container}>
                    <Text style={styles.title}>Mes jardins</Text>
                </View>
                <View style={styles.container}>
                {currentGardens.map((garden, index) => {
                    const { name, description, ppURI, members } = garden
                    return(
                        <GardenCard 
                            key={ index } 
                            name={ name } 
                            description={ description } 
                            ppURI={ ppURI } 
                            members={ members }
                            setLikes={() => setLikes(post)}
                            setGarden={() => setGarden(garden)}
                        />
                    )
                })}
                    <Button text='Nouveau jardin' primary='white' secondary='#466760' onPress={() => setGardenForm(true)} />
                </View>
                </>
                : <View style={{...styles.container, height: '100%', justifyContent: 'center'}}>
                    <Text style={styles.paragraph}>Vous n'êtes inscrit à aucun Jardin {'\n'}pour le moment !</Text>
                    <Button text='Rechercher' primary='#466760' secondary='white' onPress={() => navigate('Recherche')} />
                    <Button text='Nouveau jardin' primary='white' secondary='#466760' onPress={() => setGardenForm(true)} />
                </View>
            }
        </ScrollView>
        }
        {/* Garden View */}
        {!gardenForm && currentGarden && !currentPost && !currentEvent &&
        <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={styles.wrapper}>
            <View style={[styles.container, styles.header]}>
                    <TouchableOpacity onPress={() => resetGarden()}>
                        <ArrowLeft size={ 24 } color='#294849' />
                    </TouchableOpacity>
                    <Text style={{...styles.title, flex: 1}}>{ currentGarden.name }</Text>
            </View>
            {/* Events list */}
            {currentEvents && currentEvents.length > 0
                ? <View style={styles.container}>
                    <Text>{JSON.stringify(currentEvents)}</Text>
                </View>
                : <Text>Aucun événement à venir !</Text>
            }
            {/* Posts list */}
            {currentPosts && currentPosts.length > 0
                ? <View style={styles.container}>
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
                                setPost={() => setPost(currentGarden, post) }
                                setLikes={ () => setLikes(post) }
                            />
                        )
                    })
                }
                <Button text='Publier' primary='white' secondary='#466760' onPress={() => navigate('Publier')} />
                </View>
                : <View style={{ ...styles.container, flex: 1, justifyContent: 'center' }}>
                    <Text style={styles.paragraph}>Aucune publication pour le moment !</Text>
                    <Button text='Publier' primary='white' secondary='#466760' onPress={() => navigate('Publier')} />
                </View>
            }
        </ScrollView>
        }
        {/* Post View */}
        {!gardenForm && currentGarden && currentPost && !currentEvent &&
        <View style={styles.postWrapper}>
            <View style={[styles.container, styles.header]}>
                    <TouchableOpacity onPress={() => setGarden(currentGarden)}>
                        <ArrowLeft size={ 24 } color='#294849' />
                    </TouchableOpacity>
                    <View style={{ gap: 2, flex: 1 }}>
                        <Text style={styles.title}>{ currentPost.title }</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'Lato_700Bold', color: '#000000BF' }} >{ currentGarden.name }</Text>
                        <Text style={{ fontSize: 12, fontFamily: 'Lato_400Regular', color: '#000000BF' }} >{ currentPost.owner }, { dayjs(currentPost.createdAt).locale('fr').fromNow() } </Text>
                    </View>
            </View>
            
            {currentPost.replies.length > 0
                ? <ScrollView keyboardShouldPersistTaps="always" style={{ width: '100%' }} contentContainerStyle={{...styles.container, alignSelf: 'center'}}>
                {/* Post */}
                <View style={{ width: '100%', backgroundColor: 'white', padding: 20, borderRadius: 10, gap: 20, borderWidth: 1, borderColor: '#294849' }}>
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
                    <Likes 
                        likes={ currentPost.likes } 
                        owner={ currentPost.owner } 
                        gardenId={ currentGarden.id } 
                        postId={ currentPost.id } 
                        setLikes={() => setLikes(currentPost) }
                    />
                </View>                
                {/* Replies */}
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
                </ScrollView>
                : <Text>Post + pas de reply + reply form</Text>
            }
            <ReplyForm 
                gardenId={ currentGarden.id } 
                postId={ currentPost.id } 
                setPost={() => setPost(currentGarden, currentPost)} 
            />
        </View>
        }
        {/* Event View */}
        {!gardenForm && currentGarden && !currentPost && currentEvent &&
        <>
            {currentEvent.subscriber.some(name => name === user.name)
                ? <Text>Event + vous êtes inscrit blabla</Text>
                : <Text>Event + bouton inscrire</Text>
            }
        </>
        }
        {/* Create Garden View */}
        {gardenForm &&
            <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{...styles.wrapper, paddingVertical: 0,}}>
                <View style={{...styles.container, ...styles.header, paddingTop: 20 }}>
                    <TouchableOpacity onPress={() => setGardenForm(false)}>
                        <ArrowLeft size={ 24 } color='#294849' />
                    </TouchableOpacity>
                    <Text>Annuler</Text>
                </View>
                <CreateGardenForm 
                    style={{ width: '80%', gap: 20, paddingBottom: 20 }}
                    resetGarden={() => resetGarden()}
                />
            </ScrollView>
        }
        </>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#F9F2E0',
        minHeight: '100%',
        gap: 20,
        paddingVertical: 20,
        alignItems: 'center'
    },
    postWrapper: {
        backgroundColor: '#F9F2E0',
        height: '100%',
        gap: 20,
        paddingVertical: 20,
        alignItems: 'center'
    },
    container: {
        width: '80%',
        gap: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    title: {
        fontFamily: 'Lato_700Bold',
        fontSize: 20,
        color: '#294849',
    },
    paragraph: {
        fontSize: 16, 
        fontFamily: 'Lato_400Regular', 
        textAlign: 'center',
    },
})

export default GardenScreen