import { ScrollView, Text } from "react-native";
import AuJardin from "../components/molecular/Garden/AuJardin";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Garden from "../components/molecular/Garden/Garden";


const GardenScreen = () => {

  const { token } = useSelector(state => state.user);
  const { gardenId } = route.params;
  const gardens = useSelector(state => state.gardens);

  useEffect(() => {

    fetch(`${global.BACKEND_URL}/gardens/${gardenId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
      })
      .then(response => response.json())
      .then(data => setGarden(data))

  }, [gardenId]);



  return (
    <ScrollView>
      <View>
        {gardens.map(garden => <Garden key={garden._id} title={garden.title} />)}
      </View>
    </ScrollView>
  );
};

export default GardenScreen;
