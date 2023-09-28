import { Container, Typography } from "@mui/material";
import SearchBar from "../components/Search/SearchBar";

const SearchResult = () => {

  return (
    <Container
    disableGutters
    maxWidth="xlg"
      sx={{
        width: '95%',
        padding: '30px 50px',
        marginTop: '25px',
        marginBottom: '50px',
        textAlign: 'left',
        borderRadius: "2px",
      }}
    >
      <SearchBar hasBorders={true}/>
      <Typography variant="body1" gutterBottom>
      <strong>Search Results for:</strong> ...
      </Typography>
    </Container>
  );
}
export default SearchResult;