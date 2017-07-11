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

    // Get a reference to the database service
    var database = firebase.database();

    // Get elements
    var txtEmail = $('#txtEmail');
    var txtPassword = $('#txtPassword');
    var btnLogin = $('#btnLogin');
    var btnSignUp = $('#btnSignUp');
    var btnLogout = $('#btnLogout');

    // This is the user login in button function
    btnLogin.on('click', function(event) {
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

    // This is the user sign up button function
    btnSignUp.on('click', function() {
        event.preventDefault();
        var email = txtEmail.val();
        var password = txtPassword.val();
        var auth = firebase.auth();

        // Creates new user with email and password
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            $('#btnSignUp').hide();
            $('#hide-nav').show();
        });
    });

    // Logs user out and hide navigation bar so they can move to user only pages
    btnLogout.on('click', function() {
        firebase.auth().signOut().then(function() {
            alert("You have been logged out!");
            $('#hide-nav').hide();
        }).catch(function(error) {
            // An error happened.
        });
    });


    /***************************************************
                    Ask Page
    ****************************************************/

    var addNewPost = database.ref('motherly-app');


    $('#post-btn').on('click', function(e) {
        e.preventDefault();
        console.log('this button works');

        var postQuestion = $('#post-question').val();

        console.log("Values", postQuestion);

        var newPost = addNewPost.push();
        newPost.set({ name: postQuestion });
    });

    // This will load the new posts to the page

    addNewPost.on('value', function(posts) {
        $('#post-question').empty();

        posts.forEach(function(post) {
            var id = post.key;
            var name = post.val().name;


            var newElement = '<div class="panel panel-default">' +
                '<div class="panel-heading">' + name + '</div>';
            $('#new-posts').append(newElement);
        });

    });
})














/****************************************************

                  Google maps api

****************************************************/
/**function initMap() {
    var myLocation = { lat: 40.73978, lng: -73.98983 };
    console.log(myLocation);
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLocation,
    });
    var marker = new google.maps.Marker({
        position: myLocation,
        map: map
    });
    console.log("this works");
} **/
