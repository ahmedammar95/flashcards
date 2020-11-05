export const RECEIVE_CARD = 'RECEIVE_CARD'
export const ADD_CARD = 'ADD_CARD'

export function receiveCards (cards) {
    return {
        type: RECEIVE_CARD,
        cards,
    }
}

export function addCard (card) {
    return {
      type: ADD_CARD,
      card,
    }
  }


