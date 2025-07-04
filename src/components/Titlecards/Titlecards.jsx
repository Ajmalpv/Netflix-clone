import React, { useEffect, useRef, useState } from 'react'
import './Titlecards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router';



const Titlecards = ({title,category}) => {

  const [apiData, setapiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjZlMTZiMDViNGJhZDQwZjE4ZDEyNjdkMmU3MDM5MSIsIm5iZiI6MTczNDAwNDE2NS41MTMsInN1YiI6IjY3NWFjZGM1ZjViNTY3ZjMxMTMwZjQyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wLlDVmkR4Qnd-2Sw9hOw3xiuV5VdvPoiVKJUtS3bSnc'
    }
  };
  
  const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  } 
  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setapiData(res.results))
    .catch(err => console.error(err));
  
  cardsRef.current.addEventListener('wheel',handleWheel);
},[])

  return (
    <div className='titlecards'>
      <h2>{title?title: "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>



        })}
      </div>
    </div>

  )
}

export default Titlecards