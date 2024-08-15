import { TextInput } from "react-native"

const InputText = props => {
    return (
        <TextInput
            { ...props }
            placeholderTextColor='#C5BBA2'
            style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#C5BBA2',
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

export default InputText