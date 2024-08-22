import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Text, Button, View, TouchableOpacity, Image, StyleSheet, Alert } from "react-native"
import * as LucideIcons from 'lucide-react-native';
import { useDispatch } from "react-redux";
import { updateUser } from "../reducers/user";
import * as ImagePicker from 'expo-image-picker';



const ppURIToDispatch = ''


const ProfileScreen = props => {

    const dispatch = useDispatch()

    const [gardens, setGardens] = useState([]);
    const { token, username, ppURI, } = useSelector(state => state.user);
    const user = useSelector(state => state.user)
    const [image, setImage] = useState(null);

    console.log(gardens)

    useEffect(() => {
        fetch(`${global.BACKEND_URL}/user/gardens`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            }
        }
        )
            .then(response => response.json())
            .then(data => {

                console.log(data)
                setGardens(data.gardens)
            })
    }
        , [])

    const pickImage = async () => {

        // No permissions request is necessary for launching the image library
        console.log('pickImage')
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log("result", result);

        if (!result.canceled) {
            setImage(result.assets[0].uri)
            dispatch(updateUser({ ppURI: result.assets[0].uri }))
        }
    };

    return (
        <>
            <View style={styles.container}>
                <Button title='dispatch ppURI' onPress={() => { dispatch(updateUser({ ppURI: ppURIToDispatch })) }} />
                <View style={styles.userc}>
                    <TouchableOpacity onPress={pickImage} style={styles.touchablepp}>
                        {!ppURI && <View >
                            <LucideIcons.UserRoundPen style={styles.nopp} size={50} color={"black"} opacity={0.5} />
                        </View>}
                        {ppURI && <Image source={{ uri: ppURI }} style={styles.ppuri} />}
                    </TouchableOpacity>
                    <View style={styles.descriptionc}>
                        <View style={styles.username}>
                            <Text>{username}</Text>
                            <LucideIcons.Pencil size={20} color={"black"} />
                        </View>
                        <Text style={styles.description} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fermentum,
                            justo et egestas feugiat, ex massa consequat erat,
                            eget mattis mi orci quis quam. Nunc faucibus at justo id euismod.
                        </Text>
                    </View>
                </View>
                <View style={styles.gardensc}>
                    <Text>Jardins</Text>
                    {gardens.map(garden => <View key={garden._id} title={garden.name} >
                        <LucideIcons.Leaf></LucideIcons.Leaf>
                        <Text>{garden.name}</Text>
                        <LucideIcons.CircleX></LucideIcons.CircleX>
                    </View>)}
                </View>
                <View style={styles.activitiesc}>
                    <Text>Activité récente</Text>
                </View>
            </View>

        </>
    )
}

export default ProfileScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userc: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
    },
    gardensc: {

    },
    activitiesc: {

    },
    touchablepp: {
        position: 'relative',
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        marginLeft: 20,
    },
    descriptionc: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 20,
        width: '90%',
    },
    username: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: 'black',
        borderWidth: 1,
    },
    ppuri: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
})