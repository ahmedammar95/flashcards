import React, { Component } from 'react'
import { View , Text, StyleSheet, TextInput,TouchableOpacity }  from 'react-native'
import { submitDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDecks } from '../actions/decks'
import {blue, white} from '../utils/colors'

function SubmitBtn ({ onPress,BtnState }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        disabled={BtnState}
        onPress={onPress}>
          <Text style={styles.submitBtnText}>Create Deck</Text>
      </TouchableOpacity>
    )
}

class AddDecks extends Component {
    state = {
        NewDeck:'',
      }

    handleChangeText = (NewDeck) => {
        this.setState(()=> ({
            NewDeck: NewDeck
        }))

    }
    submit = () => {
        const deckName = this.state.NewDeck
        const id = Math.floor(Math.random() * 100000).toString()
        this.props.dispatch(addDecks( {
            id:id,
            name:deckName,
            cards:[]

        }))
        this.setState(()=> ({
            NewDeck: ''
        }))
        submitDeck({deckName,id})
        this.props.navigation.navigate('Deck', {Name:deckName, id:id})

    }
    render(){
        return (
            <View style={styles.container}>
                <View style={{marginTop:50,alignItems: 'stretch',}}>
                    <Text style={{fontSize:35}}>what is the title of your new deck?</Text>
                    <TextInput
                        placeholder=' Deck Title '
                        style={{ height: 40, borderColor: 'gray', borderWidth: 0.75 }}
                        onChangeText={NewDeck => this.handleChangeText(NewDeck)}
                        value={this.state.NewDeck}
                    />
                </View>
                <SubmitBtn onPress={this.submit} BtnState={this.state.NewDeck === ''}/>
            </View>
        )
    }

}



export default connect ()(AddDecks)


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
      },
      submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
      },
  });

