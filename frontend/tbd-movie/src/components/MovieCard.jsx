import { DeleteIcon, EditIcon, Icon, StarIcon } from '@chakra-ui/icons';
import {
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardFooter,
	Divider,
	Heading,
	IconButton,
	Image,
	Stack,
	Text,
} from '@chakra-ui/react';
import Rating from './Rating';

const MovieCard = ({ movie }) => {
	const { _id, title, director, year, description, rating, imageUrl } = movie;

	const deleteMovie = () => {
		fetch(`http://localhost:3000/api/movies/${_id}`, {
			method: 'DELETE',
		})
			.then((res) => res.json())
			.then((data) => {
				navigate('/movies');
			})
			.catch((err) => console.log(err));
	};

	return (
		<Card maxWidth='sm' variant='outline' borderWidth='1px' borderRadius='lg'>
			<CardBody>
				<Image src={imageUrl} alt={title} width='100%' borderRadius='lg' objectFit='cover' />
				<Rating rating={rating} />
				<Stack spacing={3}>
					<Heading size='md'>{title}</Heading>
					<Text as='p' color='gray.500'>
						{description}
					</Text>
				</Stack>
			</CardBody>

			<Divider />

			<CardFooter>
				<ButtonGroup spacing={2} justifyContent='flex-start' width='100%'>
					<Button size='sm' variant='ghost' colorScheme='red' onClick={deleteMovie} leftIcon={<DeleteIcon />}>
						Delete
					</Button>
					<Button size='sm' variant='ghost' colorScheme='blue' leftIcon={<EditIcon />}>
						Edit
					</Button>
				</ButtonGroup>
			</CardFooter>
		</Card>
	);
};

export default MovieCard;
