import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import LogotypeV from './components/LogotypeV';

export default function App() {

  let [loaded] = useFonts({
    Lato_300Light, 
    Lato_400Regular, 
    Lato_700Bold, 
    Lato_900Black,
  })

  if(!loaded){
    return null
  }

  return (
    <View style={styles.container}>
      <LogotypeV />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
