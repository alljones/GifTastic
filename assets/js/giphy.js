 
     // Initial array of emotions
     var emotionArr = ["Happy", "Calm", "Excited", "Sad"];

     // Function for dumping the JSON content for each button into the div
     function displayEmotions() {
 
       // Query Giphy
       var emotion = $(this).attr("data-name");
       var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
         emotion + "&api_key=dc6zaTOxFJmzC&limit=10";
      
       // AJAX Callback
       $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            //Clear gifs that are displayed
            $("#gifs-appear-here").empty();

            //Change Subhead Title
            $("#feeling-title").text("I am feeling " + emotion + "!");
            // Storing an array of results in the results variable
            var results = response.data;
  
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
  
              // Only taking action if the photo has an appropriate rating
              if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                // Creating a div with the class "item"
                var gifDiv = $("<div class='item'>");
  
                // Storing the result item's rating
                var rating = results[i].rating;
  
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);
  
                // Creating an image tag
                var gifImage = $("<img>");
  
                // Giving the image tag an src attribute of a property pulled off the
                // Starting with Still State and adding class of gif
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-state", "still");
                gifImage.attr("data-still-url", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animated-url", results[i].images.fixed_height.url);
                gifImage.addClass("gif");
  
                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(gifImage);
  
                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gifs-appear-here").prepend(gifDiv);
              }
            }
          });
 
     }
 
     // Function for displaying emotion data
     function renderButtons() {
 
       // Deleting the buttons prior to adding new emotion
       // (this is necessary otherwise you will have repeat buttons)
       $("#emoButtons").empty();
       $("#emotionInput").empty();
 
       // Looping through the array of emotion
       for (var i = 0; i < emotionArr.length; i++) {
 
         // Then dynamicaly generating buttons for each emotion in the array
         // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
         var btn = $("<button>");
         // Adding a class of movie to our button
         btn.addClass("btn btn-default feeling");
         // Adding a data-attribute
         btn.attr("data-name", emotionArr[i]);
         // Providing the initial button text
         btn.text(emotionArr[i]);
         // Adding the button to the buttons-view div
         $("#emoButtons").append(btn);
        
       }
     }
 
     // This function handles events where one button is clicked
     $("#addEmotion").on("click", function(event) {
       event.preventDefault();
 
       // This line grabs the input from the textbox
       var emotionInput = $("#emotionInput").val().trim();
 
       // The emotion input from the textbox is then added to our array
       emotionArr.push(emotionInput);
 
       // Calling renderButtons which handles the processing of our emotion array
       renderButtons();
 
     });
 
     // Generic function for displaying the Emotions
     $(document).on("click", ".feeling", displayEmotions);

      // Start/Stop
     $(document).on("click", ".gif", function () {
        // get current state (still or animate)
        var state = $(this).attr("data-state");
        // get current src
        var src = $(this).attr("src");
        
        if (state === "still") {
            // change data state to animate
            $(this).attr("data-state", "animate");
            var animatedURL = $(this).attr("data-animated-url");
            $(this).attr("src", animatedURL);
        } else {
            // change data state to still
            $(this).attr("data-state", "still");
            var stillURL = $(this).attr("data-still-url");
            $(this).attr("src", stillURL);
        };
    });
 
     // Calling the renderButtons function to display the intial buttons
     renderButtons();