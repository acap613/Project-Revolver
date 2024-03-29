
// jQuery READY ---------------------------------------------------------------------------------------------------
$(function () {

    // MODAL POP-UP ------------------------------------------------------------------------------------------------


    $("#myModal").modal();
    $("#loginButton").on('click', function (e) {
        var newText = $("#userNameInput:text").val();
        // console.log(newText);
        $("#userName").text("Hello " + newText);
        // console.log("userName input to navbar")
    });


    //ARRAY
    var games = [];

    // MAIN FUNCTION ---------------------------------------------------------------------
    function displayGameInfo(game) {

      //  GET Method to acces RAWG (API#01) --------------------------------------------------
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

       // jQuery AJAX to retrieve API#01 infos -----------------------------------------------------------------------------------
        $.ajax(settings).done(function (response) {
            console.log('response', response);
            $(".card-title").text(JSON.stringify(response.results[0].name)); //Name  
            // console.log('checking', $("#name")[0].textContent)

            $(".card-date").text(JSON.stringify(response.results[0].released)); //Date Released

            $(".card-rating-rawg").text(JSON.stringify(response.results[0].rating + "/5")); //Rating
            $(".card-score-rawg").text(JSON.stringify("RAWG's score: " + response.results[0].score)); //Score

            $(".card-store").text(JSON.stringify("Store : " + response.results[0].stores[0].store.name)); //Store
            $(".card-platform").text(JSON.stringify("Platform: " + response.results[0].platforms[0].platform.name)); //Platform
            $(".card-platform").text(JSON.stringify(response.results[0].platforms[0].platform.name)); //Platform

            // $("#img-RAWG").attr(response.results[0].image); //MISSING IMG
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
            $(".card-title").text("Title :" + info.result.title); //NAME OF GAME
            $(".card-developer").text("Developed by: " + info.result.developer); //DEVELOPER
            $(".card-rating-chicken").text("Rated: " + info.result.rating); //RATING
            $(".card-score-chicken").text("Chicken-coop's score: " + info.result.score); //SCORE
            var url = info.result.image;
            $(".card-img").attr('src', url); //IMAGE
            $(".bg").css("background-image", "url(" + url + ")"); //BG IMAGE
        });
    };

    // Click on skull reloads the page --------------------------------------------------------------------------
    $(document).on("click", "#buttonSkull", () => {
        location.reload();
    });

    $(document).on("click", "#buttonSearch", () => {
        event.preventDefault(); //prevents pop-up
        var game = $("#inputSearch");
        displayGameInfo(game[0].value);
    });
}); //End of MAIN FUNCTION

const firebaseConfig = {
    apiKey: "AIzaSyCwcMO8a208i8hRO2bLwSw6hQoIptXPrYE",
    authDomain: "erudite-flag-256023.firebaseapp.com",
    databaseURL: "https://erudite-flag-256023.firebaseio.com",
    projectId: "erudite-flag-256023",
    storageBucket: "erudite-flag-256023.appspot.com",
    messagingSenderId: "218813116442",
    appId: "1:218813116442:web:b5908560df242e62de61a3"
};

// FIREBASE INIT -------------------------------------------------------------------------------------------------
firebase.initializeApp(firebaseConfig);

//FIREBASE REF----------------------------------------------------------------------------------------------------
var database = firebase.database();

// on click event ... --------------------------------------------------------------------------------------------
$("#buttonHeart").on("click", function (event) {
    event.preventDefault();

    var gameNameRAWG = $(".card-title")[0].textContent;
    // console.log($(".card-title")[0].textContent);
    var dateRAWG = $(".card-date")[0].textContent;
    // console.log($(".card-date")[0].textContent);
    var scoreRAWG = $(".card-score-rawg")[0].textContent;
    var storeRAWG = $(".card-store")[0].textContent;
    var platformRAWG = $(".card-platform")[0].textContent;

    // var gameName = $(".card-title")[0].textContent; //NAME OF GAME CHICKEN
    // console.log('db test', $(".card-title")[0].textContent);
    var gameDeveloper = $(".card-developer")[0].textContent; //DEVELOPER CHICKEN
    console.log('db test2', $(".card-developer"));
    var gameRating = $(".card-rating-chicken")[0].textContent; //RATING CHICKEN
    console.log('db test3', $(".card-rating-chicken"));
    var gameScore = $(".card-score-chicken")[0].textContent; //SCORE CHICKEN
    console.log('db test4', $(".card-score-chicken"));

    //... SEND these key/values TO THE FIREBASE ------------------------------------------------------------------

    database.ref().push({
        nameRAWG: gameNameRAWG,
        dateRAWG: dateRAWG,
        scoreRAWG: scoreRAWG,
        storeRAWG : storeRAWG,
        platformRAWG : platformRAWG,

        rating: gameRating, 
        developer: gameDeveloper,
        score: gameScore,

    });
});



