import { View, Text, Pressable } from "react-native"

const RadioButtonGroup = ({ options, selected, onSelect, color, size = 16 }) => {
    
    const handleSelect = (radio) => {
        onSelect(radio.value)
    }

    return (
        <View style={{ flexDirection: 'row', gap: 10 }}>
            { options.map((radio, index) => {
                return (
                    <Pressable style={{ flexDirection: 'row', gap: 5, alignItems: 'center', height: 30, justifyContent: 'center' }} onPress={() => handleSelect(radio) } key={ index }>
                        <View style={{ borderWidth: 1, borderColor: color, borderRadius: size, width: size, height: size, padding: 3, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }} >
                            {selected === radio.value && 
                                <View style={{ width: '100%', height: '100%', borderRadius: size, backgroundColor: color, }} ></View>
                            }
                        </View>
                        <Text style={{ color, fontFamily: 'Lato_400Regular', fontSize: 14 }}>{radio.label}</Text>
                    </Pressable>
                )
            }) }
        </View>
    )
}

export default RadioButtonGroup