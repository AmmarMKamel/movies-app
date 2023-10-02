import MovieCard from "../MovieCard/MovieCard";
import Pagination from "../Pagination/Pagination";
import { useTheme } from "@mui/material/styles";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

export default function MoviesContainer(props) {
	const theme = useTheme();

	return (
		<Container fluid="true">
			<Typography
				variant="h4"
				sx={{ mb: 3, color: theme.palette.text.primary }}
			>
				{props.heading}
			</Typography>
			<Grid container spacing={2}>
				{props.content &&
					props.content.map((movie) => (
						<Grid
							item="true"
							xs={12}
							sm={6}
							md={4}
							lg={2}
							key={movie.id}
						>
							<MovieCard 
                            movie={movie}
                            isFavorite={(id)=>props.isFavorite(id)}
                            handelFavorite={(id)=>props.handelFavorite(id)}
                            />
						</Grid>
					))}
			</Grid>
			<Pagination
				pageCount={props.totalPages}
				onPageChange={props.handlePageChange}
				currentPage={props.currentPage}
			/>
		</Container>
	);
}
