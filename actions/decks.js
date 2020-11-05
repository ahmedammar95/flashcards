export const RECEIVE_DECK = 'RECEIVE_DECK'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'

export function receiveDecks (decks) {
    return {
        type: RECEIVE_DECK,
        decks,
    }
}

export function addDecks (deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function deleteDeck (deckID) {
    return {
        type: REMOVE_DECK,
        deckID
    }
}
