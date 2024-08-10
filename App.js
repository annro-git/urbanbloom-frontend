import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import LogotypeV from './components/LogotypeV'
import AuthenticationScreen from './screens/AuthenticationScreen'
import SignUpScreen from './screens/SignUpScreen'
import SignInScreen from './screens/SignInScreen'
import ForgotPassword from './screens/ForgotPassword'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import PostScreen from './screens/PostScreen'
import GardensScreen from './screens/GardensScreen'
import RessourcesScreen from './screens/RessourcesScreen'




// const reducers = combineReducers({  })
// const persistConfig = { key: 'urbanbloom', storage: AsyncStorage } // ! increment key to clear cache
// const store = configureStore({
//   reducer: persistReducer(persistConfig, reducers),
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
// })
// const persiststore = persistStore(store)

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Home':
            iconName = focused ? 'home' : 'home';
            break;
          case 'Search':
            iconName = focused ? 'search' : 'search';
            break;
          case 'Post':
            iconName = focused ? 'plus-circle' : 'plus-circle';
            break;
          case 'Gardens':
            iconName = focused ? 'leaf' : 'leaf';
            break;
          case 'Ressources':
            iconName = focused ? 'book' : 'book';
            break;
          default:
            iconName = 'circle';
            break;
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Post" component={PostScreen} />
      <Tab.Screen name="Gardens" component={GardensScreen} />
      <Tab.Screen name="Ressources" component={RessourcesScreen} />
    </Tab.Navigator>
  );
}

export default function App() {

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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Authentication" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Authentication" component={AuthenticationScreen} />
        <Stack.Screen name="Sign-up" component={SignUpScreen} />
        <Stack.Screen name="Sign-in" component={SignInScreen} />
        <Stack.Screen name="Mdp oublié" component={ForgotPassword} />
        <Stack.Screen name="Home" component={TabNavigator} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: '#fff',
    height: '10%',
  },
});
