import { Text } from "react-native"
import { useSelector } from "react-redux"

const ProfileScreen = () => {

    const user = useSelector(state => state.user)

    return (
        <>
            <Text>User: {JSON.stringify(user)}</Text>
        </>
    )
}

export default ProfileScreen