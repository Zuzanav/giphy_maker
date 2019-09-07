$(document).ready(function(){

    // // GIPHY BUTTONS VARIABLES ---------------------------------------------------------
    // var shows = [
    //     'Fresh Prince',
    //     'Clarissa Explains it All',
    //     'Frasier',
    //     'Seinfeld',
    //     'Sabrina the Teenage Witch'
    //     ];

    // ======================================================================================== 

    // FUNCTION TO MAKE BUTTONS ---------------------------------------------------------


    // APPEND BUTTON UPON USER INPUT & SUBMIT 
    // call the MAKE BUTTONS function

    $("#user-input").on("click", function(makeButton){
        //event.preventDefault();
        
        var a = $("<button>");
        $("#buttons").append(a);
        
        var newShow = $("user-input").eq(0).val();

    });

    // ON CLICK EVENT FOR BUTTON PRESS -------------------------------------------------
    $("button").on("click", function(){

        // empty the page of any previous results 
        $("#results").empty();

        // retrieve the show title from button click and assign it to 'show'
        var show = $(this).attr("data-show");
        
        // GIHPY API URL with 'show' added 
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + 
        show + "&api_key=0UadvzG7wkMMzEvk0LESLAJEnSXfADwf&limit=10";

        // call to GIHPY API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            // retreive the response from the GIPHY API and assign it to 'results'
            var results = response.data;

            // for every single result...
            for (var i = 0; i < results.length; i++){

                // ... create a div
                var createDiv = $("<div>");

                // ... create an image div 
                var createImg = $("<img>");

                // take the image info from results and...
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;

                createImg.attr('src', still);
                createImg.attr('data-still', still);
                createImg.attr('data-animated', animated);
                createImg.attr('data-state', 'still');
                createImg.addClass('searchImage');
                
                // ...append the GIF image to the new div 
                createDiv.append(createImg);

                // prepend the new div to the results div 
                $("#results").prepend(createDiv);
            
            } // end of for loop

        })

    }) // end ON CLICK event

    // ON CLICK FOR IMAGE - ANIMATE OR STILL -----------------------
    $(document).on("click", ".searchImage", function() { 

        var state = $(this).attr("data-state");
                
            if (state == "still") {
                $(this).attr("src", $(this).data('animated'));
                $(this).attr("data-state", "animated");
            } else {
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
            }

        }); // end of ANIMATE or STILL ON CLICK FUNCTION
    //-------------------------------------------------------------


    
}); // end document ready function