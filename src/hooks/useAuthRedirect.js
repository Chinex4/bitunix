import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation(); // get current route

  useEffect(() => {
    const checkAuthToken = () => {
      const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
      }, {});

      if (!cookies.auth_token) {
        const currentPath = location.pathname + location.search;
        navigate(`/sign-in?redirect=${encodeURIComponent(currentPath)}`);
      }
    };

    const interval = setInterval(checkAuthToken, 5000);

    return () => clearInterval(interval);
  }, [navigate, location]);
};

export default useAuthRedirect;
