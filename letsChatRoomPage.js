var firebaseConfig = {
  apiKey: "AIzaSyCylXdpHOGbfuJiSnQYsLcPDXDTGORcm38",
  authDomain: "letschat-6410f.firebaseapp.com",
  databaseURL: "https://letschat-6410f-default-rtdb.firebaseio.com",
  projectId: "letschat-6410f",
  storageBucket: "letschat-6410f.appspot.com",
  messagingSenderId: "126753852003",
  appId: "1:126753852003:web:4a8e5eb2df100adbefc656"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



  username = localStorage.getItem("username_key");
document.getElementById("welcome").innerHTML = "Welcome " + username;

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
              childKey = childSnapshot.key;
              main_name= childKey;
              row = '<div id="'+main_name+'" class="room_name" onclick="redirect(this.id)">'+main_name+'</div><hr>';
              console.log(row);
              document.getElementById("output").innerHTML +=row;
        });
  });
}
getData();


function addroom(){
room_name = document.getElementById("roomname").value;
firebase.database().ref("/").child(room_name).update({
  purpose:"main room created"
});
localStorage.setItem("roomname_key",room_name);
}

function redirect(room_id){
  localStorage.setItem("roomname_key", room_id);
  window.location ="letschatpage.html";
}

function logout(){
  localStorage.removeItem("roomname_key");
  localStorage.removeItem("username_key");
  window.location ="index.html";
}