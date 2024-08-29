import { TouchableOpacity } from "react-native"
import { Trash2, LogOut } from "lucide-react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const AsyncStorageCleaner = ({ navigate, size }) => {
    return (
        <TouchableOpacity onPress={() => {
            AsyncStorage.removeItem('persist:urbanbloom')
            navigate('Splash')
        }} >
            <LogOut color='black' size={size} />
        </TouchableOpacity>
    )
}

export default AsyncStorageCleaner