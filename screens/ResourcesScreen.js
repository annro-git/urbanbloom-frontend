import { View, ScrollView, Text, TouchableOpacity } from "react-native"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import PageTypeCard from "../components/molecular/Ressources/PageTypeCard"
import { ArrowLeft } from "lucide-react-native"

const ResourcesScreen = () => {

    const user = useSelector(state => state.user)
    const [pages, setPages] = useState(null)
    const [currentPage, setCurrentPage] = useState(null)

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
                    <Text>{JSON.stringify(currentPage)}</Text>
                </View>
            }
        </ScrollView>
    )
}

export default ResourcesScreen