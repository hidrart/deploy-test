import { StarIcon } from '@chakra-ui/icons';
import { Stack } from '@chakra-ui/react';

const Rating = ({ rating }) => (
	<Stack direction='row' spacing={1} paddingY={5}>
		{[...Array(rating)].map((_, i) => (
			<StarIcon key={i} color='yellow.500' />
		))}
		{[...Array(5 - rating)].map((_, i) => (
			<StarIcon key={i} color='gray.300' />
		))}
	</Stack>
);

export default Rating;
