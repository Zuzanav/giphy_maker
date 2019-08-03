$(function(){ 
makeButtons(cuteanimals, 'search', '#buttons');

})

// GIHPY BUTTONS VARIABLES
var cuteanimals = ['duckling', 'bunny', 'kitten', 'puppy'];

function makeButtons(cuteanimals, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for( var i = 0; i < cuteanimals.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr('data-type', cuteanimals[i])
        a.text(cuteanimals[i]);
        $(areaToAddTo).append(a);

    }
}

$(document).on('click', '.search', function(){
    var type = $(this).data('type');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+type+"&api_key=0UadvzG7wkMMzEvk0LESLAJEnSXfADwf&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"})
        .done(function(response) {
            for( var i = 0; i <response.data.length; i++){
                var searchDiv = $('<div class="search-item">');
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $('<img>');
                image.attr('src', still);
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');
                image.addClass('searchImage');
                searchDiv.append(image);
                $('#results').append(searchDiv);
            }
      });
})

$('#addSearch').on('click', function(){
    var newSearch = $('input').eq(0).val();
    cuteanimals.push(newSearch);
    makeButtons(cuteanimals, 'search', '#buttons');
    return false;
})

$(document).on("click", ".searchImage", function() { 

    var state = $(this).attr("data-state");

    if (state == "still") {
      $(this).attr("src", $(this).data('animated'));
      $(this).attr("data-state", "animated");
    } else {
      $(this).attr("src", $(this).data("still"));
      $(this).attr("data-state", "still");
    }
  });