const movieDetails = document.querySelector("#movieDetails");
const params = new URLSearchParams(location.search);
const imdbID = params.get("id");

if(imdbID){
    searchMovie(imdbID.trim())  
}

async function searchMovie(imdbID) {

    let response = await fetch(
        `https://www.omdbapi.com/?apikey=4f223340&i=${imdbID}&plot=full`
    );

    let data = await response.json();

    console.log(data);

    if (data.Response === "True") {
       displayMovie(data)
    } else {
        console.log(data.Error);
    }
}
function displayMovie(data){
 movieDetails.innerHTML = ` <div>
            <img src="${data.Poster}" alt="">
        </div>
        <div>
            <h2>${data.Title}</h2>
            <section>
                <p>${data.Released}</p>
                <p>${data.Rated}</p>
                <p>${data.Runtime}</p>
                <p>${data.imdbRating}/10</p>
            </section>
        </div>
        <div>
            <p>plot review</p>
            <p>${data.Plot}</p>
        </div>
        <div>
            <section>
                <p>Director</p>
                <p>${data.Director}</p>
            </section>
            <section>
                <p>Writer</p>
                <p>${data.Writer}</p>
            </section>
        </div>

        <div>
            <section>
                <p>Actors</p>
                <p>${data.Actors}</p>
            </section>
        </div>
        <div>
            <section>
                <p>LANGUAGE</p>
                <p>ENGLISH</p>
            </section>
        </div>
        <div>
            <section>
                <p>COUNTRY</p>
                <p>United states, america</p>
            </section>
        </div>
        <div>
        <button>
       
<a href="https://www.imdb.com/title/${data.imdbID}" target ="_blank" >    
    View on IMDb
</a> 
         </button>
          </div> `
}

    // target = blank is used so that when we click on imdbID it will get opened in new tab