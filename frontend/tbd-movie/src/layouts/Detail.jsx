import { Center, Heading, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Rating from '../components/Rating';

const Detail = () => {
	const { id } = useParams();
	const [movie, setMovie] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`http://localhost:3000/api/movies/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setMovie(data);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, [id]);

	return (
		<>
			{loading ? (
				<p>Loading...</p>
			) : (
				<Center>
					<SimpleGrid columns={[1, 2]} spacing={6} justifyContent='center'>
						<Image src={movie.imageUrl} alt={movie.title} width={400} objectFit='cover' borderRadius='lg' />
						<Stack spacing={3} marginTop={5} paddingTop={5}>
							<Heading as='h1' size='lg'>
								{movie.title}
							</Heading>
							<Text>{movie.description}</Text>
							<Text>{movie.director}</Text>
							<Rating rating={movie.rating} />
							<Heading as='h2' size='md'>
								{movie.year}
							</Heading>
						</Stack>
					</SimpleGrid>
				</Center>
			)}
		</>
	);
};

export default Detail;
