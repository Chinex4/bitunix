import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoggedInUser } from '../redux/user/userThunk';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const useFetchLoggedInUser = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { user, error, loading } = useSelector((state) => state.user);

<<<<<<< HEAD
  useEffect(() => {
    const skipPaths = ["/login", "/register", "/forgot-password"];
    if (skipPaths.includes(location.pathname)) return;
    dispatch(fetchLoggedInUser())
      .unwrap()
      .catch((err) => {
        toast.error(err || "Session expired. Please log in again.");
		localStorage.removeItem('accessToken');
        navigate('/login');
      });
  }, [dispatch, navigate, location]);
=======
	useEffect(() => {
		const skipPaths = ['/login', '/register', '/forgot-password'];
		// console.log(location.pathname);
		if (skipPaths.includes(location.pathname)) return;
		dispatch(fetchLoggedInUser())
			.unwrap()
			.catch((err) => {
				toast.error(err || 'Session expired. Please log in again.');
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				navigate('/login');
			});
	}, [dispatch, navigate, location]);
>>>>>>> 865177c5e7af4b5c3e0677905388028b616f4b9f

	return { user, error, loading };
};

export default useFetchLoggedInUser;
