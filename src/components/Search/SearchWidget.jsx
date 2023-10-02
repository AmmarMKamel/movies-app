import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SearchBar from './SearchBar';
import { useTheme } from '@mui/material/styles';
import translations from '../../utils/translations';
import { useSelector } from "react-redux";

const SearchWidget = () => {
  const language = useSelector((state) => state.languageSlice.currentLang);
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
        borderRadius: "2px",
      }}
    >
      <Typography variant="h4" gutterBottom
      sx={{
        color: theme.palette.text.primary,
        }}>
        {translations[language].searchTitle}
      </Typography>
      <Typography variant="body1" gutterBottom sx={{color: theme.palette.text.primary}}>
      {translations[language].searchDescription}
      </Typography>
      <SearchBar />
    </Container>
  );
};

export default SearchWidget;
