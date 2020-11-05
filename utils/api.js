import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
const NOTIFICATION_KEY = 'flashcards:notifications'

export function submitDeck ({deckName,id}) {
    return AsyncStorage.mergeItem(id, JSON.stringify({
        name:deckName,
        id:id,
        cards:[],
    }))
}

export function submitCard ({id,deck,Question,Answer}) {
    return AsyncStorage.mergeItem(id, JSON.stringify({
        id:id,
        deck:deck,
        question:Question,
        answer:Answer,
    }))
}


export function removeDeck (Deck) {
    return AsyncStorage.getItem(Deck).then((results) => {
        const data = JSON.parse(results)
        data[Deck]=null
        delete data[Deck]
        AsyncStorage.setItem(Deck, JSON.stringify(data))
    })
    
}

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }
  
  function createNotification () {
    return {
      title: 'Do A Quiz!',
      body: "👋 don't forget to do a Quiz today!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  }
  
  export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
  
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMinutes(0)
  
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )
  
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }
