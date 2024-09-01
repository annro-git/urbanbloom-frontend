import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { useState } from "react"
import { Pen } from "lucide-react-native"

const EditableText = ({ value, onChangeText, label }) => {

    const [edit, setEdit] = useState(false)

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'Lato_700Bold', fontSize: 16 }}>{label} : </Text>
        {!edit
            ? <TouchableOpacity onPress={() => setEdit(true)} style={{ flexDirection: 'row', justifyContent:'space-between', flex: 1 }}>
                <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, paddingLeft: 10 }}>{value}</Text>
                <Pen size={ 16 } color='black' />
            </TouchableOpacity>
            : <View style={{ backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 10, flex: 1, borderRadius: 5 }}>
                <TextInput 
                    style={{fontFamily: 'Lato_400Regular', fontSize: 16,}}
                    value={ value } 
                    onChangeText={(e) => onChangeText(e)} 
                    onSubmitEditing={() => setEdit(false)} 
                    autoFocus={true}
                    onBlur={() => setEdit(false)}
                />
            </View>
        }
        </View>
    )
}

export default EditableText