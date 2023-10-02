import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SearchBar from './SearchBar';
import { useTheme } from '@mui/material/styles';

const SearchWidget = () => {
  const theme = useTheme();

  return (
    <Container
    disableGutters
      sx={{
        width: '100%',
        backgroundColor: theme.custom.searchBgColor,
        padding: '30px 50px',
        marginTop: '25px',
        marginBottom: '50px',
        textAlign: 'left',
        borderRadius: "2px",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{color: theme.palette.text.primary}}>
        Welcome to our movie app
      </Typography>
      <Typography variant="body1" gutterBottom sx={{color: theme.palette.text.primary}}>
        Millions of movies, TV shows and people to discover. Explore now.
      </Typography>
      <SearchBar />
    </Container>
  );
};

export default SearchWidget;
