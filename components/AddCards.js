import React, { Component } from 'react'
import { View , Text, StyleSheet, TextInput,TouchableOpacity }  from 'react-native'
import { Header } from 'react-native-elements';
import { submitCard } from '../utils/api'
import { connect } from 'react-redux'
import { addCard } from '../actions/cards'
import {blue, white} from '../utils/colors'

function SubmitBtn ({ onPress,BtnState }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        disabled={BtnState}
        onPress={onPress}>
          <Text style={styles.submitBtnText}>Add Card</Text>
      </TouchableOpacity>
    )
}

class AddCard extends Component {

    state = {
        Question:'',
        Answer:'',
      }

    handleChangeQuestion = (Question) => {
        this.setState(()=> ({
            Question: Question
        }))

    }

    handleChangeAnswer = (Answer) => {
        this.setState(()=> ({
            Answer: Answer
        }))

    }

    submit = () => {
        const deck = this.props.Name
        const deckID =this.props.deckID
        const { Question, Answer} = this.state
        const id = Math.floor(Math.random() * 100000).toString()
        this.props.dispatch(addCard( {
            id:id,
            deckID:deckID,
            deck:deck,
            question:Question,
            answer:Answer

        }))
        submitCard({id,deck,Question,Answer})
        this.setState(()=> ({
            Question: '',
            Answer:''
        }))
        this.props.navigation.navigate('Deck', {Name:deck, id:deckID})

    }
    render(){
        return (
            <View style={styles.container}>
                <View>
                    <TextInput
                        placeholder=' Question '
                        style={{ height: 40, borderColor: 'gray', borderWidth: 0.75, marginBottom:20 , marginTop:60}}
                        onChangeText={Question => this.handleChangeQuestion(Question)}
                        value={this.state.Question}
                    />
                    <TextInput
                        placeholder=' Answer '
                        style={{ height: 40, borderColor: 'gray', borderWidth: 0.75 }}
                        onChangeText={Answer => this.handleChangeAnswer(Answer)}
                        value={this.state.Answer}
                    />
                </View>
                <SubmitBtn onPress={this.submit} BtnState={this.state.Question === '' && this.state.Question === ''}/>
            </View>
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
        backgroundColor: blue,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginBottom:60
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
        marginBottom:60
      },
      submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
      },
  });

  export default connect ()(AddCard)