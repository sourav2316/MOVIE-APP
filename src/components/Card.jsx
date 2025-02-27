import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

const Card = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton height={600} duration={1} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link
          to={`/movie/${movie.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="cards">
            <img
              src={`https://image.tmdb.org/t/p/original${
                movie ? movie.poster_path : ""
              }`}
              className="cards-img"
            />
            <div className="cards-overlay">
              <div className="card-title">
                {movie ? movie.original_title : ""}
              </div>
              <div className="card-runtime">
                {movie ? movie.release_date : ""}
                <span className="card-rating">
                  {movie ? Math.round(movie.vote_average * 100) / 100 : ""}
                  <i className="fas fa-star" />
                </span>
              </div>
              <div className="card-description">
                {movie ? movie.overview.slice(0, 118) : ""}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Card;
