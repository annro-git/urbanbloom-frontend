import { View, Text, Image } from "react-native"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import dayjs from 'dayjs'
import 'dayjs/locale/fr'

const ReplyCard = ({ createdAt, owner, text }) => {

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
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, flexDirection: 'row', gap: 20 }}>
            <Image source={{ uri: ownerPPURI }} style={{ width: 48, height: 48, borderRadius: 48 }} />
            <View style={{ flex: 1, gap: 5 }}>
                <Text>{ owner }, { dayjs(createdAt).locale('fr').fromNow() }</Text>
                <Text>{ text }</Text>
            </View>
        </View>
    )
}

export default ReplyCard