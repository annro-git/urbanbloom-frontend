import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Modal, TextInput, Button } from "react-native";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Garden from "../components/molecular/Garden/Garden";
import CheckBoxGroup from "../components/atomic/CheckBoxGroup";
import * as ImagePicker from 'expo-image-picker';
import { updateGardenppURI, updateGardens } from "../reducers/user";

const GardenScreen = () => {

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

  const { token, } = useSelector(state => state.user);
  const gardensList = useSelector(state => state.user.gardens);

  console.log(gardensList)

  const dispatch = useDispatch();
  const [gardens, setGardens] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [interest, setInterest] = useState([]);
  const [bonus, setBonus] = useState([]);
  const [address, setAdress] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

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

    dispatch(updateGardens(data.gardens))
  }

  useEffect(() => {

    fetchGardens()

  }, [])

  const createGarden = async () => {

    const reponse = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${address}`)
    const data = await reponse.json()
    if (data.code === '400') {
      Alert.alert('Adresse invalide')
      return
    }

    const newGarden = {
      token,
      name,
      description,
      interests: interest,
      bonus,
      coordinates: {
        latitude: data.features[0].geometry.coordinates[1],
        longitude: data.features[0].geometry.coordinates[0],

      },

    }

    const response = await fetch(`${global.BACKEND_URL}/garden`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGarden)

    })
    const json = await response.json()
    dispatch(updateGardens(newGarden))
    fetchGardens()
  }

  const chooseGP = async (selectedGardenName) => {


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
      const updatedGardens = gardensList.map(garden => {
        if (garden.name === selectedGardenName) {
          return { ...garden, ppURI: result.assets[0].uri };
        }
        return garden;
      });
      setGardens(updatedGardens);

      dispatch(updateGardenppURI({ ppURI: result.assets[0].uri, gardenName: selectedGardenName }));
    }
  }



  return (
    <ScrollView style={styles.scrollview}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.ajouterbutton} onPress={() => setOpenModal(true)}>
          <Text style={styles.ajouter}>Ajouter un jardin</Text>
        </TouchableOpacity>
        {(gardensList.length > 0) && gardensList.map((garden, index) => <Garden style={styles.garden} key={index} name={garden.name} description={garden.description} chooseGP={chooseGP} ppURI={garden.ppURI} />)}
        <Modal style={styles.modal}
          animationType="fade"
          transparent={true}
          visible={openModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <Text>Nouveau jardin:</Text>
              <TextInput placeholder='Nom du jardin' onChangeText={(value) => { setName(value) }} value={name} />
              <TextInput placeholder='Description' onChangeText={(value) => { setDescription(value) }} value={description} />
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
    </ScrollView>
  );
};

export default GardenScreen;


const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    backgroundColor: '#87A3A4',
  },
  container: {

  },
  ajouterbutton: {
    backgroundColor: '#BDE1E2',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    width: '50%',
    height: 45,
    alignSelf: 'center',
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 1,
    paddingTop: 7,
  },
  ajouter: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',

  },
  modal: {
    backgroundColor: '#5F7C7D',
    marginTop: 100,
    marginBottom: 100,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    borderRadius: 20,
    height: 500,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  garden: {
    backgroundColor: '#5F7C7D',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    height: 200,
  },
})