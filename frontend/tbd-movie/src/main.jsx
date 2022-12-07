import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

// components
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ChakraProvider resetCSS>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ChakraProvider>
	</React.StrictMode>
);
