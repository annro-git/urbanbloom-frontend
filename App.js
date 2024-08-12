import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Text } from 'react-native'
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
import TestScreen from './screens/TestScreen'

// Redux
const reducers = combineReducers({ add, remove })
const persistConfig = { key: 'urbanbloom', storage: AsyncStorage }
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})
const persiststor = persistStore(store)

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
        tabBarIcon: ({ focused }) => {
          const Icon = tabs.find(e => e.name === route.name).icon
          return <Icon color={ focused ? 'red' : 'black' } size={tabs.find(e => e.name === route.name).size || 32} />
        },
        // headerShown: false,
      })}
      >
      { tabs.map((tab, index) => <Tab.Screen key={index} name={tab.name} component={tab.component}/>) }
    </Tab.Navigator>
  )
}

// Stack navigation
const Stack = createNativeStackNavigator()
const stacks = [
  { name: 'Auth', component: TestScreen, },
  { name: 'Tab', component: TabNavigator, },
]

export default function App() {

  // Loading Fonts
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
    <Provider store={ store }>
      <PersistGate persistor={ persiststor }>
        <NavigationContainer>
          <Stack.Navigator >
            { stacks.map((stack, index) => <Stack.Screen key={index} name={stack.name} component={stack.component}/>) }
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
