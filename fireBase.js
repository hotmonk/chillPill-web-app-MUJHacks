var fireBase = fireBase || firebase;
var hasInit = false;
var config = {
  apiKey: "AIzaSyBv6lFbE1y9UN3AivrZN9SpVRCpPzw-Jhk",
    authDomain: "chillpill-fde7c.firebaseapp.com",
    databaseURL: "https://chillpill-fde7c.firebaseio.com",
    projectId: "chillpill-fde7c",
    storageBucket: "chillpill-fde7c.appspot.com",
    messagingSenderId: "870444139737",
    appId: "1:870444139737:web:3a9d13478b207a68a7eac8"
};
if (!hasInit) {
  firebase.initializeApp(config);
  hasInit = true;
}
