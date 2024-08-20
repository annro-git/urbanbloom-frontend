import { Text } from "react-native"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateGardens } from "../reducers/user"

const PostScreen = ({ navigation }) => {

    const { navigate } = navigation

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    useEffect(() => {
        (async() => {
            const response = await fetch(`${global.BACKEND_URL}/user/gardens`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', token: user.token }
            })
            const json = await response.json()
            json.result && dispatch(updateGardens(json.gardens))
        })()
    }, [])
    

    return (
        <Text>PostScreen {user.gardens.join(',')}</Text>
    )
}

export default PostScreen