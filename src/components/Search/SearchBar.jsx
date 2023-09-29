
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SearchBar = ({ hasBorders }) => {
  const handleSearch = () => {
    // Handle search button click
  };

  return (
    <div>
      <TextField
        variant="outlined"
        placeholder="Search and explore..."

        sx={{
          marginBottom: "1rem",
          marginRight: "1rem",
          width: "88%",
          backgroundColor: "white",
          borderRadius: "8px",
          "& fieldset": {
            border: hasBorders ? "1px solid #12121244" : "none",
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
