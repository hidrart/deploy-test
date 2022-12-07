import { Container } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

import Home from './layouts/Home';
import Movies from './layouts/Movies';
import Navbar from './components/Navbar';
import Detail from './layouts/Detail';

const App = () => {
	return (
		<Container maxW='container.xl' marginTop={10}>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/movies' element={<Movies />} />
				<Route path='/movies/:id' element={<Detail />} />
			</Routes>
		</Container>
	);
};

export default App;
