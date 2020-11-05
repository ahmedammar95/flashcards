import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity,Animated }  from 'react-native'
import { connect } from 'react-redux'
import { removeDeck } from '../utils/api'
import { deleteDeck } from '../actions/decks'
import {blue, white} from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/api'

function AddCard ({ onPress }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtnWhite : styles.AndroidSubmitBtnWhite}
        onPress={onPress}>
          <Text style={styles.submitBtnText}>Add Card</Text>
      </TouchableOpacity>
    )
}

function StartQuiz ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={{color:'black'}}>Start Quiz</Text>
    </TouchableOpacity>
  )
}
function DeleteDeck ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtnNoBorder : styles.AndroidSubmitBtnNoBorder}
      onPress={onPress}>
        <Text style={{color:'red'}}>Remove Deck</Text>
    </TouchableOpacity>
  )
}

class Deck extends Component {
  state={
    opacity: new Animated.Value(0)
  }
  submit = () => {
    const deck = this.props.Name
    const deckID= this.props.id
    this.props.navigation.navigate('AddCard',{Name:deck, deckID:deckID})
  }
  StartQuiz = () => {
    const deck = this.props.decks[this.props.id]
    clearLocalNotification()
    .then(setLocalNotification)
    this.props.navigation.navigate('Quiz',{deck:deck})
  }
  RemoveDeck = () => {
    removeDeck(this.props.id)
    this.props.dispatch(deleteDeck( {
      id:this.props.id,
    }))
    this.props.navigation.navigate('Decks')
  }

  componentDidMount(){
    const {opacity} = this.state
    Animated.timing(opacity, {toValue:1, duration:1,useNativeDriver: true,}).start()
  }

  render(){
      const {opacity} = this.state
      return (
          <Animated.View style={[styles.container, {opacity}]}>
              <View style={{marginTop:150,alignItems: 'center',}}>
                <Text style={{fontSize:25,fontWeight:'bold'}}>{this.props.Name}</Text>
                <Text style={{fontSize:15}}>{this.props.NumberOfCards} cards</Text>
              </View>
              <View>
                <AddCard onPress={this.submit} />
                <StartQuiz onPress={this.StartQuiz} />
                <DeleteDeck onPress={this.RemoveDeck} />
              </View>
          </Animated.View>
          
      )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'space-between',
      padding: 20,
      backgroundColor: white
  },
  Decks: { 
      fontWeight: 'bold',
      fontSize:21,
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center'
  },
  cards: {
      color: 'grey',
  },
  iosSubmitBtn: {
      backgroundColor: white,
      borderColor:'black',
      borderWidth: 1,
      padding: 10,
      borderRadius: 7,
      height: 45,
      width:150,
      marginLeft: 40,
      marginRight: 40,

    },
    AndroidSubmitBtn: {
      backgroundColor: white,
      borderColor:'black',
      borderWidth: 1,
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
      height: 45,
      width:150,
      borderRadius: 2,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',

    },
    iosSubmitBtnNoBorder: {
      backgroundColor: white,
      padding: 10,
      borderRadius: 7,
      height: 45,
      width:150,
      marginLeft: 40,
      marginRight: 40,
      marginBottom:20,
    },
    AndroidSubmitBtnNoBorder: {
      backgroundColor: white,
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
      height: 45,
      borderRadius: 2,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
    },
    iosSubmitBtnWhite: {
      backgroundColor: 'black',
      padding: 10,
      borderRadius: 7,
      height: 45,
      marginLeft: 40,
      marginRight: 40,
      marginBottom:20,
    },
    AndroidSubmitBtnWhite: {
      backgroundColor: 'black',
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
      height: 45,
      borderRadius: 2,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
    },
    submitBtnText: {
      color: white,
      fontSize: 22,
      textAlign: 'center',
    },
});

function mapStateToProps ({ decks },{id}) {
  Object.filter = (obj, predicate) => 
  Object.keys(obj)
      .filter( key => predicate(obj[key]) )
      .reduce( (res, key) => (res[key] = obj[key], res), {} );
  const deck =  Object.filter(decks, (deck) => deck.id === id)
  var NumberOfCards=0
  if (Object.keys(deck).length !== 0){
     NumberOfCards=deck[id].cards.length
  }
  else{
     NumberOfCards=0
  }
  return {
    decks,
    NumberOfCards
  }
}

export default connect(mapStateToProps)(Deck)