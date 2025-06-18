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

	return { user, error, loading };
};

export default useFetchLoggedInUser;
