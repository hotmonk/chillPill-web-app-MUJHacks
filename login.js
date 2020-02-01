var sID = document.getElementById("selection");
// var option = null;
// sID.options[sID.selectedIndex] = 
// var uiConfig = null;
if(sID){
  sID.addEventListener("change", function(){
  var option = sID.options[sID.selectedIndex].value;
  var file = null;
  console.log(option);
  if(option == 1){
    file = "doctor-profile.html";
  }
  else if(option == 2){
    file = "path-profile.html"
  }
  else{
    file = "nurse-profile.html"
  }
  console.log(file);
  // console.log(option);
  // console.log("hellio");

  var uiConfig = {
    signInSuccessUrl: file,
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
            //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            //firebase.auth.GithubAuthProvider.PROVIDER_ID,
            //firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: 'index.html'
  };
  
  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);  

  });
  // console.log(option);
  // console.log("hello"); 
}
// FirebaseUI config.
// var uiConfig = {
//   signInSuccessUrl: 'index.html',
//   signInOptions: [
//     // Leave the lines as is for the providers you want to offer your users.
//           //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//           //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//           //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//           //firebase.auth.GithubAuthProvider.PROVIDER_ID,
//           //firebase.auth.EmailAuthProvider.PROVIDER_ID,
//           firebase.auth.PhoneAuthProvider.PROVIDER_ID
//   ],
//   // Terms of service url.
//   tosUrl: 'index.html'
// };

// // Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());
// // The start method will wait until the DOM is loaded.
// ui.start('#firebaseui-auth-container', uiConfig);