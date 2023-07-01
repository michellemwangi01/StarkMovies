  const movieImage = document.getElementById('movieImage')
  const movieTitleDetails = document.getElementById('movieTitleDetails')
  const movieDescription = document.getElementById('movieDescription')
  const movierunTime = document.getElementById('movierunTime')
  const movieShowTime = document.getElementById('movieShowTime')
  const remainingTickets = document.getElementById('remainingTickets')
  const movieTitlesContainer = document.getElementById('movieTitlesContainer')
  const movieTitlesCard = document.createElement('div')


  document.addEventListener('DOMContentLoaded',()=>{
    fetchFilmData()
  })


    function fetchFilmData() {
      fetch("http://localhost:3000/films")
        .then((res) => res.json())
        .then((films) => {
          let movieKeys = Object.keys(films);
          let numberOfMovies = movieKeys.length;
          let filmChoiceNum = Math.floor(Math.random() * numberOfMovies);
          let filmChoice = films[movieKeys[filmChoiceNum]];
          movieTitleDetails.textContent = filmChoice.title;
          movieImage.src = filmChoice.poster;
          movieDescription.textContent = filmChoice.description;
          movierunTime.textContent = `RunTime: ${filmChoice.runtime} minutes`;
          movieShowTime.textContent = `Showtime: ${filmChoice.showtime}`;
          remainingTickets.textContent = `Remaining Tickets: ${
            filmChoice.capacity - filmChoice.tickets_sold
          }`;
          console.log(films);
            for(let film of films){
              createMoviePreviewCard(film)
            }
        
        });
    }


  function createMovieDetailsCard(film){
    let cardContainer = document.createElement('div')
    cardContainer.setAttribute('class', 'container')
    let parentDiv = document.getElementById('bodyDiv')
    parentDiv.appendChild(cardContainer)
    cardContainer.innerHTML = `
    <div class="wrapper">
        <div class="banner-image"> 
            <img src="${film.poster}" alt="">
        </div>
        <h1> ${film.title}</h1>
        <p>${film.description}</p>
    </div>
    <div class="button-wrapper"> 
     <button class="btn outline">DETAILS </button> 
     <!--   <button class="btn fill">BUY NOW</button>-->
   </div>`

  


  }

function createMoviePreviewCard(film){

  movieTitlesContainer.append(movieTitlesCard)
  movieTitlesCard.innerHTML = `
    <div id="cardTitles">
        <div class="imgPoster" id="imgPoster">
            <img src="${film.poster}" alt="">
        </div>
        <div>
            <h3 id="movieTitle">${film.title}</h3>
        </div>
        <div id="detailsBtnDiv">
          <button id="movieDetails-${film.id}">Details</button>
        </div>
  </div>`

    let movieDetailsBtn = document.getElementById(`movieDetails-${film.id}`)
    movieDetailsBtn.addEventListener('click', ()=>{
      
       console.log(film.title);
       movieTitleDetails.textContent = film.title
       movieImage.src = film.poster
       movieDescription.textContent = film.description
       movierunTime.textContent = film.movierunTime
       movieShowTime.textContent = film.showtime
       remainingTickets.textContent = film.capacity - film.tickets_sold
})


}


