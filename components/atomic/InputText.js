import { TextInput as Input } from "react-native"

const TextInput = ({ placeholder, color, padding, width, onChangeText, value, autoCapitalize, autoComplete, inputMode, onSubmitEditing }) => {
    
    return (
        <Input
            placeholder={ placeholder }
            placeholderTextColor={ color }
            style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: color,
                borderRadius: 5,
                color: '#000000BF',
                fontFamily: 'Lato_400Regular',
                fontSize: 16,
                padding: padding || 20,
                width: width || '100%'
            }}
            onChangeText={ onChangeText }
            value={ value }
            autoCapitalize={ autoCapitalize || 'sentences' }
            autoComplete={ autoComplete || 'off' }
            inputMode={ inputMode || 'text' }
            onSubmitEditing={ onSubmitEditing || '' }
        />
    )
}

export default TextInput