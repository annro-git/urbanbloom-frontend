import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import LogotypeV from './components/LogotypeV'

// const reducers = combineReducers({  })
// const persistConfig = { key: 'urbanbloom', storage: AsyncStorage } // ! increment key to clear cache
// const store = configureStore({
//   reducer: persistReducer(persistConfig, reducers),
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
// })
// const persiststore = persistStore(store)

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
