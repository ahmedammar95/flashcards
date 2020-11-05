import React, { Component } from 'react'
import { View , Text, StyleSheet, TouchableOpacity, FlatList  }  from 'react-native'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

class Decks extends Component {


    render(){
      const decks=this.props.decks
      if (Object.values(decks).length===0){
        return (
          <View style={{alignItems:'center',paddingTop:100}}> 
            <Text style={{fontSize:36}}>No Decks</Text> 
            <TouchableOpacity onPress={this.handleLoadDefault}>
            <Text style={{fontSize:18,paddingTop:20, }}>Add Decks</Text> 
            </TouchableOpacity>
          </View>
        )
      }
      return (
        <View style={{flex:1, alignItems:'center'}}>
          <FlatList data={Object.values(decks)} 
          renderItem={ ({item: deck})=>{return <Deck deck={deck} />}} 
          keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )
    }

}



const Deck = ({deck})=>{
	
	const Clickable = ({deck}) => {
	    const navigator = useNavigation();
	    
	    const handleNav = () => {
	        navigator.navigate('Deck', {
              Name: deck.name,
              id:deck.id
	          });
	    };

	    return(
	    	<TouchableOpacity onPress={handleNav} >
	    		<View style={{alignItems:'center'}}>
					<Text style={styles.Decks} >{deck.name}</Text>
					<Text  style={{fontSize:16, paddingBottom:20}} >{deck.cards.length} cards</Text>
				</View>
			</TouchableOpacity>
	    )
	}

	return(
		<View >
			<Clickable deck={deck} key={deck}/>
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
      fontSize:30
  },
  cards: {
      color: 'grey',
  }
});

function mapStateToProps ({ decks }) {
  return {
    decks,
  }
}
export default connect(mapStateToProps)(Decks)