import { SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch('http://localhost:3000/api/movies')
			.then((res) => res.json())
			.then((data) => {
				setMovies(data);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			{loading ? (
				<p>Loading...</p>
			) : (
				<SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
					{movies.map((movie) => (
						<Link to={`/movies/${movie._id}`} key={movie._id}>
							<MovieCard movie={movie} />
						</Link>
					))}
				</SimpleGrid>
			)}
		</>
	);
};

export default Movies;
