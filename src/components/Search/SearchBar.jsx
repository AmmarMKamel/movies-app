import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTheme } from '@mui/material/styles';

const SearchBar = ({ searchPage, fetchData }) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if(!searchPage && searchTerm.length !== 0)
      navigate('/SearchResult', { state: { query: searchTerm } });
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if(!searchPage && searchTerm.length !== 0)
        navigate('/SearchResult', { state: { query: searchTerm } });
    }
  }

  useEffect(() =>{

    if(searchPage && fetchData)
        fetchData(searchTerm);
  }, [searchTerm])

  return (
    <div className="search-bar">
      <TextField
        variant="outlined"
        placeholder="Search and explore..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{
          marginBottom: "1rem",
          marginRight: "1rem",
          width: '85%',
          backgroundColor: theme.palette.background.default,
          borderRadius: "8px",
          "& fieldset": {
            border: searchPage ? "1px solid #12121244" : "none",
            borderRadius: "10px",
          },
          "& input": { padding: "12px 16px" },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{
          backgroundColor: theme.palette.primary.main,
          borderRadius: "8px",
          padding: "10px 40px",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
