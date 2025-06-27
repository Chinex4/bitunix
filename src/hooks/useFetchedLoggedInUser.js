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

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchLoggedInUser } from "../redux/user/userThunk";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

// const PUBLIC_ROUTES = [
//   "/login",
//   "/register",
//   "/forgot-password",
//   "/reset-password",
//   "/trade/third-party",
//   "/markets",
//   "/flash-exchange",
//   "/markets/opportunities",
//   "/p2p/p2p-trading",
//   "/earn/financial-management",
//   "/copy-trading/square",
//   "/activity/act-center",
//   "/activity/task-center",
//   "/referral",
//   "/service/vipservice",
//   "/contract-trade", // base, since you have dynamic param
//   "/", // home page
// ];

// const useFetchLoggedInUser = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { user, error, loading } = useSelector((state) => state.user);
//   console.log(user);
  

//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");
//     const pathIsPublic = PUBLIC_ROUTES.some((publicPath) =>
//       location.pathname.startsWith(publicPath)
//     );

//     // If no token and on a public page, don't fetch
//     if (!accessToken && pathIsPublic) return;

//     // If no user, token exists, and path is not public → fetch user
//     if (!user && accessToken && !pathIsPublic) {
//       dispatch(fetchLoggedInUser())
//         .unwrap()
//         .catch((err) => {
//           console.error("Session fetch failed:", err);
//           toast.error("Session expired. Please log in again.");
//           localStorage.removeItem("accessToken");
//           navigate("/login");
//         });
//     }
//   }, [dispatch, location, navigate, user]);

//   return { user, error, loading };
// };

// export default useFetchLoggedInUser;
