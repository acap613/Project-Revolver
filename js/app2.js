var games = [];

function displaygameInfo() {

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

    $.ajax(settings).done(function (response) {
        console.log(response);

        //get title and store it in the div
        var name = response[0].results.name;
        // $("#card-title").text(name);
        $("#card-title").textContent = name;

        // Putting the entire game above the previous games
        // $("#games-view").prepend(gameDiv);

    });


};
// $("#buttonSearch").on("click", function () {
//     // console.log("click");
//     var nameOfGame = $("#inputSearch").val().trim();
// });