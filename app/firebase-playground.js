const firebase = require('firebase');

firebase.initializeApp({
  apiKey: 'AIzaSyDYgB_ZFszhn_yPVSJkNvG97PNIE4YAFFQ',
  authDomain: 'foodle-add-ict.firebaseapp.com',
  databaseURL: 'https://foodle-add-ict.firebaseio.com',
  projectId: 'foodle-add-ict',
  storageBucket: 'foodle-add-ict.appspot.com'
})

firebase.database().ref(`foods/-Kzvqnk1kR9yeoS5PiW`).once('value')
  .then(res => {
    console.log(res.val())
  })
