import React from 'react'
import translations from '../..//utils/translations';
import MovieCard from "../../components/MovieCard/MovieCard";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Recommendtion(props) {
  return (
    <Grid container spacing={2} sx={{ py: 5 }}>
              <Typography
                variant="h3"
                component="h3"
                sx={{
                  fontWeight: "bold",
                  color: props.theme.palette.text.primary,
                  mb: 5,
                }}
              >
                {translations[props.language].detailsPageRecommendations}
              </Typography>
              <Grid container spacing={2}>
                {props.recommendedMovies &&
                  props.recommendedMovies.map((movie) => (
                    <Grid
                      item={true}
                      xs={12}
                      sm={6}
                      md={3}
                      lg={2}
                      key={movie.id}
                    >
                      <MovieCard
                        movie={movie}
                        isFavorite={(id) => props.isFavorite(id)}
                        handelFavorite={(id) => props.handelFavorite(id)}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
  )
}
