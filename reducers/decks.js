import { ADD_CARD } from '../actions/cards'
import { RECEIVE_DECK, ADD_DECK, REMOVE_DECK} from '../actions/decks'

function decks (state = {}, action) {
    switch(action.type){
        case RECEIVE_DECK:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK :
            return{
                ...state,
                [action.deck.id]: action.deck,
            }
        case REMOVE_DECK :
            Object.filter = (obj, predicate) => 
                Object.keys(obj)
                    .filter( key => predicate(obj[key]) )
                    .reduce( (res, key) => (res[key] = obj[key], res), {} );
            return Object.filter(state, (deck) => deck.id !== action.deckID.id)
            
        case ADD_CARD:
            return{
                ...state,
                [action.card.deckID]:{
                    ...state[action.card.deckID],
                    cards : state[action.card.deckID].cards.concat( [action.card.id] )
                }

            }
        default:
            return state

    }
}

export default decks