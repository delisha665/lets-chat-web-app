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

chat_room = localStorage.getItem("room_name");
username = localStorage.getItem("username");
function getData() {
    firebase.database().ref("/" + chat_room).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                console.log(firebase_message_id);
                console.log(message_data);
                Name = message_data["name"];
                msg = message_data["msg"];
                likes = message_data["likes"];
                name_html = "<h4>" + Name + "<img class='user_tick'src='tick.png'></h4> "
                msg_html = "<h4 class='message_h4'>" + msg + "</h4>"
                button_html1 = "<button class='btn btn-primary' value='" + likes + " ' id='" + firebase_message_id + "' onclick='update_likes(this.id)'>"
                button_html2 = "<span class='glyphicon glyphicon-thumbs-up'>LIKE:" + likes + " </span> </button> <hr>"
                document.getElementById("output").innerHTML += name_html + msg_html + button_html1 + button_html2;

                

                
            }
        });
    });
}
getData();
function send() {
    message = document.getElementById("msg").value;
    firebase.database().ref("/" + chat_room).push({
        name: username,
        msg: message,
        likes: 0
    });
    document.getElementById("msg").value = " ";
}
function logOut() {
    window.location = "index.html";
    localStorage.removeItem("username");
    localStorage.removeItem("chat_room");
}
function update_likes(id) {
    likes = document.getElementById(id).value
    likes = Number(likes) + 1;
    firebase.database().ref(chat_room).child(id).update({ likes: likes });
}