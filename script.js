document.addEventListener('DOMContentLoaded',()=>{
    
      fetchFilmData()

})

function fetchFilmData(){
    fetch("http://localhost:3000/films")
    .then((res)=> res.json())
    .then(films => films.forEach(film => {
        createMovieCard(film)
        console.log(film.title);
        
    }));
  }

  function createMovieCard(film){
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

