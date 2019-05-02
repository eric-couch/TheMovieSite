document.addEventListener("DOMContentLoaded", function() {
  let search = document.querySelector("#movieSearch");
  search.addEventListener("input", function() {
    getMovieList(search.value, 1);
  });
});

function getMovieList(search, page) {
  console.log(search);
  const apiKey = "86c39163";
  if (search.length > 2) {
    console.log(search);
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}&page=${page}`)
      .then(r => r.json())
      .then(body => buildResults(search, body, page));
  }
}

function buildResults(search, movieList, pageNum) {
  console.log(movieList);
  let main = document.querySelector("#main");
  main.innerHTML = "";
  let movieUL = document.createElement("ul");
  const { totalResults } = movieList; // destructuring
  movieList.Search.forEach(function(movie) {
    const { Title, Year, Type } = movie; // destructuring
    let movieLI = document.createElement("li");
    movieLI.classList.add("item");
    movieLI.classList.add(Type);
    movieLI.innerText = `${Title} (${Year})`;
    movieUL.appendChild(movieLI);
  });
  main.appendChild(movieUL);
  var movieNav = document.createElement("div");
  if (pageNum > 1) {
    var leftArrow = document.createElement("div");
    leftArrow.id = "leftarrow";
    leftArrow.addEventListener("click", function() {
      getMovieList(search, pageNum - 1);
    });
    leftArrow.innerHTML = "&nbsp;&nbsp;<i class='fas fa-arrow-left'></i>";
    movieNav.appendChild(leftArrow);
  }
  middleNav = document.createElement("div");
  middleNav.id = "middlenav";
  middleNav.innerHTML =
    "Page " + pageNum + " of " + Math.ceil(totalResults / 10);
  movieNav.appendChild(middleNav);
  if (pageNum + 1 < Math.ceil(totalResults / 10)) {
    var rightArrow = document.createElement("div");
    rightArrow.id = "rightarrow";
    rightArrow.addEventListener("click", function() {
      getMovieList(search, pageNum + 1);
    });
    rightArrow.innerHTML = "<i class='fas fa-arrow-right'></i>&nbsp;&nbsp;";
    movieNav.appendChild(rightArrow);
  }
  movieNav.id = "movienav";
  movieNav.classList = "movienav";
  movieDiv = document.querySelector("#main");
  movieDiv.appendChild(movieNav);
}
