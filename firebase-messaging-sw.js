importScripts("https://www.gstatic.com/firebasejs/7.2.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.2.1/firebase-messaging.js");

var firebaseConfig = {
    apiKey: "AIzaSyBv6lFbE1y9UN3AivrZN9SpVRCpPzw-Jhk",
    authDomain: "chillpill-fde7c.firebaseapp.com",
    databaseURL: "https://chillpill-fde7c.firebaseio.com",
    projectId: "chillpill-fde7c",
    storageBucket: "chillpill-fde7c.appspot.com",
    messagingSenderId: "870444139737",
    appId: "1:870444139737:web:3a9d13478b207a68a7eac8"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
