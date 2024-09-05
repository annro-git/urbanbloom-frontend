import { Text, ScrollView, View, Image, TouchableOpacity, Keyboard, TextInput } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useIsFocused } from "@react-navigation/native"
import { Camera } from "lucide-react-native"
import { Pen } from "lucide-react-native"

import Button from "../components/atomic/Button"
import AsyncStorage from "@react-native-async-storage/async-storage"
import EditableText from "../components/atomic/EditableText"
import CustomCamera from "../components/molecular/CustomCamera"
import { updateData } from "../reducers/user"

const ProfileScreen = ({ navigation }) => {

    const { navigate } = navigation
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const user = useSelector(state => state.user)

    const [cameraOverlay, setCameraOverlay] = useState(null)
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [pp, setPp] = useState(null)
    const [newPp, setNewPp] = useState(null)
    const [editBio, setEditBio] = useState(false)
    const [bio, setBio] = useState('')

    // Set Camera
    const camera = () => {
        Keyboard.dismiss()
        return (
            <View style={{ zIndex: 3, width: '100%', height: '100%', position: 'absolute' }}>
                <CustomCamera 
                    facingOption='front' 
                    closeCamera={() => setCameraOverlay(null)} 
                    savePictureURI={(e) => setNewPp(e)} 
                    pictureUrls={ newPp } 
                />
            </View>
        )
    }

    // Upload picture and set it as new pp
    useEffect(() => {
        if(newPp){
            (async() => {
                const { token } = user
                const image = await fetch(newPp)
                const blob = await image.blob()
                const body = new FormData
    
                body.append('token', user.token)
                body.append('blob', {
                    uri: newPp,
                    name: blob.data.name,
                    type: blob.data.type,
                })
    
                const uploadResponse = await fetch(`${global.BACKEND_URL}/picture`, { method: 'POST', body })
                const uploadJson = await uploadResponse.json()
                if(!uploadJson.result) return
                
                const response = await fetch(`${global.BACKEND_URL}/user/pp`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token, newPpURI: uploadJson.url })
                })
                const json = await response.json()
                if(!json.result) return
    
                setPp(uploadJson.url)
            })()
        }
    }, [newPp])

    // Get profile picture
    useEffect(() => {
      (async() => {
        const { username, token } = user
        const response = await fetch(`${global.BACKEND_URL}/user/pp`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', username, token }
        })
        const json = await response.json()
        if(!json.result) return
        setPp(json.ppURI)
      })()
    }, [isFocused])

    // Get user data
    useEffect(() => {
        (async() => {
            const { token } = user
            const response = await fetch(`${global.BACKEND_URL}/user`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', token }
            })
            const json = await response.json()
            if(!json.result) return
            setBio(json.user.bio)
            setFirstname(json.user.firstname)
            setLastname(json.user.lastname)
        })()
    }, [isFocused])

    // Save user
    const saveUser = async() => {
        const { token } = user
        const response = await fetch(`${global.BACKEND_URL}/user/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, firstname, lastname, bio })
        })
        const json = await response.json()
        if(!json.result) return
        dispatch(updateData({firstname, lastname, bio}))
    }

    return (
        <ScrollView contentContainerStyle={{ minHeight: '100%', alignItems:'center', backgroundColor: '#F9F2E0' }} keyboardShouldPersistTaps="never">
            <View style={{ width: '80%', gap: 20, paddingVertical: 20 }}>
                <Text style={{ fontSize: 20, color: '#000000BF', fontFamily: 'Lato_700Bold', color: '#294849', lineHeight: 24 }}>
                    Mon profil
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                    <View style={{ width: 100, height: 100 }}>
                        <TouchableOpacity onPress={() => setCameraOverlay(camera)} style={{ position: 'absolute', zIndex: 2, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Camera size={48} color='#FFFFFFBF' />
                        </TouchableOpacity>
                        {pp &&
                            <Image source={{ uri: pp }} style={{ width: '100%', height: '100%', borderRadius: 100 }} />
                        }
                    </View>
                    <TouchableOpacity style={{ flex: 1, gap: 10 }} onPress={() => setEditBio(!editBio)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, justifyContent: 'space-between' }}>
                            <Text style={{fontFamily: 'Lato_700Bold', fontSize: 16}}>Bio : </Text>
                            <Pen size={ 16 } color='black' />
                        </View>
                        {!editBio
                            ? <Text style={{fontFamily: 'Lato_400Regular', fontSize: 16,}}>{bio}</Text>
                            : <TextInput
                                value={bio} 
                                onChangeText={e => setBio(e)} 
                                style={{ backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 10, flex: 1, borderRadius: 5, fontFamily: 'Lato_400Regular', fontSize: 16 }}
                                onSubmitEditing={() => setEditBio(false)} 
                                autoFocus={true}
                                onBlur={() => setEditBio(false)}
                            />
                        }
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, gap: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{fontFamily: 'Lato_700Bold', fontSize: 16}}>Identifiant : </Text>
                            <Text style={{fontFamily: 'Lato_400Regular', fontSize: 16, paddingLeft: 10}}>{user.username}</Text>
                        </View>
                        <EditableText value={ firstname } onChangeText={(e) => setFirstname(e)} label="Prénom" />
                        <EditableText value={ lastname } onChangeText={(e) => setLastname(e)} label="Nom" />
                    </View>
                    <Button text="Sauvegarder" primary="white" secondary="#294849" onPress={() => saveUser()} />
                    <Button text="Se déconnecter" primary='#FEC2A9' secondary='#000000BF' onPress={async() => {
                        await AsyncStorage.removeItem('persist:urbanbloom')
                        navigate('Splash')
                    }} />
                </View>
            { cameraOverlay }
        </ScrollView>
    )
}

export default ProfileScreen