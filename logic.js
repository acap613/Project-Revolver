$(document).ready(function () {

  var firebaseConfig = {
    apiKey: "AIzaSyCwcMO8a208i8hRO2bLwSw6hQoIptXPrYE",
    authDomain: "erudite-flag-256023.firebaseapp.com",
    databaseURL: "https://erudite-flag-256023.firebaseio.com",
    projectId: "erudite-flag-256023",
    storageBucket: "",
    // storageBucket: "erudite-flag-256023.appspot.com",
    // messagingSenderId: "218813116442",
    // appId: "1:218813116442:web:b5908560df242e62de61a3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var games = [];

  // displaygameInfo function re-renders the HTML to display the appropriate content
  function displayGameInfo(game) {
    console.log("game info")
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.rawg.io/api/games?page_size=1&search=" + game + "",
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
        "x-rapidapi-key": "f0457cbf4fmshcbc3914de65cf34p14fc1cjsn44b4be2f300a"
      }
    }

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://chicken-coop.p.rapidapi.com/games?" + game + "",
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "chicken-coop.p.rapidapi.com",
        "x-rapidapi-key": "f0457cbf4fmshcbc3914de65cf34p14fc1cjsn44b4be2f300a"
      }
    }

    $.ajax(settings).done(function (info) {
      console.log(info);
      // $("#name").text(JSON.stringify(response.results[0].name));
      $("#name").text(info.result[0].title);
      // $("#date").text(JSON.stringify(response.results[0].released));
      $("#rating").text(JSON.stringify(response.results[0].rating));
      $("#store").text(JSON.stringify(response.results[0].stores[0].store.name));
      $("#platform").text(JSON.stringify(response.results[0].platforms[0].platform.name));
    });

  }
  // This function handles events where a game button is clicked
  $("#add-game").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox


    // Adding game from the textbox to our array
    games.push(game);
  });



  // When Search button is clicked, add values to FireBase
  $("#search").click(function () {
    event.preventDefault();

    var gameName = $("#game-input").val().trim();
    // console.log(gameName)


    database.ref().push({
      name: gameName,

    });
  });


  // database.ref().on("child_added", function (snapshot) {
  //   // console.log(snapshot.val().name);

  //   // Handle the errors
  // }, function (errorObject) {
  //   console.log("Errors handled: " + errorObject.code);
  // });

  // event.preventDefault();
  var game = $("#game-output").val();
  displayGameInfo(game);
  // console.log('only this');

});
