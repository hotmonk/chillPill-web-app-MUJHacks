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
    console.log(token);
  })
  .catch(function(err) {
    console.log(err);
  });

var messageReceived = null;
var personalInfo = null;
var appointmentsInfo = null;
var medicinesInfo = null;
var reportsInfo = null;
// -------------------------------------------------
var name = null;
var age = null;
var bp = null;
var weight = null;
var messageID = null;
//--------------------------------------------------
messaging.onMessage(function(payload) {
  messageID = payload["data"]["message"];
//   console.log(messageID);
  messageReceived = payload["data"]["message"];
  alert(messageReceived);
  var patientData = databaseRef.once("value", gotData, errData);
  function gotData(data) {
    var requiredInfo = { ...data.val() };
    personalInfo = requiredInfo[messageReceived]["Personal Info"];
    name = personalInfo["Name"];
    console.log("name=======" + name);
    age = personalInfo["Age"];
    bp = personalInfo["BloodPressure"];
    weight = personalInfo["Weight"];
    appointmentsInfo = requiredInfo[messageReceived]["Appointments"];
    medicinesInfo = requiredInfo[messageReceived]["Medicines"];
    reportsInfo = requiredInfo[messageReceived]["Reports"];

    document.getElementById("b1").innerHTML = name;
    document.getElementById("b2").innerHTML = age;
    document.getElementById("b3").innerHTML = bp;
    document.getElementById("b4").innerHTML = weight;
    // console.log(personalInfo);
  }
  function errData(err) {
    // console.log("erooooorrrrr");
    console.log(err);
  }
});
//=======================================cloud messaging logic ends=============================================

//======================================= realtime database starts =============================================
var databaseRef = firebase
  .database()
  .ref()
  .child("Patient"); //storing the reference to the firebase realtime database

function updateDoctorData(patientID, date, remarks, medicine, routine, mediarray) {
  var appointmentData = {
    Date: date,
    Remarks: remarks
  };
  var medicineData = {};
  for (let i = 0; i < medicine.length; i++) {
    // let medname = medicine[i];
    // let checkname = routine[i];
    medicineData[i] = { medicine: mediarray[i] };
  }
//   console.log("xxxx");
//   console.log(medicine);
//   console.log(routine);
//   console.log(medicineData);
//   console.log("xxxx");
  // var medicineData = {};
  // for (const key of Object.keys(medicines)) {   TODO
  //   medicineData[key] = medicines[key];
  // }
  // console.log("Medicines ========= "); TODO
  // console.log(medicineData);  TODO
  var x = patientID;
  var id1 = "Appointments";
  var id2 = "Medicines";
  firebase
    .database()
    .ref("Patient/" + x + "/" + id1)
    .set(appointmentData);
  firebase
    .database()
    .ref("Patient/" + x + "/" + id2)
    .set(medicineData);
  alert("Patient's data updated.");
}

const sendNotification = async (message, id) => {
    console.log(id);
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "key=AAAAyqqDhNk:APA91bFzMXH66vRN_SU41gEsDVgnNkIu6zq3hgY9SljqoRtf1D3oOSRS28BijHf829jq-y0wOCnzpPEpO7MvzLTB6NIgW5mFLG65RLg6irMYeA-Hi6SzGMbxRMPsnJMpmq39t9RT3UqO"
      }
    };
    // var data = {
    //   to:
    //     "/topics/919667099953",
    //   data: {
    //     title: "Lauda Lassan",
    //     message: message
    //   }
    // };
    var data = {
        "to":id,
        "data":{
            "notification": {
                "title": "Doctor has updated the medicines" ,
                "body": message
            }
        }
    };
    let res = await axios.post(
      "https://fcm.googleapis.com/fcm/send",
      data,
      options
    );
    console.log("Patient has been notified");
    // window.setTimeout(() => {
    //   location.reload();
    // }, 3000);
  } catch (err) {
    console.log(err);
  }
};

var doctorForm = document.querySelector(".doctor-form"); //selecting the div with className = .nurse-form
if (doctorForm) {
  doctorForm.addEventListener("submit", e => {
    e.preventDefault();
    const date = document.getElementById("date").value;
    const remarks = document.getElementById("remarks").value;
    // const medicines = document.getElementById("medicines").value;
    // console.log("medicines=========" + medicines);
    const arrMedi = document.getElementsByName("medi");
    const arrCheck = document.getElementsByName("checkx");
    const medi = [];
    const check = [];
    for (var i = 0; i < arrMedi.length; i++) {
      medi[i] = arrMedi[i].value;
    }
    var countCheck = 0;
    for (var i = 0; i < arrCheck.length; i += 3) {
      var routine = "";
      for (var j = i; j < (i + 3); j++) {
        var checkVal = arrCheck[i].checked;
        // console.log(j);
        // console.log(checkVal);
        if (checkVal === true) {
          routine += "X-";
        } else {
          routine += "0-";
        }
      }
      check[countCheck] = routine;
      countCheck++;
    //   routine = "";
    }
    const mediarray = [];
    for(let a = 0 ; a < medi.length; a++){
        mediarray[a] = check[a] + "" + medi[a];
    }
    // console.log(mediarray);
    // console.log("bhasad")
    // for(var i = 0; i < arrCheck.length; i++){
    //     // check[i] = arrCheck[i].checked;
    // }
    // const cb1 = document.getElementById("cb1").checked;
    // if (cb1 === true) {
    //   routine += "X";
    // } else {
    //   routine += "0";
    // }
    // const cb2 = document.getElementById("cb2").checked;
    // if (cb2 === true) {
    //   routine += "X";
    // } else {
    //   routine += "0";
    // }
    // const cb3 = document.getElementById("cb3").checked;
    // if (cb3 === true) {
    //   routine += "X";
    // } else {
    //   routine += "0";
    // }
    updateDoctorData(messageReceived, date, remarks, medi, check, mediarray);
    sendNotification("Doctor has updated the medicines", messageID);
  });
}

// var pastHistory = document.getElementById("pastHistory");
// if(pastHistory){
//     pastHistory.addEventListener("click", function(personalInfo, appointmentsInfo, medicinesInfo, reportsInfo){

//     });
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
