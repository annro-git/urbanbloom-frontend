import { View, Text, Keyboard, TouchableOpacity } from "react-native"
import { Send } from "lucide-react-native"
import { useState } from "react"
import { useSelector } from "react-redux"

import TextInput from "../../atomic/InputText"

const ReplyForm = ({ postId, gardenId, showPost }) => {

    const user = useSelector(state => state.user)
    const [replyText, setReplyText] = useState('')

    const sendReply = async () => {
        const { token } = user
        const response = await fetch(`${global.BACKEND_URL}/garden/${gardenId}/post/${postId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, text: replyText })
        })
        const json = await response.json()
        if(!json.result) return

        setReplyText('')
        showPost()
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 20, width: '80%', alignSelf: 'center', gap: 10 }}>
            <View style={{ flex: 1 }}>
                <TextInput
                    placeholder='Réponse' 
                    padding={ 10 }
                    width='100%'
                    value={ replyText }
                    onChangeText={ setReplyText }
                    color='#C5BBA2'
                    onSubmitEditing={() => sendReply()}
                />
            </View>
            <TouchableOpacity 
                style={{ backgroundColor: '#C5BBA2', justifyContent: 'center', alignItems: 'center', padding: 16, borderRadius: 5 }}
                onPress={() => sendReply()}
            >
                <Send color='white' size={ 16 } />
            </TouchableOpacity>
        </View>
    )
}

export default ReplyForm