     
        //   // Initial array of games
          var games = [];
    
        // displaygameInfo function re-renders the HTML to display the appropriate content
        function displayGameInfo(game) {
            console.log("game info")
            // var game = $(this).attr("data-input");
            // var queryURL = " https://api-v3.igdb.com/games/ab8bfac628708992beb4a32f5a01c89c";
            var settings = {
              "async": true,
              "crossDomain": true,
              "url": "https://api.rawg.io/api/games?page_size=10&search="+game+"",
              "method": "GET",
              "headers": {
                "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
                "x-rapidapi-key": "f0457cbf4fmshcbc3914de65cf34p14fc1cjsn44b4be2f300a"
              }
            }

            $.ajax(settings).done(function (response) {
                console.log(response);
                $("#name").text(JSON.stringify(response.results[0].name));
                $("#date").text(JSON.stringify(response.results[0].released));
                $("#rating").text(JSON.stringify(response.results[0].rating));
                $("#name").text(JSON.stringify(response.results[0].name));
                $("#name").text(JSON.stringify(response.results[0].name));
            
              // Creating a div to hold the game
              var name = $("#name");
    
              // Storing the rating data
              var rating = response.Rated;
    
              // Creating an element to have the rating displayed
              var pOne = $("<p>").text("Name of Game: " + name);
    
              // Displaying the rating
              name.append(pOne);
    
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

            $.ajax(settings).done(function (response) {
                console.log(response);
            });
            
        }
    
        //   // Function for displaying game data
        //   function renderButtons() {
    
        //     // Deleting the games prior to adding new games
        //     // (this is necessary otherwise you will have repeat buttons)
        //     $("#buttons-view").empty();
    
        //     // Looping through the array of games
        //     for (var i = 0; i < games.length; i++) {
    
        //       // Then dynamicaly generating buttons for each game in the array
        //       // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        //       var a = $("<button>");
        //       // Adding a class of game-btn to our button
        //       a.addClass("game-btn");
        //       // Adding a data-attribute
        //       a.attr("data-name", games[i]);
        //       // Providing the initial button text
        //       a.text(games[i]);
        //       // Adding the button to the buttons-view div
        //       $("#buttons-view").append(a);
        //     }
        //   }
    
          // This function handles events where a game button is clicked
          $("#add-game").on("click", function(event) {
            event.preventDefault();
            // This line grabs the input from the textbox
            
    
            // Adding game from the textbox to our array
            games.push(game);
    
           
          });
    
          // Adding a click event listener to all elements with a class of "game-btn"
          $(document).on("click", "#search",  () => {
            
              event.preventDefault();
              var game = $("#game-input").val().trim();
              displayGameInfo(game);
              console.log('only this')
          });
    
         
        