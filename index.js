const movieForm = document.querySelector("#movieForm");
const movieInput = document.querySelector("#movieInput");
const movieHub = document.querySelector("#movieHub");

movieForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let query = movieInput.value.trim();  // trim used to remove the unnecessary part like spaces in text

    if (!query) {
        return ;

    }

    console.log(query);
    searchMovie(query);

});


async function searchMovie(movieName) {

    movieHub.innerHTML = `<div class="loader"></div>`;  // for loader logo 

    let response = await fetch(
        `https://www.omdbapi.com/?apikey=4f223340&s=${movieName}`
    );

    let data = await response.json();

    console.log(data);

    if (data.Response === "True") {
        displayMovies(data.Search);
    } else {
        movieHub.innerHTML = `<p>${data.Error}</p>`;
    }
}

function displayMovies(movies) {

    movieHub.innerHTML = "";

    movies.forEach((movie) => {

        const div = document.createElement("div");

        // Store IMDb ID
        div.dataset.imdbID = movie.imdbID;

        div.setAttribute("class", "movie-card");

        div.innerHTML = `
            <div>
                <div>
                    <img src="${movie.Poster}">
                    <p>${movie.Title}</p>
                    <p>${movie.Year}</p>
                </div>
            </div>
        `;

        movieHub.append(div);
    });
}

movieHub.addEventListener("click", (e) => {

    e.stopPropagation();

    const movieCard = e.target.closest(".movie-card");

    if (!movieCard) {
        return;
    }

    const imdbID = movieCard.dataset.imdbID;

    console.log(imdbID);
    location.href=`movie-details.html?id=${imdbID}`;   //redirects to new page
});






