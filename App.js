import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { add, remove } from './reducers/test'
import { House, Search, CirclePlus, Leaf, Book } from 'lucide-react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import LogotypeV from './components/LogotypeV'

// const reducers = combineReducers({  })
// const persistConfig = { key: 'urbanbloom', storage: AsyncStorage } // ! increment key to clear cache
// const store = configureStore({
//   reducer: persistReducer(persistConfig, reducers),
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
// })
// const persiststore = persistStore(store)

// Tab navigation
const Tab = createBottomTabNavigator()
const tabs = [
  { name: 'Accueil', component: TestScreen, icon: House, },
  { name: 'Recherche', component: TestScreen, icon: Search, },
  { name: 'Publier', component: TestScreen, icon: CirclePlus, size: 64 },
  { name: 'Jardins', component: TestScreen, icon: Leaf, },
  { name: 'Ressources', component: TestScreen, icon: Book, },
]
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: '#466760' },
        headerTitle: props => <CustomHeader { ...props } />,
        tabBarIcon: ({ focused }) => {
          const Icon = tabs.find(e => e.name === route.name).icon
          return <Icon color={ focused ? 'red' : 'black' } size={tabs.find(e => e.name === route.name).size || 32} />
        },
      })}
      >
      { tabs.map((tab, index) => <Tab.Screen key={index} name={tab.name} component={tab.component}/>) }
    </Tab.Navigator>
  )
}

// Stack navigation
const Stack = createNativeStackNavigator()
const stacks = [
  { name: 'Auth', component: AuthScreen, },
  { name: 'Tab', component: TabNavigator, },
]

const App = () => {

  // Loading Fonts
  let [loaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_900Black,
  })

  if (!loaded) {
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
