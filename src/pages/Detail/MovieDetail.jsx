import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./movieDetail.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieDetail = () => {
  const [currentMovieDetail, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const fetchingData = async () => {
    try {
      const fetch = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=3aecf1fb0e7d2149d0bc537bcb68f34b&language=en-US`
      );
      const data = await fetch.data;
      setMovie(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    fetchingData();
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <Skeleton height={600} duration={1} />
        </SkeletonTheme>
      ) : (
        <div className="movie">
          <div className="movie__intro">
            <img
              className="movie__backdrop"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.backdrop_path : ""
              }`}
            />
          </div>
          <div className="movie__detail">
            <div className="movie__detailLeft">
              <div className="movie__posterBox">
                <img
                  className="movie__poster"
                  src={`https://image.tmdb.org/t/p/original${
                    currentMovieDetail ? currentMovieDetail.poster_path : ""
                  }`}
                />
              </div>
            </div>
            <div className="movie__detailRight">
              <div className="movie__detailRightTop">
                <div className="movie__name">
                  {currentMovieDetail ? currentMovieDetail.original_title : ""}
                </div>
                <div className="movie__tagline">
                  {currentMovieDetail ? currentMovieDetail.tagline : ""}
                </div>
                <div className="movie__rating">
                  {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
                  <i className="fas fa-star" />
                  <span className="movie__voteCount">
                    {currentMovieDetail
                      ? "(" + currentMovieDetail.vote_count + ") votes"
                      : ""}
                  </span>
                </div>
                <div className="movie__runtime">
                  {currentMovieDetail
                    ? currentMovieDetail.runtime + " mins"
                    : ""}
                </div>
                <div className="movie__releaseDate">
                  {currentMovieDetail
                    ? "Release date: " + currentMovieDetail.release_date
                    : ""}
                </div>
                <div className="movie__genres">
                  {currentMovieDetail && currentMovieDetail.genres
                    ? currentMovieDetail.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="movie__genre"
                          id={genre.id}
                        >
                          {genre.name}
                        </span>
                      ))
                    : ""}
                </div>
              </div>
              <div className="movie__detailRightBottom">
                <div className="synopsisText">Description</div>
                <div>
                  {currentMovieDetail ? currentMovieDetail.overview : ""}
                </div>
              </div>
            </div>
            <div className="movie__links">
              {currentMovieDetail && currentMovieDetail.homepage && (
                <a
                  href={currentMovieDetail.homepage}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <p>
                    <span className="movie__homeButton movie__Button">
                      Homepage{" "}
                      <i className="newTab fas fa-external-link-alt"></i>
                    </span>
                  </p>
                </a>
              )}
              {currentMovieDetail && currentMovieDetail.imdb_id && (
                <a
                  href={
                    "https://www.imdb.com/title/" + currentMovieDetail.imdb_id
                  }
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <p>
                    <span className="movie__imdbButton movie__Button">
                      IMDb<i className="newTab fas fa-external-link-alt"></i>
                    </span>
                  </p>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
