
// Initial array of games
var games = [];

// displaygameInfo function re-renders the HTML to display the appropriate content
function displaygameInfo() {

    // var game = $(this).attr("data-name");
    // var queryURL = " https://api-v3.igdb.com/games/ab8bfac628708992beb4a32f5a01c89c";
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.rawg.io/api/games?page_size=10&search=gta%20v",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
            "x-rapidapi-key": "f0457cbf4fmshcbc3914de65cf34p14fc1cjsn44b4be2f300a"
        }
    }
    $.ajax(settings).done(function (response) {
        console.log(response);

        //get title and store it in div
        var title = response.title;
        $("#card-title").text(title);


        // Putting the entire game above the previous games
        $("#games-view").prepend(gameDiv);
    });

}

// Function for displaying game data
function renderButtons() {

    // Deleting the games prior to adding new games
    // (this is necessary otherwise you will have repeat buttons)
    $("#").empty();

    // Looping through the array of games
    for (var i = 0; i < games.length; i++) {

        // Then dynamicaly generating buttons for each game in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of game-btn to our button
        a.addClass("game-btn");
        // Adding a data-attribute
        a.attr("data-name", games[i]);
        // Providing the initial button text
        a.text(games[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events when SEARCH button is clicked
$("#buttonSearch").on("click", function (event) {
    console.log(click);
    event.preventDefault();
    // grab the input from textbox
    var game = $("#inputSearch").val().trim();

    // Adding game from the textbox to our array
    games.push(game);

    // Calling renderButtons which handles the processing of our game array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "game-btn"
$(document).on("click", "", displaygameInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

//--------------------------- API 2 -------------------------------------------------------


var settings2 = {
    "async": true,
    "crossDomain": true,
    "url": "https://api-v3.igdb.com/achievements",
    "method": "POST",
    "headers": {
        "x-rapidapi-host": "GameDatabasestefan-skliarovV1.p.rapidapi.com",
        "x-rapidapi-key": "0b0ed405edmshc10f0fc83938abbp164efajsn1be85e46eb30",
        "content-type": "application/x-www-form-urlencoded"
    },
    "data": {}
}

$.ajax(settings2).done(function (response) {
    console.log(response);

    // Creating a div to hold the game
    var gameDiv = $("<div class='game'>");
    // Storing the rating data
    var rating = response.Rated;
    // Creating an element to have the rating displayed
    var pOne = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    gameDiv.append(pOne);

    // Storing the release year
    var released = response.Released;

    // Creating an element to hold the release year
    var pTwo = $("<p>").text("Released: " + released);

    // Displaying the release year
    gameDiv.append(pTwo);

    // Storing the plot
    var plot = response.Plot;

    // Creating an element to hold the plot
    var pThree = $("<p>").text("Plot: " + plot);

    // Appending the plot
    gameDiv.append(pThree);

    // Retrieving the URL for the image
    var imgURL = response.Poster;

    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);

    // Appending the image
    gameDiv.append(image);

    // Putting the entire game above the previous games
    $("#games-view").prepend(gameDiv);
});


// Function for displaying game data
function renderButtons() {

    // Deleting the games prior to adding new games
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of games
    for (var i = 0; i < games.length; i++) {

        // Then dynamicaly generating buttons for each game in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of game-btn to our button
        a.addClass("game-btn");
        // Adding a data-attribute
        a.attr("data-name", games[i]);
        // Providing the initial button text
        a.text(games[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where a game button is clicked
$("#add-game2").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var game = $("#game-input").val().trim();

    // Adding game from the textbox to our array
    games.push(game);

    // Calling renderButtons which handles the processing of our game array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "game-btn"
$(document).on("click", ".game-btn", displaygameInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();
