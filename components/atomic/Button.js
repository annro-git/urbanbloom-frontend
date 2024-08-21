import { TouchableOpacity, Text } from "react-native"

const Button = props => {
    return (
        <TouchableOpacity 
            onPress={props.onPress}
            style={{
                alignItems: 'center',
                backgroundColor: props.primary,
                borderRadius: 10,
                justifyContent: 'center',
                padding: props.padding || 20,
                width: props.width || '100%',
                borderWidth: 1,
                borderColor: props.border ? props.border : 'transparent'
            }}
        >
            <Text
                style={{
                    color: props.secondary,
                    fontFamily: 'Lato_400Regular',
                    fontSize: 20,
                }}
            >
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}

export default Button