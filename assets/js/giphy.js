 
     // Initial array of emotions
    var emotionArr = ["Happy", "Calm", "Excited", "Sad"];

    // Function for dumping the JSON content for each button into the div
    function displayEmotions() {

      // YOUR CODE GOES HERE!!! HINT: You will need to create a new div to hold the JSON.
      var emotion = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=f" + emotion + "&api_key=dc6zaTOxFJmzC";

      $.ajax({
         url: queryURL,
         method: "GET"
       }).then(function (response){
        console.log(response);
       });

    }

    // Function for displaying movie data
    function renderButtons() {

      // Deleting the buttons prior to adding new movies
      // (this is necessary otherwise you will have repeat buttons)
      $("#emoButtons").empty();

      // Looping through the array of emotion
      for (var i = 0; i < emotionArr.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("movie");
        // Adding a data-attribute
        a.attr("data-name", emotionArr[i]);
        // Providing the initial button text
        a.text(emotionArr[i]);
        // Adding the button to the buttons-view div
        $("#emoButtons").append(a);
      }
    }

    // This function handles events where one button is clicked
    $("#addEmotion").on("click", function(event) {
      event.preventDefault();

      // This line grabs the input from the textbox
      var emotionInput = $("#emotionInput").val().trim();

      // The emotion input from the textbox is then added to our array
      emotionArr.push(emotionInput);

      // Calling renderButtons which handles the processing of our movie array
      renderButtons();

    });

    // Generic function for displaying the movieInfo
    $(document).on("click", ".movie", displayEmotions);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();