import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SearchBar from './SearchBar';

const SearchWidget = () => {

  return (
    <Container
    disableGutters
      sx={{
        width: '100%',
        backgroundColor: 'var(--search-bg-color)',
        padding: '30px 50px',
        marginTop: '25px',
        marginBottom: '50px',
        textAlign: 'left',
        borderRadius: "2px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to our movie app
      </Typography>
      <Typography variant="body1" gutterBottom>
        Millions of movies, TV shows and people to discover. Explore now.
      </Typography>
      <SearchBar />
    </Container>
  );
};

export default SearchWidget;
