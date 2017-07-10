$(function() {

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
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

    firebase.auth().signOut()
        .catch(function(err) {
            // Handle errors
        });
})
