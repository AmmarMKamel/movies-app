import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { watchlistCount } from "../store/slices/watchlist";

import {
  fetchWatchlist,
  addOrRemoveFromWatchList,
} from "../api/services/watchlistService";
import { useTheme } from "@mui/material/styles";

import { Container, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import SearchBar from "../components/Search/SearchBar";
import MoviesContainer from "../components/MoviesContainer/MoviesContainer";
import { fetchMovieDetailsByName } from "../api/services/searchService";
import translations from "../utils/translations";
import { useSelector } from "react-redux";

const SearchResult = () => {
  const language = useSelector((state) => state.languageSlice.currentLang);

  const theme = useTheme();
  const dispatch = useDispatch();

  const location = useLocation();
  const [searchString, setSearchString] = useState(location.state?.query);
  const [moviesList, setmoviesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1000);
  const [loading, setLoading] = useState(true);

  const [watchlistMovies, setWatchlistMovies] = useState([]);
  dispatch(watchlistCount(watchlistMovies.length));
  const [change, setChange] = useState(0);

  const isFavorite = (id) => {
    if (watchlistMovies.find((movie) => movie.id === id)) {
      return true;
    }
  };

  const handelFavorite = async (id) => {
    if (isFavorite(id)) {
      await addOrRemoveFromWatchList(id, false);
    } else {
      await addOrRemoveFromWatchList(id);
    }
    setChange(change + 1);
  };

  const fetchData = (currentSearchString, currentPage = 1) => {
    setSearchString(currentSearchString ?? "");
    fetchMovieDetailsByName(currentSearchString, currentPage)
      .then((data) => {
        setmoviesList(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData(searchString, currentPage);

    fetchWatchlist()
      .then((data) => {
        setWatchlistMovies(data.results);
      })
      .catch((err) => console.log(err));
  }, [currentPage, change]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage + 1);
    setLoading(true);
  };

  return (
    <Container fluid="true" sx={{ py: 5 }}>
      <SearchBar searchPage={true} fetchData={fetchData} initialSearchTerm={searchString} />
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          color: theme.palette.text.primary,
          marginTop: "10px",
        }}
      >
        <strong>{translations[language].searchPageHeader}</strong>{" "}
        {searchString}
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <CircularProgress size={100} />
        </Box>
      ) : ( moviesList.length === 0 ? (
            <Typography
              sx={{
				width: "70%",
                fontSize: "2rem",
				marginTop: "100px",
                color: theme.palette.text.primary,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {translations[language].searchPageEmpty}
            </Typography>
          ) : (
            <MoviesContainer
            heading={translations[language].homeHeader}
            content={moviesList}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            isFavorite={(id) => isFavorite(id)}
            handelFavorite={(id) => handelFavorite(id)}
            currentPage={currentPage}
          />
		  )
      )}
    </Container>
  );
};
export default SearchResult;
