import { TextInput as Input } from "react-native"

const TextInput = props => {
    
    return (
        <Input
            { ...props }
            placeholderTextColor={ props.color }
            style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: props.color,
                borderRadius: 5,
                color: '#000000BF',
                fontFamily: 'Lato_400Regular',
                fontSize: 16,
                padding: 20,
                width: '100%'
            }}
        />
    )
}

export default TextInput