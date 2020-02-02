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

//=======================================cloud messaging logic starts=============================================
const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  "BPCkVInGTT9Y5vaJLXE_p3mnPoyeQayvBmBJt6jjEa_MAjZs_dfgl9vqScqly08rF0x8uHW-ARl6y7q7N_8RpR8"
);
messaging
  .requestPermission()
  .then(function() {
    console.log("Have permission");
    return messaging.getToken();
  })
  .then(function(token) {
    // console.log(token);
  })
  .catch(function(err) {
    console.log(err);
  });

var messageReceived = null;
var personalInfo = null;
messaging.onMessage(function(payload) {
  messageReceived = payload["data"]["message"];
  alert("Please upload patient's report.");
  var patientData = databaseRef.once("value", gotData, errData);


  function gotData(data) {
    // console.log(data.val());
    var requiredInfo = { ...data.val() };
    // console.log(xinfo);
    personalInfo = requiredInfo[messageReceived]["Personal Info"];
    // console.log(reports);
    var name = personalInfo["Name"];
    var age = personalInfo["Age"];
    var bp = personalInfo["BloodPressure"];
    var weight = personalInfo["Weight"];
    var appointment = personalInfo[messageReceived]["Appointments"];
    var remarks = appointment["Remarks"];
    document.getElementById("b1").innerHTML = name;
    document.getElementById("b2").innerHTML = age;
    document.getElementById("b3").innerHTML = bp;
    document.getElementById("b4").innerHTML = weight;
    document.getElementsById("b5").innerHTML = remarks;
  }

//   function gotData(data) {
//     var requiredInfo = { ...data.val() };
//     personalInfo = requiredInfo[messageReceived]["Personal Info"];
//     name = personalInfo["Name"];
//     // console.log("name=======" + name);
//     age = personalInfo["Age"];
//     bp = personalInfo["BloodPressure"];
//     weight = personalInfo["Weight"];
//     appointmentsInfo = requiredInfo[messageReceived]["Appointments"];
//     medicinesInfo = requiredInfo[messageReceived]["Medicines"];
//     reportsInfo = requiredInfo[messageReceived]["Reports"];

//     document.getElementById("b1").innerHTML = name;
//     document.getElementById("b2").innerHTML = age;
//     document.getElementById("b3").innerHTML = bp;
//     document.getElementById("b4").innerHTML = weight;
//     // console.log(personalInfo);
//   }

  function errData(err) {
    console.log(err);
  }
});
//=======================================cloud messaging logic ends=============================================

//======================================= realtime database starts =============================================
var databaseRef = firebase
  .database()
  .ref()
  .child("Patient"); //storing the reference to the firebase realtime database

function updatePatientReport(patientID, reportURL) {
  //function to update the data of the selected patient
  var data = {
      PastReports:{Link : reportURL}
  };
  
  
//   data["latestReport"] = reportURL;
  var x = patientID;
  var id = "PastReports";
  firebase
    .database()
    .ref("Patient/" + x + "/" + id)
    .set(data);
  alert("Patient's reports uploaded");
}

// for (const key of Object.keys(medicines)) {   TODO
//   medicineData[key] = medicines[key];
// }

var url = null;
fileButton.addEventListener("change", function(e) {
  for (let i = 0; i < e.target.files.length; i++) {
    let reportFile = e.target.files[i];

    let storageRef = firebase.storage().ref("Reports" + reportFile.name);

    let task = storageRef.put(reportFile);

    task.on(
      "state_changed",
      function progress(snapshot) {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log("Upload is" + percentage + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
          case firebase.storage.TaskState.PAUSED:
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log("Upload is running");
            break;
        }
      },
      function(error) {},
      function() {
        // Upload completed successfully, now we can get the download URL

        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          url = downloadURL;
          var uploadedalert= document.createElement("div");
          var alerttext=document.createTextNode("Uploaded!");
          uploadedalert.appendChild(alerttext);
          document.getElementById("submitSec").appendChild(uploadedalert);
          
          console.log("File available at", downloadURL);
          updatePatientReport(messageReceived, downloadURL);
        });
      }
    );
  }
});


// var pathoForm = document.querySelector(".patho-form"); //selecting the div with className = .nurse-form
// if (pathoForm) {
//   pathoForm.addEventListener("submit", e => {
//     e.preventDefault();
//     const weight = document.getElementById("weight").value;
//     // console.log("weight ==== " + weight);
//     // console.log("message received ====== ");
//     // console.log(messageReceived);
//     const bloodPressure = document.getElementById("bloodPressure").value;
//     // console.log("bloodPressure ==== " + bloodPressure);
//     updatePatientData(messageReceived, weight, bloodPressure);
//   });
// }
// var patientData = databaseRef.on('value', gotData, errData);
// function gotData(data){
//     // console.log(data.val());
//     var xinfo = {...data.val()};
//     console.log(xinfo);
//     var abcd = xinfo["+919354522796"];
//     // console.log(PersonalInfo);
//     var PersonalInfo = abcd["Personal Info"];
//     // var data =

// }
// function errData(err){
//     console.log(err);
// }

// var patientData = databaseRef.once('value', gotData, errData);
// function gotData(data){
//     // console.log(data.val());
//     var requiredInfo = {...data.val()};
//     // console.log(xinfo);
//     var personalInfo = requiredInfo[messageReceived]["Personal_Info"];
//     console.log(personalInfo);
// }
// function errData(err){
//     console.log(err);
// }
