$(function() {

    $('#hide-nav').hide();

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC_WglPteiSNxTekpJ0LW9s7drZEeoqt7Y",
        authDomain: "motherly-app.firebaseapp.com",
        databaseURL: "https://motherly-app.firebaseio.com",
        projectId: "motherly-app",
        storageBucket: "",
        messagingSenderId: "611436917830"
    };

    firebase.initializeApp(config);

    // Get elements
    var txtEmail = $('#txtEmail');
    var txtPassword = $('#txtPassword');
    var btnLogin = $('#btnLogin');
    var btnSignUp = $('#btnSignUp');
    var btnLogout = $('#btnLogout');

    btnLogin.on('click', function() {
        event.preventDefault();
        var email = txtEmail.val();
        var password = txtPassword.val();
        var auth = firebase.auth();

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            $('#btnSignUp').hide();
            $('#hide-nav').show();
        });
    });

    btnSignUp.on('click', function() {
        event.preventDefault();
        var email = txtEmail.val();
        var password = txtPassword.val();
        var auth = firebase.auth();


        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            $('#btnSignUp').hide();
            $('#hide-nav').show();
        });
    });

    btnLogout.on('click', function() {
        firebase.auth().signOut().then(function() {
            alert("You have been logged out!");
            $('#hide-nav').hide();
        }).catch(function(error) {
            // An error happened.
        });
    });
})

function initMap() {
    var myLocation = { lat: 40.73978, lng: -73.98983 };
    console.log(myLocation);
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLocation,
    });
    var marker = new google.maps.Marker({
        position: myLocation,
        map: map
    });
    console.log("this works");
}
