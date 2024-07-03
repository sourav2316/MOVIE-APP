import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import axios from "axios";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);

  const { type } = useParams();

  const fetchingData = async () => {
    try {
      const fetch = await axios.get(
        `https://api.themoviedb.org/3/movie/${
          type ? type : "popular"
        }?api_key=3aecf1fb0e7d2149d0bc537bcb68f34b&language=en-US`
      );
      const data = await fetch.data;
      setMovieList(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, [type]);

  return (
    <div className="movie-list">
      <h2 className="list-title">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="grid place-items-center gap-5 md:grid-cols-3 sm:grid-cols-3 max-md:grid-cols-4 lg:grid-cols-6 max-sm:grid-cols-2">
        {movieList.map((movie) => (
          <Card movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
