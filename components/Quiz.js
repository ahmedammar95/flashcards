import React, { Component } from 'react'
import { View , Text, StyleSheet, TouchableOpacity, FlatList  }  from 'react-native'
import { connect } from 'react-redux'
import {blue, white} from '../utils/colors'
class Quiz extends Component {
    state = {
        cardCount:0,
        correctAnswers:0,
        showAnswer:false,
        showFinalResult:false,
    }
    CorrectAnswer = () => {
        const cardCount = this.state.cardCount
        const correctAnswers = this.state.correctAnswers
        if (cardCount < this.props.deck.cards.length - 1){
          this.setState(()=> ({
              cardCount: cardCount+1,
              correctAnswers:correctAnswers+1,
              showAnswer: false
          }))
        }
        if(cardCount === this.props.deck.cards.length - 1){
          this.setState(()=> ({
            correctAnswers:correctAnswers+1,
            showFinalResult: true,
        }))
        }
    }
    IncorrectAnswer = () => {
      const cardCount = this.state.cardCount
      if (cardCount < this.props.deck.cards.length - 1){
          this.setState(()=> ({
              cardCount: cardCount+1,
              showAnswer: false
          }))
      }
      if(cardCount === this.props.deck.cards.length - 1){
        this.setState(()=> ({
          showFinalResult: true,
      }))
      }
    }
    ShowAnswer = () => {
      const showAnswer = this.state.showAnswer
      this.setState(()=> ({
        showAnswer: true
      }))
    }
    StartQuizAgain = () => {
      this.setState(()=> ({
        cardCount:0,
        correctAnswers:0,
        showAnswer:false,
        showFinalResult:false,
      }))
    }
    DeckView = () => {
      this.props.navigation.navigate('Deck',{Name:this.props.deck.name, id:this.props.deck.id})
    }
    
    render(){
        if (this.props.deck.cards.length===0){
            return (
              <View style={{alignItems:'center',paddingTop:100}}> 
                <Text style={{fontSize:36}}>No cards</Text> 
                <Text style={{fontSize:18,paddingTop:20, }}>Please Add Cards</Text> 
              </View>
            )
        }
        if(this.state.showFinalResult){
          return(
          <View style={{alignItems:'center',paddingTop:100}}> 
            <Text style={{fontSize:36}}>Your Result is</Text> 
            <Text style={{fontSize:18,paddingTop:20, }}>{this.state.correctAnswers}/{this.props.deck.cards.length}</Text>
            <TouchableOpacity
              style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
              onPress={this.StartQuizAgain}>
                <Text style={styles.submitBtnText}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
              onPress={this.DeckView}>
                <Text style={styles.submitBtnText}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
          )
        }
        return(
            <View style={{alignItems:'center',paddingTop:100}}>
                <Text style={{fontSize:36}}>{this.props.deck.name}</Text>
                <Text style={{fontSize:18,paddingTop:20,fontWeight:"bold" }}>Question {this.state.cardCount +1 } of {this.props.deck.cards.length} questions</Text>
                <Question cardID={this.props.deck.cards[this.state.cardCount]} cards={this.props.cards} showAnswer={this.state.showAnswer}/>
                {!this.state.showAnswer &&
                  <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                    onPress={this.ShowAnswer}>
                      <Text style={styles.submitBtnText}>Show Answer</Text>
                  </TouchableOpacity>
                }
                {this.state.showAnswer && (
                  <View style={{  flex: 1, flexDirection: 'row',margin:20, }}>
                    <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                    onPress={this.CorrectAnswer}>
                      <Text style={styles.submitBtnText}>Correct</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                    onPress={this.IncorrectAnswer}>
                      <Text style={styles.InCorrect}>Incorrect</Text>
                  </TouchableOpacity>
                  </View>
                )}
            </View>

        )
    }
}

Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

const Question = ({cardID,cards,showAnswer})  => {
  const mycard = Object.filter(cards, card => card.id === cardID)
  const card = Object.values(mycard)
  return(
    <View>
        <Text style={{fontSize:18,paddingTop:20 }}>Question: {card[0].question}</Text>
        {showAnswer && (
          <View>
            <Text style={{fontSize:18 }}>Answer: {card[0].answer}</Text>
          </View>
        )}
        
    </View>
  )
    
}

const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    Decks: { 
        fontWeight: 'bold',
        flex:1,
        marginBottom:100
    },
    cards: {
        color: 'grey',
    },
    submitBtnText: {
      color: white,
      fontSize: 22,
      textAlign: 'center',
    },
    iosSubmitBtn: {
      backgroundColor: blue,
      padding: 10,
      borderRadius: 7,
      height: 45,
      marginLeft: 40,
      marginRight: 40,
      marginTop:20,
      marginLeft:10
    },
    AndroidSubmitBtn: {
      backgroundColor: blue,
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
      height: 45,
      borderRadius: 2,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:20,
      marginLeft:10
    },
    InCorrect: {
      color: 'red',
      fontSize: 22,
      textAlign: 'center',
    },
  });

function mapStateToProps ({ decks,cards }) {
    return {
      decks,
      cards
    }
  }
  export default connect(mapStateToProps)(Quiz)