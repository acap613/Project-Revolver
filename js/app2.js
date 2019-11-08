
// jQuery READY ------------------------------------------------------------------------
$(function () {

    // MODAL POP-UP -----------------------------------------------------------------
    $("#myModal").modal();
    $("#loginButton").on('click', function (e) {
        console.log("button");
        var newText = $("#userNameInput:text").val();
        console.log(newText);
        $("#userName").text("Hello " + newText);
        console.log("userName input to navbar")
    });

    // FIREBASE ------------------------------------------------------------------
    const firebaseConfig = {
        apiKey: "AIzaSyCwcMO8a208i8hRO2bLwSw6hQoIptXPrYE",
        authDomain: "erudite-flag-256023.firebaseapp.com",
        databaseURL: "https://erudite-flag-256023.firebaseio.com",
        projectId: "erudite-flag-256023",
        storageBucket: "erudite-flag-256023.appspot.com",
        messagingSenderId: "218813116442",
        appId: "1:218813116442:web:b5908560df242e62de61a3"
    };
    // FIREBASE INIT ------------------------------------------------------------------
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();

    //ARRAY
    var games = [];

    // MAIN FUNCTION ---------------------------------------------------------------------
    function displayGameInfo(game) {
        console.log("game info", game)

        // GET Method to acces RAWG (API#01) --------------------------------------------------
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

        //jQuery AJAX to retrieve API#01 infos -----------------------------------------------------------------------------------
        $.ajax(settings).done(function (response) {
            console.log('response', response);
            $(".card-title").text(JSON.stringify(response.results[0].name)); //Name  
            // console.log('checking', $("#name")[0].textContent)
            $("#date").text(JSON.stringify(response.results[0].released)); //Date Released
            $("#rating-rawg").text(JSON.stringify("RAWG's rating: " + response.results[0].rating)); //Rating
            $("#score-rawg").text(JSON.stringify("RAWG's score: " + response.results[0].score)); //Score
            $("#store").text(JSON.stringify(response.results[0].stores[0].store.name)); //Store
            $("#platform").text(JSON.stringify(response.results[0].platforms[0].platform.name)); //Platform
            // $("#img-RAWG").attr(response.results[0].image); //MISSING IMG

            // Creating a div to hold the game
            //   var name = $("#name");

            //   // Storing the rating data
            //   var rating = response.Rated;s

            //   // Creating an element to have the rating displayed
            //   var pOne = $("<p>").text("Name of Game: " + name);

            //   // Displaying the rating
            //   name.append(pOne);

            //   // Storing the release year
            //   var released = response.Released;

            //   // Creating an element to hold the release year
            //   var pTwo = $("<p>").text("Released: " + released);

            //   // Displaying the release year
            //   released.append(pTwo);

            //   // Storing the plot
            //   var date = response.Plot;

            //   // Creating an element to hold the plot
            //   var pThree = $("<p>").text("Plot: " + plot);

            //   // Appending the plot
            //   gameDiv.append(pThree);

            //   // Retrieving the URL for the image
            //   var imgURL = response.Poster;

            //   // Creating an element to hold the image
            //   var image = $("<img>").attr("src", imgURL);

            //   // Appending the image
            //   gameDiv.append(image);

            //   // Putting the entire game above the previous games
            //   $("#games-view").prepend(gameDiv);
        });

        // GET Method to acces CHICKEN-COOP (API#02) --------------------------------------------------
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://chicken-coop.p.rapidapi.com/games/" + game + "",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "chicken-coop.p.rapidapi.com",
                "x-rapidapi-key": "f0457cbf4fmshcbc3914de65cf34p14fc1cjsn44b4be2f300a"
            }
        }
        //jQuery AJAX to retrieve API#02 Chicken-Coop infos -----------------------------------------------------------------------------------
        $.ajax(settings).done(function (info) {
            console.log(info);
            // $("#rated").text(JSON.stringify(info.result.developer)); 
            $(".card-developer").text("Developed by: " + info.result.developer); //DEVELOPER
            $(".card-rating-chicken").text("Chicken-coop's rating: " + info.result.rating); //RATING
            $(".card-score-chicken").text("Chicken-coop's score: " + info.result.score); //SCORE
            var url = info.result.image;
            $(".card-img").attr('src', url); //IMAGE
            // console.log("image");
            $(".bg").css("background-image", "url(" + url + ")"); //BG IMAGE
            // console.log("background-img");
        });

    }



    // This function handles events where a game button is clicked
    $("#add-game").on("click", function (event) {
        event.preventDefault();
        // Adding game from the textbox to our array
        games.push(game);


    });

    // Adding a click event listener to all elements with a class of "search"
    $(document).on("click", "#buttonSearch", () => {
        event.preventDefault();
        // displayGameInfo(game);
        // initial variables: 
        // var gameName = $("#name").textContent;
        // console.log('game name', $("#name")[0].textContent)
        // var gameRating = $("#rating");
        // var releaseDate = $("#date");
        // var playedOn = $("#platform");

        // var gameOutput = {
        //     name: gameName,
        //     rating: gameRating,
        //     released: releaseDate,
        //     platform: playedOn,

        // };



        event.preventDefault();
        var game = $("#inputSearch");
        console.log("game IN BUTTONSEARCH", game[0].value)
        displayGameInfo(game[0].value);
        console.log('only this');
        // console.log('game name', $("#name")[0].textContent)



        // $("#name").val(name);
        // $("#rating").val(rating);
        // $("#platform").val(platform);
        // $("#date").val(date);

        //   var game = $("#game-output").val();
        //   console.log($("#name").va())
    });

    // When Save button is clicked, add values to FireBase
    $("#save").click(function () {
        // $("#name").val(name);
        console.log($("#name")[0].innerText)
        //     $("#rating").val(rating);
        //     $("#platform").val(platform);
        //     $("#date").val(date);
        var savedName = $("#name")[0].textContent;


        // event.preventDefault();
        // console.log()
        // var gameName = $("#inputSearch").val().trim();
        // var gameRating = $("#rating").val().trim();
        // // console.log(gameName)
        // database.ref().push({
        //   name: gameName,
        //   rating: gameRating,
        // });
        // var GAME = "word";
        var RESULT = {
            name: savedName,

        }
        database.ref().push(RESULT);
    });
    // database.ref().on(“child_added”, function (snapshot) {
    //   // console.log(snapshot.val().name);
    //   // Handle the errors
    // }, function (errorObject) {
    //   console.log(“Errors handled: ” + errorObject.code);
    // });
    // event.preventDefault();

    // console.log(‘only this’)
});    