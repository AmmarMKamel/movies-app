import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

import { watchlistCount } from "../store/slices/watchlist";
import { fetchWatchlist, addOrRemoveFromWatchList } from "../api/services/watchlistService";
import { fetchMovieDetails, fetchMovieRecommendations } from "../api/services/moviesService";

import MovieDetailsCard from "../components/MovieDetailsCard/MovieDetailsCard";
import Recommendtion from "../components/Recommendtion/Recommendtion";

import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./../styles/MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.languageSlice.currentLang);
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [change, setChange] = useState(0);
  dispatch(watchlistCount(watchlistMovies.length));
  
  const isFavorite = (id) => {
    if (watchlistMovies.find((movie) => movie.id === id)) {
      return true
    }
  }

  const handelFavorite = async (id) => {
    if (isFavorite(id)) {
      await addOrRemoveFromWatchList(id, false);
    }
    else {
      await addOrRemoveFromWatchList(id);
    }
    setChange(change + 1);
  }

  useEffect(() => {
    fetchMovieDetails(id)
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));

    fetchMovieRecommendations(id)
      .then((data) => {
        setRecommendedMovies(data.results);
      })
      .catch((err) => console.log(err));

    fetchWatchlist()
      .then((data) => {
        setWatchlistMovies(data.results);
      })
      .catch((err) => console.log(err));
  }, [id, change]);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 10
          }}>
          <CircularProgress size={100} />
        </Box>
      ) : (
        <Container fluid="true" sx={{ pt: 5 }}>
          <MovieDetailsCard
            movie={movie}
            isFavorite={(id) => isFavorite(id)}
            handelFavorite={(id) => handelFavorite(id)}
            theme={theme}
            language={language}
          />
          {recommendedMovies?.length !== 0 &&
            <Recommendtion 
              recommendedMovies={recommendedMovies}
              isFavorite={(id) => isFavorite(id)}
              handelFavorite={(id) => handelFavorite(id)}
              theme={theme}
              language={language}
            />
          }
        </Container>
      )}
    </>
  );
}
