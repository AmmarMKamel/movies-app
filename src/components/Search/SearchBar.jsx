import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SearchBar = ({ searchPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if(!searchPage && searchTerm.length !== 0)
      navigate('/search', { state: { query: searchTerm } });

  };

  useEffect(() =>{

  }, [searchTerm])

  return (
    <div className="search-bar">
      <TextField
        variant="outlined"
        placeholder="Search and explore..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          marginBottom: "1rem",
          marginRight: "1rem",
          width: '85%',
          backgroundColor: "white",
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
          backgroundColor: "var(--primary-color)",
          borderRadius: "8px",
          padding: "10px 40px",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "var(--primary-color)",
          },
        }}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
