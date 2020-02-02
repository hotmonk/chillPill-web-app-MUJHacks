fileButton.addEventListener('change',function(e){

    for(let i=0;i<e.target.files.length;i++)
    {
        let reportFile=e.target.files[i];

        let storageRef=firebase.storage().ref("Reports"+reportFile.name);

        let task=storageRef.put(reportFile);

        task.on('state_changed',function progress(snapshot){
            let percentage= snapshot.bytesTransferred/ snapshot.totalBytes*100;

            console.log("Upload is"+ percentage + "% done");
            switch(snapshot.state){
                case firebase.storage.TaskState.PAUSED :
                    case firebase.storage.TaskState.PAUSED :
                        console.log("Upload is paused");
                        break;
                    case firebase.storage.TaskState.RUNNING :
                        console.log("Upload is running");
                        break;
                    
            }
        }, function(error) {

          }, function() {
            // Upload completed successfully, now we can get the download URL
            task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              console.log('File available at', downloadURL);
            });
          });
         
    }
})