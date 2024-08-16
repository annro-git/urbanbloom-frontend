import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { add, remove } from './reducers/test'
import { House, Search, CirclePlus, Leaf, Book } from 'lucide-react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import TestScreen from './screens/TestScreen'
import AuthScreen from './screens/AuthScreen'
import ProfileScreen from './screens/ProfileScreen'
import WeatherScreen from './screens/WeatherScreen'
import CustomHeader from './components/molecular/CustomHeader'
import CustomTabBar from './components/molecular/CustomTabBar'

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
  { name: 'Accueil', component: TestScreen, icon: House, position: 'bottom' },
  { name: 'Recherche', component: TestScreen, icon: Search, position: 'bottom' },
  { name: 'Publier', component: TestScreen, icon: CirclePlus, position: 'bottom' },
  { name: 'Jardins', component: TestScreen, icon: Leaf, position: 'bottom' },
  { name: 'Ressources', component: TestScreen, icon: Book, position: 'bottom' },
  { name: 'Profile', component: ProfileScreen },
  { name: 'Weather', component: WeatherScreen },
]
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: props => <CustomHeader { ...props } route={ route } />,
        tabBarIcon: {
          Icon: tabs.find(e => e.name === route.name).icon, 
          position: tabs.find(e => e.name === route.name).position,
        },
      })}
      tabBar={ props => <CustomTabBar { ...props } />}
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
  // { name: 'Profile', component: ProfileScreen, }
]

const App = () => {

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
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
          >
            { stacks.map((stack, index) => <Stack.Screen key={index} name={stack.name} component={stack.component}/>) }
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}


export default App