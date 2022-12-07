import { Box, Heading, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<Box as='nav' marginTop={5} bgColor='gray.100' padding={5} borderRadius='lg' marginBottom={10}>
			<Stack direction='row' spacing={5} alignItems='center' justifyContent='space-between'>
				<Heading as='h1' size='md'>
					Movie App
				</Heading>
				<Stack direction='row' spacing={5} alignItems='center'>
					<Link to='/'>Home</Link>
					<Link to='/movies'>Movies</Link>
				</Stack>
			</Stack>
		</Box>
	);
};

export default Navbar;
