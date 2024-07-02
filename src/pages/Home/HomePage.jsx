import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./homePage.css";
import MovieList from "../../components/MovieList";

const HomePage = () => {
  const [movie, setMovie] = useState([]);

  const fetchingData = async () => {
    try {
      const fetch = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=3aecf1fb0e7d2149d0bc537bcb68f34b&language=en-US"
      );
      const data = await fetch.data;
      setMovie(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <div className="poster">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        transitionTime={2}
        infiniteLoop={true}
        showStatus={false}
      >
        {movie.map((list) => (
          <Link
            key={list.id}
            to={`/movie/${list.id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <div className="posterImage">
              <img
                src={`https://image.tmdb.org/t/p/original${
                  list ? list.backdrop_path : ""
                }`}
                alt=""
              />
            </div>
            <div className="posterImage-overlay">
              <div className="posterImage-title">{list ? list.title : ""}</div>
              <div className="posterImage-runtime">
                {list ? list.release_date : ""}
                <span className="posterImage-rating">
                  {list ? Math.round(list.vote_average) : ""}
                  <i className="fas fa-star" />
                </span>
              </div>
              <div className="posterImage-description">
                {list ? list.overview : ""}
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
      <MovieList />
    </div>
  );
};

export default HomePage;
