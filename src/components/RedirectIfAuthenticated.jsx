import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function RedirectIfAuthenticated({ children }) {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			navigate('/'); // or your home page
		}
	}, []);

	return children;
}
