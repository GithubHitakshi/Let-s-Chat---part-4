function addUser(){
    user_name = document.getElementById("username").value;
    localStorage.setItem("username_key", user_name);
    window.location = "letsChatRoompage.html";


}
