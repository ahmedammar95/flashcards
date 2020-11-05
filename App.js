import 'react-native-gesture-handler'
import React from 'react'
import { View,Text,StyleSheet } from 'react-native'
import Decks from './components/Decks.js'
import AddDecks from './components/AddDecks.js'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStore } from "redux"
import { Provider } from "react-redux"
import reducer  from './reducers/index.js'
import Deck from './components/Deck.js'
import AddCard from './components/AddCards'
import Quiz from './components/Quiz'
import middleware from './middleware'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { setLocalNotification } from './utils/api'

function DecksScreen({ navigation }) {
  return (
      <Decks navigation={navigation}/>
  );
}

function AddDeckScreen({ navigation }) {
  return (
      <AddDecks navigation={navigation}/>
  );
}

function DeckScreen({ navigation,route }) {
  const { Name,id } = route.params
  return (
      <Deck navigation={navigation} Name={Name} id={id}/>
  );
}

function AddCardScreen({ route, navigation  }) {
  const { Name,deckID } = route.params
  return (
      <AddCard Name={Name} deckID={deckID} navigation={navigation}/>
  );
}

function QuizScreen({ route, navigation  }) {
  const { deck } = route.params
  return (
      <Quiz deck={deck} navigation={navigation}/>
  );
}

const Stack = createStackNavigator();

function Home() {
  return(
    <Tab.Navigator         
      screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Decks') {
          iconName = 'ios-bookmarks';
        } else if (route.name === 'AddDecks') {
          iconName = 'ios-add-circle-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#1338BE',
      inactiveTintColor: 'gray',
    }}
  >
      <Tab.Screen name="Decks" component={DecksScreen} />
      <Tab.Screen name="AddDecks" component={AddDeckScreen} />
    </Tab.Navigator>
  )
}

const Tab = createBottomTabNavigator();
export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}         options={{
            title: '',
            headerStyle: {
              backgroundColor: '#1338BE',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
            <Stack.Screen name="Deck" component={DeckScreen} 
            
              options={({ route }) => ({
                title: [route.params.Name],
                headerStyle: {
                  backgroundColor: '#1338BE',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  alignItems: 'center',
                },
              })}
            />
            <Stack.Screen name="AddCard" component={AddCardScreen}             
            options={() => ({
                title: 'Add Card',
                headerStyle: {
                  backgroundColor: '#1338BE',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              })} />
            <Stack.Screen name="Quiz" component={QuizScreen}
                options={() => ({
                title: 'Quiz',
                headerStyle: {
                  backgroundColor: '#1338BE',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              })} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}


