import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { House, Search, CirclePlus, Leaf, Book } from 'lucide-react-native'
import { StatusBar } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
// import LogotypeV from './components/LogotypeV'
import TestScreen from './screens/TestScreen'
import SplashScreen from './screens/SplashScreen'
import SigninScreen from './screens/SigninScreen'
import SignupScreen from './screens/SignupScreen'
import ProfileScreen from './screens/ProfileScreen'
import WeatherScreen from './screens/WeatherScreen'
import CustomHeader from './components/molecular/CustomHeader'
import ForgotScreen from './screens/ForgotScreen'
import SearchScreen from './screens/SearchScreen'
import SigninScreen from './screens/SigninScreen'
import SignipScreen from './screens/SignupScreen'
import PostScreen from './screens/PostScreen'
import GardenScreen from './screens/GardenScreen'
import ResourcesScreen from './screens/ResourcesScreen'
import HomeScreen from './screens/HomeScreen'

import CustomTabBar from './components/molecular/CustomTabBar'
import SearchScreen from './screens/SearchScreen'
import PostScreen from './screens/PostScreen'
import GardenScreen from './screens/GardenScreen'
import test from './reducers/test'
import user from './reducers/user'

// URL BACKEND
global.BACKEND_URL = 'http://192.168.1.24:3000'

// Redux
const reducers = combineReducers({ test, user })
const persistConfig = { key: 'urbanbloom', storage: AsyncStorage }
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})
const persiststor = persistStore(store)

// Tab navigation
const Tab = createBottomTabNavigator()
const tabs = [
  { name: 'Accueil', component: HomeScreen, icon: House, position: 'bottom' },
  { name: 'Recherche', component: SearchScreen, icon: Search, position: 'bottom' },
  { name: 'Publier', component: PostScreen, icon: CirclePlus, position: 'bottom' },
  { name: 'Jardins', component: GardenScreen, icon: Leaf, position: 'bottom' },
  { name: 'Ressources', component: ResourcesScreen, icon: Book, position: 'bottom' },
  { name: 'Profile', component: ProfileScreen },
  { name: 'Weather', component: WeatherScreen },
]
const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        header: props => <CustomHeader {...props} route={route} />,
        tabBarIcon: {
          Icon: tabs.find(e => e.name === route.name).icon,
          position: tabs.find(e => e.name === route.name).position,
        },
      })}
    >
      {tabs.map((tab, index) => <Tab.Screen key={index} name={tab.name} component={tab.component} />)}
    </Tab.Navigator>
  )
}

// Stack navigation
const Stack = createNativeStackNavigator()
const stacks = [
  { name: 'Splash', component: SplashScreen, },
  { name: 'SignIn', component: SigninScreen, },
  { name: 'SignUp', component: SignupScreen, },
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

  if (!loaded) {
    return null
  }
  return (
    <Provider store={store}>
      <PersistGate persistor={persiststor}>
        <NavigationContainer>
          <StatusBar barStyle='dark-content' backgroundColor='white' />
          <Stack.Navigator screenOptions={{ headerShown: false }} >
            {stacks.map((stack, index) => <Stack.Screen key={index} name={stack.name} component={stack.component} />)}
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App;
