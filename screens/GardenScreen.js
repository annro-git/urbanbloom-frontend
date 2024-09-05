import { useState, useEffect } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native"
import { useSelector } from "react-redux"
import { useIsFocused } from "@react-navigation/native"
import { ArrowLeft } from "lucide-react-native"

import dayjs from 'dayjs'
import 'dayjs/locale/fr'

import GardenCard from "../components/molecular/Jardins/GardenCard"
import PostCard from "../components/molecular/Jardins/PostCard"
import ReplyCard from "../components/molecular/Jardins/ReplyCard"
import ReplyForm from "../components/molecular/Jardins/ReplyForm"
import Button from "../components/atomic/Button"
import CreateGardenForm from "../components/molecular/Jardins/CreateGardenForm"
import Likes from "../components/molecular/Jardins/Likes"
import EventsWrapper from "../components/molecular/Jardins/EventsWrapper"

const GardenScreen = ({ navigation, route }) => {

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

    // Manage display from another screen
    useEffect(() => {
        if(!route.params) return
        if(route.params.garden){
            setGarden(route.params.garden)
        }
    }, [isFocused])
    

    // Refresh on Focus
    useEffect(() => {
      if(!route.params){
        if(currentPost){
            setPost(currentGarden, currentPost)
          }
          if(currentEvent){
            setEvent(currentEvent)
          }
          if(currentGarden && !currentPost && !currentEvent){
            setGarden(currentGarden)
          }
      }
    }, [isFocused])
    

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
        setCurrentEvents(json.events)
        setCurrentEvent(null)
        setCurrentPosts(json.posts)
        setCurrentPost(null)
        setCurrentGarden(json.garden)
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
        setCurrentEvents(null)
        setCurrentEvent(null)
        setCurrentPosts(null)
        setCurrentPost(json.post)
    }

    // Set Likes
    const setLikes = (post) => {
        if(!currentPost){
            setGarden(currentGarden)
            return
        }
        setPost(currentGarden, post)
    }

    // Set Event
    const setEvent = event => {
        setCurrentEvents(null)
        setCurrentEvent(event)
        setCurrentPosts(null)
        setCurrentPost(null)
    }

    // Subscribe Event
    const subscribeEvent = async(event) => {
        const { token, username } = user
        const response = await fetch(`${global.BACKEND_URL}/garden/${currentGarden.id}/event/${event.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, username })
        })
        const json = await response.json()
        if(!json.result) return
        setGarden(currentGarden)
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
            <EventsWrapper
                events={ currentEvents }
                setEvent={(e) => setEvent(e)}
                subscribeEvent={ subscribeEvent }
            />
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
                <Button text='Publier' primary='white' secondary='#466760' onPress={() => navigate('Publier', {garden: {id: currentGarden.id, name: currentGarden.name}})} />
                </View>
                : <View style={{ ...styles.container, flex: 1, justifyContent: 'center' }}>
                    <Text style={styles.paragraph}>Aucune publication pour le moment !</Text>
                    <Button text='Publier' primary='white' secondary='#466760' onPress={() => navigate('Publier', {garden: {id: currentGarden.id, name: currentGarden.name}})} />
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
            
            <ScrollView keyboardShouldPersistTaps="always" style={{ width: '100%' }} contentContainerStyle={{...styles.container, alignSelf: 'center'}}>
                {/* Post */}
                <View style={{ width: '100%', backgroundColor: 'white', padding: 20, borderRadius: 10, gap: 20, borderWidth: 1, borderColor: '#294849' }}>
                    <Text style={{...styles.paragraph, textAlign: 'left'}}>{ currentPost.text }</Text>
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
                {currentPost.replies.length === 0 &&
                    <Text style={{fontSize: 16, fontFamily: 'Lato_400Regular', color: '#000000BF'}}>Répondez en premier !</Text>
                }
                </ScrollView>
            <ReplyForm 
                gardenId={ currentGarden.id } 
                postId={ currentPost.id } 
                setPost={() => setPost(currentGarden, currentPost)} 
            />
        </View>
        }
        {/* Event View */}
        {!gardenForm && currentGarden && !currentPost && currentEvent &&
        <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={styles.wrapper}>
            <View style={[styles.container, styles.header]}>
                <TouchableOpacity onPress={() => setGarden(currentGarden)}>
                    <ArrowLeft size={ 24 } color='#294849' />
                </TouchableOpacity>
                <View style={{ gap: 2, flex: 1 }}>
                    <Text style={styles.title}>{ currentEvent.title }</Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Lato_700Bold', color: '#000000BF' }} >{ currentGarden.name }</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'Lato_400Regular', color: '#000000BF' }} >{ currentEvent.owner }, { dayjs(currentEvent.createdAt).locale('fr').fromNow() } </Text>
                </View>
            </View>
            <View style={{ width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10, gap: 20, borderWidth: 1, borderColor: '#294849' }}>
                <Text>{ currentEvent.text }</Text>
                {currentEvent.pictures && currentEvent.pictures.length > 0 &&
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        {currentEvent.pictures.map((picture, index) => {
                            return (
                                <Image source={{ uri: picture }} key={ index } style={{ width: 64, height: 64, borderRadius: 5 }} />
                            )
                        })}
                    </View>
                }
            </View>
            <View style={{ width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10, gap: 10 }}>
                <Text style={{ fontFamily: 'Lato_700Bold', fontSize: 14 }}>Inscrit(s):</Text>
                <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 12 }}>{currentEvent.subscribers.join(', ')}</Text>
            </View>
            {currentEvent.owner === user.username
                ? <Text style={styles.paragraph}>Vous êtes l'organisateur de cet événement.</Text>
                : <>
                {!currentEvent.subscribers.some(e => e === user.username)
                    ? <Button width="80%" text="S'inscrire" primary='white' secondary='#466760' onPress={() => subscribeEvent(currentEvent)} />
                    : <Button width="80%" text="Se désinscrire" primary='white' secondary='#466760' onPress={() => subscribeEvent(currentEvent)} />
                }
                </>
            }
        </ScrollView>
        }
        {/* Create Garden View */}
        {gardenForm &&
            <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{...styles.wrapper, paddingVertical: 0,}}>
                <View style={{...styles.container, ...styles.header, paddingTop: 20 }}>
                    <TouchableOpacity onPress={() => setGardenForm(false)}>
                        <ArrowLeft size={ 24 } color='#294849' />
                    </TouchableOpacity>
                    <Text style={styles.title}>Annuler</Text>
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