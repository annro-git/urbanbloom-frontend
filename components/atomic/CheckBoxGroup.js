import { View, Text, Pressable } from "react-native"
import { Check } from "lucide-react-native"

const CheckBoxGroup = ({ options, selected, onSelect, color, size = 16 }) => {

    const handleSelect = (checkbox) => {
        if(selected.some(e => e === checkbox.value)){
            onSelect(selected.filter(e => e !== checkbox.value))
            return
        }
        onSelect([...selected, checkbox.value])
    }

    return (
        <View style={{ flexDirection: 'row', gap: 10 }}>
            { options.map((checkbox, index) => {
                return (
                    <Pressable style={{ flexDirection: 'row', gap: 5, alignItems: 'center', height: 30, justifyContent: 'center' }} onPress={() => handleSelect(checkbox)} key={ index } >
                        <View style={{ borderWidth: 1, borderColor: color, borderRadius: 5, width: size, height: size, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }} >
                            {selected.some(e => e === checkbox.value) &&
                                <Check color={color} size={size}/>
                            }
                        </View>
                        <Text style={{ color, fontFamily: 'Lato_400Regular', fontSize: 14 }}>{ checkbox.label }</Text>
                    </Pressable>
                )
            }) }
        </View>
    )
}

export default CheckBoxGroup