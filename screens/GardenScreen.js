import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Modal, TextInput } from "react-native";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Garden from "../components/molecular/Garden/Garden";
import CheckBoxGroup from "../components/atomic/CheckBoxGroup";


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

  const { token } = useSelector(state => state.user);
  const [gardens, setGardens] = useState([]);
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

    console.log(data.gardens)
    setGardens(data.gardens)

  }


  useEffect(() => {

    fetchGardens()

  }, [])

  const createGarden = async () => {
      
      const response = await fetch(`${global.BACKEND_URL}/user/gardens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify({
          name: 'Mon jardin',
          description: 'Un jardin',
        })

      })
      const data = await response.json()
      console.log(data)
     
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.ajouterbutton} onPress={() => setOpenModal(true)}>
          <Text style={styles.ajouter}>Ajouter un jardin</Text>
        </TouchableOpacity>
        {gardens.map((garden, index) => <Garden key={index} name={garden.name} description={garden.description} />)}
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
    </ScrollView>
  );
};

export default GardenScreen;


const styles = StyleSheet.create({

  container: {
    backgroundColor: '#87A3A4',

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
})