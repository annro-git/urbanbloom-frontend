import { TextInput } from "react-native"

const TextArea = ({ placeholder, color, fontSize, onChangeText, value }) => {
    return (
        <TextInput 
            placeholder={ placeholder }
            onChangeText={ onChangeText }
            value={ value }
            placeholderTextColor={ color }
            multiline={ true }
            style={{
                color: '#000000BF',
                borderWidth: 1,
                borderColor: color,
                borderRadius: 5,
                padding: 20,
                backgroundColor: 'white',
                fontSize,
            }}
        />
    )
}

export default TextArea