import { useIsFocused } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { useSelector } from "react-redux"

import EventsPreview from "../components/molecular/Accueil/EventsPreview"
import LastPostsPreview from "../components/molecular/Accueil/LastPostsPreview"
import PagesPreview from "../components/molecular/Accueil/PagesPreview"

const HomeScreen = ({ navigation }) => {

    const { navigate } = navigation
    const user = useSelector(state => state.user)
    const isFocused = useIsFocused()

    const [userSubscribedEvents, setUserSubscribedEvents] = useState(null)
    const [userGardenLastPosts, setUserGardenLastPosts] = useState(null)
    const [currentResources, setCurrentResources] = useState(null)

    // Set User Subscribed Events
    useEffect(() => {
        (async() => {
            const { token } = user
            const response = await fetch(`${global.BACKEND_URL}/user/events`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', token }
            })
            const json = await response.json()
            if(!json.result) return
            setUserSubscribedEvents(json.events)
        })()
    }, [isFocused])

    // Set User Gardens Last Posts
    useEffect(() => {
        (async() => {
            const { token } = user
            const limit = 5
            const response = await fetch(`${global.BACKEND_URL}/user/lastposts`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', token, limit }
            })
            const json = await response.json()
            if(!json.result) return
            setUserGardenLastPosts(json.lastPosts)
        })()
    }, [isFocused])
    
    // Set Current Resources
    useEffect(() => {
        (async() => {
            const { token } = user
            const month = (new Date()).getMonth()
            const response = await fetch(`${global.BACKEND_URL}/page/current/?month=${month}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', token }
            })
            const json = await response.json()
            if(!json.result) return
            setCurrentResources(json.pages)
        })()
    }, [isFocused])

    return (
        <ScrollView
            contentContainerStyle={{ backgroundColor: '#F9F2E0', alignItems: 'center', minHeight: '100%' }}
            keyboardShouldPersistTaps="always"
        >
            <View style={{ width: '80%', gap: 20, paddingVertical: 20 }} >
                
                <Text style={{ fontSize: 20, fontFamily: 'Lato_700Bold', color: '#294849', lineHeight: 24 }}>Bonjour {user.username}</Text>
                <Text>Vos prochains événements</Text>
                <Text>{JSON.stringify(userSubscribedEvents)}</Text>
                <Text>Derniers messages</Text>
                <Text>{JSON.stringify(userGardenLastPosts)}</Text>
                {currentResources &&
                    <View style={{ gap: 20 }}>
                        {currentResources.sow.fruit.length > 0 &&
                            <>
                            <Text style={{ fontSize: 16, fontFamily: 'Lato_700Bold', color: '#294849', lineHeight: 20 }}>Fruits à planter : </Text>
                            <ScrollView style={{ flexDirection: 'row', backgroundColor: '#BDCEBB', borderRadius: 20, padding: 10 }} horizontal={ true }>
                            {currentResources.sow.fruit.map((page, index) => {
                                return(
                                    <PagesPreview key={ index } name={page.name} image={page.image} navigate={(e) => navigate(e)} />
                                )
                            })
                            }
                            </ScrollView>
                            </>
                        }
                        {currentResources.sow.vegetable.length > 0 &&
                            <>
                            <Text style={{ fontSize: 16, fontFamily: 'Lato_700Bold', color: '#294849', lineHeight: 20 }}>Légumes à planter : </Text>
                            <ScrollView style={{ flexDirection: 'row', backgroundColor: '#C5BBA2', borderRadius: 20, padding: 10 }} horizontal={ true }>
                            {currentResources.sow.vegetable.map((page, index) => {
                                return(
                                    <PagesPreview key={ index } name={page.name} image={page.image} navigate={(e) => navigate(e)} />
                                )
                            })
                            }
                            </ScrollView>
                            </>
                        }
                        {currentResources.harvest.fruit.length > 0 &&
                            <>
                            <Text style={{ fontSize: 16, fontFamily: 'Lato_700Bold', color: '#294849', lineHeight: 20 }}>Fruits à récolter : </Text>
                            <ScrollView style={{ flexDirection: 'row', backgroundColor: '#BDCEBB', borderRadius: 20, padding: 10 }} horizontal={ true }>
                            {currentResources.harvest.fruit.map((page, index) => {
                                return(
                                    <PagesPreview key={ index } name={page.name} image={page.image} navigate={(e) => navigate(e)} />
                                )
                            })
                            }
                            </ScrollView>
                            </>
                        }
                        {currentResources.harvest.vegetable.length > 0 &&
                            <>
                            <Text style={{ fontSize: 16, fontFamily: 'Lato_700Bold', color: '#294849', lineHeight: 20 }}>Légumes à récolter : </Text>
                            <ScrollView style={{ flexDirection: 'row', backgroundColor: '#C5BBA2', borderRadius: 20, padding: 10 }} horizontal={ true }>
                            {currentResources.harvest.vegetable.map((page, index) => {
                                return(
                                    <PagesPreview key={ index } name={page.name} image={page.image} navigate={ navigate } />
                                )
                            })
                            }
                            </ScrollView>
                            </>
                        }
                    </View>
                }
            </View>
        </ScrollView>
    )
}

export default HomeScreen