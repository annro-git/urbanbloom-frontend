import { View, Text, Pressable, TouchableOpacity } from "react-native"
import { ChevronDown, ChevronUp } from "lucide-react-native"
import { useState } from "react"

const InputSelect = ({ placeholder, options, selected, onSelect, color, size = 16 }) => {

    const [isOpen, setIsOpen] = useState(false)

    const handleSelect = (option) => {
        onSelect(option)
        setIsOpen(!isOpen)
    }
    
    return (
        <View>
            <View
                style={[{
                    width: '100%',
                    borderWidth: 1,
                    borderColor: color,
                    borderRadius: 5,
                    paddingVertical: 10,
                    backgroundColor: 'white',
                    position: 'relative'
                },
                isOpen && {
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderBottomWidth: 0,
                }
            ]}
            >
                <Pressable 
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: 10,
                        paddingHorizontal: 20
                    }}
                    onPress={() => setIsOpen(!isOpen)}
                >
                    {selected
                        ? <Text style={{ fontFamily: 'Lato_400Regular', fontSize: size, color: '#000000BF'}}>{ selected.name }</Text>
                        : <Text style={{ fontFamily: 'Lato_400Regular', fontSize: size, color}}>{ placeholder }</Text>
                    }
                    {isOpen
                        ? <ChevronUp size={ 20 } color={ color } />
                        : <ChevronDown size={ 20 } color={ color } />
                    }
                </Pressable>
            </View>
            { isOpen &&
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: color,
                        borderTopWidth: 0,
                        borderBottomRightRadius: 5,
                        borderBottomLeftRadius: 5,
                        backgroundColor: 'white',
                        width: '100%',
                        position: 'absolute',
                        top: 59,
                        paddingBottom: 10
                    }}
                >
                {options.map((option, index) => {
                    return (
                        <TouchableOpacity key={ index } style={{paddingHorizontal: 20}} onPress={() => handleSelect(option)}>
                            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: size, color: '#000000BF', paddingVertical: 10 }} >{ option.name }</Text>
                        </TouchableOpacity>
                    )
                })}
                </View> 
            }
        </View>
    )
}

export default InputSelect