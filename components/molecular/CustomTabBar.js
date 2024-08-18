import { useNavigation } from "@react-navigation/native"
import { View, Text, TouchableOpacity } from "react-native"

const CustomTabBar = ({ state, descriptors, navigation }) => {

    const { navigate } = useNavigation()

    return (
        <View style={{
            alignItems: 'center',
            backgroundColor: '#294849', 
            flexDirection: 'row', 
            justifyContent: 'space-evenly',
            paddingHorizontal: 5,
            paddingVertical: 20,
        }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]
                const { Icon, position } = options.tabBarIcon
                const label = route.name
                const isFocused = state.index === index
                if(position === 'bottom'){
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                const event = navigation.emit({
                                    type: 'tabPress',
                                    target: route.key,
                                    canPreventDefault: true
                                })
                                if (!isFocused && !event.defaultPrevented){
                                    navigate(route.name)
                                }
                            }}
                            key={route.name}
                            style={{
                                alignItems: 'center',
                                width: '20%',
                            }}
                        >
                            <Icon color={ isFocused ? '#FEC2A9' : '#BDCEBB' } />
                            <Text style={{ color: isFocused ? '#FEC2A9' : '#BDCEBB' }}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    )
                }
            })}
        </View>
    )
}

export default CustomTabBar