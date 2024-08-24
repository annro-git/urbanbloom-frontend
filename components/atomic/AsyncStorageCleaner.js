import { TouchableOpacity } from "react-native"
import { Trash2 } from "lucide-react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const AsyncStorageCleaner = ({ navigate, size }) => {
    return (
        <TouchableOpacity onPress={() => { 
            AsyncStorage.removeItem('persist:urbanbloom')
            navigate('Splash')
        }} >
            <Trash2 color='red' size={ size } />
        </TouchableOpacity>
    )
}

export default AsyncStorageCleaner