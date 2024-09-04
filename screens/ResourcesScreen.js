import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { ArrowLeft } from "lucide-react-native"
import { useIsFocused } from "@react-navigation/native"

import PageTypeCard from "../components/molecular/Ressources/PageTypeCard"

const parseMonth = int => {
    const months = ['', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ]
    return months[int]
}

const ResourcesScreen = ({ route }) => {

    const isFocused = useIsFocused()

    const user = useSelector(state => state.user)
    const [pages, setPages] = useState(null)
    const [currentPage, setCurrentPage] = useState(null)

    // Get all items
    useEffect(() => {
        (async() => {
            const { token } = user
            const response = await fetch(`${global.BACKEND_URL}/page/all/`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', token }
            })
            const json = await response.json()
            if(!json.result) return

            setPages(json.pages)
        })()
    }, [])

    // Manage display from another screen
    useEffect(() => {
        if(!route.params) return
        selectPage(route.params)
    }, [isFocused])
    

    const selectPage = pageName => {
        (async() => {
            const { token } = user
            const response = await fetch(`${global.BACKEND_URL}/page/?name=${pageName}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', token }
            })
            const json = await response.json()
            if(!json.result) return

            setCurrentPage(json.page)
        })()
    }
    
    return (
        <ScrollView contentContainerStyle={{ minHeight: '100%', alignItems:'center', backgroundColor: '#F9F2E0' }}>
            {!currentPage &&
                <View style={{ width: '80%', gap: 20, paddingVertical: 20 }}>
                    <Text style={{ fontSize: 20, color: '#000000BF', fontFamily: 'Lato_700Bold', color: '#294849', lineHeight: 24 }}>
                        Ressources
                    </Text>
                    <Text>Dans cette section, retrouvez une encyclopédie de connaissance pour parfaire votre jardin : </Text>
                    {pages && pages.some(page => page.type === 'fruit') &&
                        <PageTypeCard
                            pages= { pages.filter(page => page.type === 'fruit') }
                            title='Fruits'
                            selectPage={e => selectPage(e)}
                            color='#BDCEBB'
                        />
                    }
                    {pages && pages.some(page => page.type === 'vegetable') &&
                        <PageTypeCard
                            pages= { pages.filter(page => page.type === 'vegetable') }
                            title='Légumes'
                            selectPage={e => selectPage(e)}
                            color='#C5BBA2'
                        />
                    }
                    {pages && pages.some(page => page.type === 'flower') &&
                        <PageTypeCard
                            pages= { pages.filter(page => page.type === 'flower') }
                            title='Fleurs'
                            selectPage={e => selectPage(e)}
                            color='#FEC2A9'
                        />
                    }
                </View>
            }
            {currentPage &&
                <View style={{ width: '80%', gap: 20, paddingVertical: 20 }}>
                    <View>
                        <TouchableOpacity onPress={() => setCurrentPage(null)} style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                            <ArrowLeft size={ 24 } color='#294849' />
                            <Text style={{ fontSize: 20, color: '#000000BF', fontFamily: 'Lato_700Bold', color: '#294849', lineHeight: 24 }}>
                                {currentPage.name}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'Lato_700Bold', fontSize: 18, color: '#000000BF'}}>Semis : </Text>
                            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 18, color: '#000000BF'}}>de {parseMonth(currentPage.sow.from)} à {parseMonth(currentPage.sow.to)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'Lato_700Bold', fontSize: 18, color: '#000000BF'}}>Récolte : </Text>
                            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 18, color: '#000000BF'}}>de {parseMonth(currentPage.harvest.from)} à {parseMonth(currentPage.harvest.to)}</Text>
                        </View>
                    </View>
                    <Image source={{ uri: currentPage.image }} style={{width: '100%', borderRadius: 10, height: 250 }} />
                    <Text>
                        {currentPage.text}
                    </Text>
                </View>
            }
        </ScrollView>
    )
}

export default ResourcesScreen