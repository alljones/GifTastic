    // constructing a queryURL variable we will use instead of the literal string inside of the ajax method
    var search= $(#emotionInput).val().trim();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=f" + search + "&api_key=dc6zaTOxFJmzC";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      console.log(response.Runtime);
    });