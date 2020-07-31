import React, { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';

const PostContext = createContext();

const initialState = {
	posts: null,
	loading: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'set_posts':
			return {
				...state,
				posts: action.payload,
			};
		case 'set_loading':
			return {
				...state,
				loading: action.payload,
			};
		default:
			throw new Error();
	}
};

const PostContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return <PostContext.Provider value={[state, dispatch]}>{children}</PostContext.Provider>;
};

PostContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { PostContextProvider, PostContext };
