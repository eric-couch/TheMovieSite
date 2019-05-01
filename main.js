document.addEventListener("DOMContentLoaded", function() {
  let search = document.querySelector("#movieSearch");
  search.addEventListener("input", function() {
    if (search.value.length > 2) {
      console.log(search.value);
      fetch("https://www.omdbapi.com/?apikey=86c39163&s=" + search.value)
        .then(r => r.json())
        .then(body => buildResults(body));
    }
  });
});

function buildResults(movieList) {
  console.log(movieList);
  let main = document.querySelector("#main");
  main.innerHTML = "";
  let movieUL = document.createElement("ul");
  movieList.Search.forEach(function(movie) {
    //main.innerHTML += movie.Title;
    let movieLI = document.createElement("li");
    movieLI.classList.add("movie");
    movieLI.innerText = movie.Title + " (" + movie.Year + ")";
    movieUL.appendChild(movieLI);
  });
  main.appendChild(movieUL);
}
