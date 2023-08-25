function logOut() {
    window.location = "index.html";
    localStorage.clear();
}
// add_room = document.getElementById("room").value;
const firebaseConfig = {
    apiKey: "AIzaSyBBR2_eKyqY7E0Y_na5rUNktiwE_37PyI8",
    authDomain: "letschat-webapp-283f2.firebaseapp.com",
    databaseURL: "https://letschat-webapp-283f2-default-rtdb.firebaseio.com",
    projectId: "letschat-webapp-283f2",
    storageBucket: "letschat-webapp-283f2.appspot.com",
    messagingSenderId: "336882725051",
    appId: "1:336882725051:web:5bd5400a76f226d0cf399e"
  };
firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("username");

document.getElementById("welcome").innerHTML = "Welcome " + username + "!";
function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;

            console.log(Room_names)
            html_code = "<div class='room_name' onclick='redirect_room(this.id)' id='" + Room_names + "'>" + Room_names + "</div> <hr>"
            document.getElementById("output").innerHTML += html_code;
        });
    });
}
getData();
function addRoom() {
    room_name = document.getElementById("room").value;
    localStorage.setItem("room_name", room_name);
    firebase.database().ref("/").child(room_name).update({
        purpose: "adding_room"
    }
    )
    window.location = "kwitter_page.html";
    getData()
}
function redirect_room(e){
    localStorage.setItem("room_name",e);
    window.location=kwitter
}