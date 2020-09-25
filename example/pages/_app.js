import React from 'react';
import '../styles/globals.css';
import '@10up/elasticpress-react/dist/index.css';

// eslint-disable-next-line react/prop-types
const MyApp = ({ Component, pageProps }) => {
	return <Component {...pageProps} />;
};

export default MyApp;
