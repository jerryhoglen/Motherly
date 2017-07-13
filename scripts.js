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

        var postHeadline = $('#post-headline').val();
        var postQuestion = $('#post-question').val();

        var newPost = addNewPost.push();
        newPost.set({ headline: postHeadline, question: postQuestion });
    });

    // This will load the new posts to the page

    addNewPost.on('value', function(posts) {
        $('#post-question').empty();

        posts.forEach(function(post) {
            var id = post.key;
            var headline = post.val().headline;
            var question = post.val().question;

            var newElement = '<div class="panel panel-default">' +
                '<div class="panel-heading">' + '<h3 class="new-heading">' + headline + '</h3>' + '<br>' + '<p>' + question + '</p>' + '</div>';
            var newReply = '<button id="reply-btn" type="button" class="btn btn-default" data-toggle="modal" data-target="#reply-modal">Reply to question</button>';
            $('#new-posts').append(newElement);
            $('#new-posts').append(newReply);
        });
    });

    $('#save-btn').on('click', function(e) {
        e.preventDefault();
        

        var questionReply = $('#answer-question').val();
        var userReply = $('#username-reply').val();
        console.log(questionReply);
        var newElementTwo = '<div class="panel panel-default">' +
            '<div class="panel-body">' + '<h3>' + 'User Reply' + '<hr>' + '</h3>' + '<h4>' + userReply + '</h4>' + '<p>' + questionReply + '</p>' + '</div>';
        $('#new-reply').append(newElementTwo);
        $('#reply-btn').hide();


    });

});





/****************************************************

                  Google maps api

****************************************************/
function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.712784, lng: -74.005941 },
        zoom: 13,
        mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        /***   // Clear out the old markers.
           markers.forEach(function(marker) {
             marker.setMap(null);
           });
           markers = []; ****/

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
};
