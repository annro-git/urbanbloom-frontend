import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Text, Button, View, TouchableOpacity, Image, StyleSheet, Modal, TextInput, CheckBox, Alert } from "react-native"
import * as LucideIcons from 'lucide-react-native';
import { useDispatch } from "react-redux";
import { updateUser } from "../reducers/user";
import * as ImagePicker from 'expo-image-picker';
import CheckBoxGroup from "../components/atomic/CheckBoxGroup";


const ppURIToDispatch = ''

const ProfileScreen = props => {

    const interestOptions = [
        { label: 'Fruits', value: 'fruits', },
        { label: 'Légumes', value: 'vegetables', },
        { label: 'Fleurs', value: 'flowers', },
    ]

    const bonusOptions = [
        { label: 'Accessibilité', value: 'a11y' },
        { label: 'Animaux', value: 'dogs' },
        { label: 'Point d\'eau', value: 'water' },
    ]

    const dispatch = useDispatch()

    const [gardens, setGardens] = useState([]);
    const { token, username, ppURI, } = useSelector(state => state.user);
    const user = useSelector(state => state.user)
    const [image, setImage] = useState(null);
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [openModal, setOpenModal] = useState(false);
    const [interest, setInterest] = useState([]);
    const [bonus, setBonus] = useState([]);
    const [address, setAdress] = useState('')



    const fetchGardens = async () => {

        const response = await fetch(`${global.BACKEND_URL}/user/gardens`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            }
        }
        )
        const data = await response.json()

        setGardens(data.gardens)

    }

    useEffect(() => {

        fetchGardens()
    }

        , [])

    const pickImage = async () => {

        if (status !== 'granted') {
            requestPermission();
        }

        // No permissions request is necessary for launching the image library

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri)
            dispatch(updateUser({ ppURI: result.assets[0].uri }))
        }
    };

    const createGarden = async () => {

        

        const reponse = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${address}`)
        const data = await reponse.json()
        if (data.code === '400') {
            Alert.alert('Adresse invalide')
            return
        }

        fetch(`${global.BACKEND_URL}/garden`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
                name: 'new garden',
                description: 'description',
                interests: interest,
                bonus: bonus,
                coordinates: {
                    latitude: data.features[0].geometry.coordinates[1],
                    longitude: data.features[0].geometry.coordinates[0],
                },
            })
        }
        )
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.result === true) {
                    fetchGardens()
                  
                }
            })
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
                        <View style={styles.usernamec}>
                            <Text style={styles.username}>{username}</Text>
                            <LucideIcons.Pencil size={20} color={"black"} />
                        </View>
                        <Text style={styles.description} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fermentum,
                            justo et egestas feugiat, ex massa consequat erat,
                            eget mattis mi orci quis quam. Nunc faucibus at justo id euismod.
                        </Text>
                    </View>
                </View>
                <View style={styles.jardinsc}>
                    <View style={styles.jardins}>
                        <Text style={styles.jardin}>Jardins</Text>
                        <TouchableOpacity onPress={() => { setOpenModal(true) }} >
                            <LucideIcons.CirclePlus style={styles.circleplus} size={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.gardensgrid}>
                        {gardens.map(garden => <View key={garden._id} title={garden.name} style={styles.gardenc} >
                            <LucideIcons.Leaf style={styles.leaf} />
                            <Text> {garden.name}</Text>
                        </View>)}
                    </View>
                </View>
                <View style={styles.activitiesc}>
                    <Text style={styles.activites}>Activité récente</Text>
                </View>
                <Modal style={styles.modal}
                    animationType="fade"
                    transparent={true}
                    visible={openModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modal}>
                            <Text>Nouveau jardin:</Text>
                            <TextInput placeholder='Nom du jardin' />
                            <TextInput placeholder='Description' />
                            <View>
                                <Text>Intérêts:</Text>
                                <CheckBoxGroup
                                    options={interestOptions}
                                    selected={interest}
                                    onSelect={setInterest}
                                    color='#000000BF'
                                    fontSize={16} />
                            </View>
                            <View>
                                <Text>Bonus:</Text>
                                <CheckBoxGroup
                                    options={bonusOptions}
                                    selected={bonus}
                                    onSelect={setBonus}
                                    color='#000000BF'
                                    fontSize={16} />
                            </View>
                            <View>
                                <TextInput placeholder={'Adresse'} onChangeText={(value) => setAdress(value)} value={address} />
                            </View>


                            <TouchableOpacity onPress={() => { createGarden(), setOpenModal(false) }} style={styles.button}>
                                <Text>Créer jardin</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
    descriptionc: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        marginTop: 10,
        width: '90%',
    },
    usernamec: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    username: {
        fontSize: 20,
    },
    ppuri: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    touchablepp: {
        position: 'relative',
        justifyContent: 'center',
        marginLeft: 20,
    },
    jardinsc: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    jardins: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    jardin: {
        fontSize: 20,
        marginLeft: 20,
    },
    circleplus: {
        color: 'green',
        marginRight: 20,

    },
    gardensgrid: {
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '90%',
        gridTemplateColumns: 'repeat(2, 1fr)',

    },
    gardenc: {
        flexDirection: 'row',
        width: '50%',

        height: 45,
    },
    leaf: {
        color: 'green',
        marginRight: 10,
    },
    circlex: {
        color: 'red',
        marginLeft: 10,
    },


    activitiesc: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    activites: {
        fontSize: 20,
        marginBottom: 20,
        marginLeft: 20,
    },
    modal: {
        backgroundColor: 'white',
        marginTop: 100,
        marginBottom: 100,
        marginLeft: 20,
        marginRight: 20,
        padding: 20,
        borderRadius: 20,
    },
    button: {
        marginTop: 20,
        color: 'green',
    },



})