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

user_name = localStorage.getItem("username_key");
room_name = localStorage.getItem("roomname_key");

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                subfolder_name = childKey;
                subfolder_data = childData;
                console.log(subfolder_name, subfolder_data);
                db_name = subfolder_data["name"];
                db_message = subfolder_data["message"];
                db_like = subfolder_data["like"];
                name_tag = '<h4>' + db_name + '<img src="tick.png" class="user_tick"></h4>';
                message_tag = '<h4 class="message_h4">' + db_message + '</h4>';
                btn_tag1 = '<button id="' + subfolder_name + '" class="btn btn-warning" onclick="update_likes(this.id)" value="' + db_like + '">';
                btn_tag2 = '<span class="glyphicon glyphicon-thumbs_up">Like:' + db_like + '</span> </button> <hr>';
                row = name_tag + message_tag + btn_tag1 + btn_tag2;
                document.getElementById("output").innerHTML += row;
                //Start code

                //End code
            }
        });
    });
}
getData();

function logout() {
    localStorage.removeItem("roomname_key");
    localStorage.removeItem("username_key");
    window.location = "index.html";
}

function update_likes(button_id) {
    likes = Number(document.getElementById(button_id).value);
    likes = likes + 1;
    firebase.database().ref(room_name).child(button_id).update({
        like: likes
    });
}

function send() {
    msg = document.getElementById("user_msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0

    });
    document.getElementById("user_msg").value = "";

}