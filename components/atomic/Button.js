import { TouchableOpacity, Text } from "react-native"

const Button = ({ onPress, primary, secondary, border, text, padding, width }) => {
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={{
                alignItems: 'center',
                backgroundColor: primary,
                borderRadius: 10,
                justifyContent: 'center',
                padding: padding || 20,
                width: width || '100%',
                borderWidth: 1,
                borderColor: border ? border : 'transparent'
            }}
        >
            <Text
                style={{
                    color: secondary,
                    fontFamily: 'Lato_400Regular',
                    fontSize: 20,
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default Button