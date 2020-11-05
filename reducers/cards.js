import { RECEIVE_CARD, ADD_CARD} from '../actions/cards'

function cards (state = {}, action) {
    switch(action.type){
        case RECEIVE_CARD:
            return {
                ...state,
                ...action.cards
            }
        case ADD_CARD :
            return{
                ...state,
                [action.card.id]: action.card,
            }
        default:
            return state

    }
}



export default cards