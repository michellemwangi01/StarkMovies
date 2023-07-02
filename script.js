const movieImage =  document.getElementById('movieImage')
  const bannerImage = document.getElementById('banner-imageID')
  const movieTitleDetails = document.getElementById('movieTitleDetails')
  const movieDescription = document.getElementById('movieDescription')
  const movierunTime = document.getElementById('movierunTime')
  const movieShowTime = document.getElementById('movieShowTime')
  const remainingTickets = document.getElementById('remainingTickets')
  const movieTitlesContainer = document.getElementById('movieTitlesContainer')
  const movieTitlesCard = document.createElement('div')
  const buyNowBtn = document.createElement('button')
    buyNowBtn.setAttribute("id", "buyNowBtn")
    buyNowBtn.classList.add('fill')
    buyNowBtn.classList.add('btn')
    buyNowBtn.textContent = 'Buy Ticket'
  const soldOut = document.createElement('p')
    soldOut.setAttribute("id", "soldOut")
    soldOut.innerText = "SOLD OUT"
    soldOut.style.color = 'red'
    soldOut.style.fontWeight = 'bold'
  //const buyNowBtn = document.getElementById('buyNowBtn')
  const buttonwrapper = document.getElementById('button-wrapperID')
  const movieDeetsContainer = document.getElementById('movieDeetsContainer')
  const movieTrailer = createIframe()
  

  document.addEventListener('DOMContentLoaded',()=>{
    fetchFilmData()
    setInterval(imgSlider,3500);
   
  })


  function fetchFilmData() {
    fetch("http://localhost:3000/films")
      .then((res) => res.json())
      .then((films) => {
        films.forEach(createMoviePreviewCard) //create preview Card for each movie
        
        //randomize appearance of movie detail cards
        let movieKeys = Object.keys(films);
        let numberOfMovies = movieKeys.length;
        let filmChoiceNum = Math.floor(Math.random() * numberOfMovies);
        let filmChoice = films[movieKeys[filmChoiceNum]];
        // movieTrailer.src = filmChoice.trailer
        movieTitleDetails.textContent = filmChoice.title;
        movieImage.src = filmChoice.poster;
        movieDescription.textContent = filmChoice.description;
        movierunTime.textContent = `RunTime: ${filmChoice.runtime} minutes`;
        movieShowTime.textContent = `Showtime: ${filmChoice.showtime}`;
        remainingTickets.textContent = `Remaining Tickets: ${
          filmChoice.capacity - filmChoice.tickets_sold
        }`;
        

      
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
    const moviePreviewCard = document.createElement('div');
    
    movieTitlesContainer.append(moviePreviewCard)
    moviePreviewCard.innerHTML = `
      <div class="cardTitles" id="cardTitles-${film.id}">
          <div class="imgPoster" id="imgPoster">
              <img src="${film.poster}" alt="">
          </div>
          <div>
              <h3 id="movieTitle">${film.title}</h3>
          </div>
          <button class="deleteBtn" id="filmcard-${film.id}" ><i class="fa fa-trash-o" style="font-size:24px;color:white"></i></button>

    </div>`



      const deleteButton = document.getElementById(`filmcard-${film.id}`)

      deleteButton.addEventListener('click',()=>{
        deleteFilm(film)
      })
      const remainingTicketsNum = film.capacity - film.tickets_sold
      let movieDetailsCard = document.getElementById(`cardTitles-${film.id}`)
      movieDetailsCard.addEventListener('click', ()=>{
        console.log(film.title);
        buttonwrapper.append(buyNowBtn)
        movieTitleDetails.textContent = film.title;
        movieDeetsContainer.scrollIntoView({behavior: 'smooth'})//scrollIntoView: used to scroll to a particular section of a page. MovieImage is the section that we would like to scroll TO

          if(film.trailer == ""){
            movieTrailer.remove()
            bannerImage.append(movieImage)
            movieImage.src = film.poster;
          }
          else {
              movieImage.remove()
              bannerImage.append(movieTrailer)
              movieTrailer.src = film.trailer
            }
        
          
          //display other movie details
          movieDescription.textContent = film.description;
          movierunTime.textContent = `RunTime: ${film.runtime} minutes`;
          movieShowTime.textContent = `Showtime: ${film.showtime}`;      
          remainingTickets.textContent = `Remaining Tickets: ${remainingTicketsNum}`;
          
          //add buyBTN eventListener
          buyNowBtn.addEventListener('click',()=>{
            buyTicketButton(film)
          })
          buyNowBtn.addEventListener('mouseleave',()=>{
            // buyNowBtn.textContent ='Buy Ticket'
            // buyNowBtn.style.backgroundColor = 'black'
            // buyNowBtn.style.opacity = 1
            // soldOut.remove()
          })
         

      })
  }

function buyTicketButton(film){
  if(film.tickets_sold >= film.capacity){
    //alert("Sorry! There are no more tickets for this movie")
    buyNowBtn.textContent ='Sold out'
    buyNowBtn.style.backgroundColor = 'red'
    buyNowBtn.style.opacity = 0.5
    movieDeetsContainer.append(soldOut)
    }
  else if (film.tickets_sold < film.capacity){
    soldOut.remove()
    patchTicketsSold(film)
  }
  //location.reload();
  //buyNowBtn.removeEventListener('click', handleClick);

}




  function patchTicketsSold(film){
    console.log(film);
    if(film.tickets_sold < film.capacity){
      newTicketsSold = film.tickets_sold+1
    }
    else if (film.tickets_sold >= film.capacity){
      newTicketsSold = film.tickets_sold
    }
    fetch(`http://localhost:3000/films/${film.id}`,{
          method: 'PATCH',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "tickets_sold": newTicketsSold
          })
        })
        .then(res => { console.log(res);
          if(res.ok){
            console.log("SUCCESS")
          }else{
            console.log("UNSUCESSFULL")
          }
          return res.json()
        })
        .then((data)=> console.log(data)
        //alert("You have successfully purchases a ticket!")
        )
  }

  function createIframe() {
    const movieTrailer = document.createElement('iframe')
    bannerImage.append(movieTrailer)
    movieTrailer.setAttribute("id","movieTrailer")
    movieTrailer.setAttribute("width","1160")
    movieTrailer.setAttribute("height","715")
    movieTrailer.setAttribute("src","")
    movieTrailer.setAttribute("title","YouTube video player")
    movieTrailer.setAttribute("title","0")
    movieTrailer.setAttribute("frameborder","YouTube video player")
    movieTrailer.setAttribute("allow","accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share")
    return movieTrailer
    
  }

  function deleteFilm(film){
    fetch(`http://localhost:3000/films/${film.id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log('Data deleted successfully');
        } else {
          throw new Error('Error deleting data');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
      alert(`${film.title} will be deleted`)
  }

  var img = document.getElementById('imgSlider');
  var slides=[ 'womanKing.jpg','M3gan.jpg', 'frozen.jpg','insideOut.jpg','miss-sloane.jpg','fastX.jpg','blackpanther.jpg','ironMan.jpg','extraction-2.jpg'];
  var currentIndex = 0;
  function imgSlider(){
      img.style.opacity = 0;
      setTimeout(function() {
        img.src = "./Images/" + slides[currentIndex];
        img.style.opacity = 1; // Transition opacity to 1 after image source is updated
        if(currentIndex<slides.length-1){
              currentIndex=currentIndex+1;
          }
          else{
              currentIndex=1;
          }
        //console.log(img.src);
      }, 300);

  }