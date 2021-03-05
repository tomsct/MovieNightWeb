$(document).ready(async () => {
    movie = JSON.parse(movie);

    if(user) user = JSON.parse(user);
    const torrent = await axios.post("/u/", { query });

    $("#btn-download").on("click", () => {
        window.open(torrent.data, "_blank");
    })

    $("#btn-submit").on("click", async (event) => {
        let review = {
            author: user._id,
            body: $("#body").val(),
            rating: $("fieldset > input[type=radio].active").val()
        }   

        const response = await axios.post(`/m/${movie.imdbID}/reviews`, { review });

        if (response.status == 200) {
            AppendComment(response.data);
            $("#body").val("");
        }
    });
        
    $("fieldset > input[type=radio]").on("click", (e) => {
        if($("fieldset > input[type=radio].active"))
           $("fieldset > input[type=radio].active").removeAttr("class");
    
        $(e.target).addClass("active");
    })

    for (let review of movie.Reviews)
        AppendComment(review);
})

const AppendComment = (review) => {
    let reviewDiv = $("<div></div>");
    reviewDiv.attr("id", review._id).addClass("card");
    let reviewRating = $("<p></p>");
    reviewRating.addClass("starability-result").attr("data-rating", review.rating);
    let paragraph = $("<p></p>").text(review.body);
    paragraph.addClass("card-text");
    let reviewBody = $("<div></div>");
    if(user && review.author === user._id)
    {
        let button = $("<button>").addClass("btn btn-danger").text("DELETE");
    
        button.on("click", async (event) => {
            event.preventDefault();
            const res = await axios.delete(`/m/${movie.imdbID}/reviews/${review._id}`);
    
            if (res.status == 200)
                $(`#${review._id}`).remove();
        })
        reviewBody.append(reviewRating, paragraph, button);
    }else
        reviewDiv.append(reviewRating, paragraph);

    $("#comments").prepend(reviewDiv.append(reviewBody));
}



