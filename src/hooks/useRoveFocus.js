import { useState, useCallback, useEffect } from 'react';

export default function useRoveFocus(size) {
	const [currentFocus, setCurrentFocus] = useState(-1);

	const handleKeyDown = useCallback(
		(e) => {
			if (e.keyCode === 40) {
				// Down arrow
				e.preventDefault();
				setCurrentFocus(currentFocus === size - 1 ? -1 : currentFocus + 1);
			} else if (e.keyCode === 38) {
				// Up arrow
				e.preventDefault();
				setCurrentFocus(currentFocus === -1 ? size - 1 : currentFocus - 1);
			}
		},
		[size, currentFocus, setCurrentFocus],
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown, false);
		return () => {
			document.removeEventListener('keydown', handleKeyDown, false);
		};
	}, [handleKeyDown]);

	return [currentFocus, setCurrentFocus];
}
