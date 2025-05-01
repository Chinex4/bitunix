import { Outlet } from 'react-router-dom';
import Navbar from '../components/NavBar';
import BottomNavigation from '../components/BottomNavigation'; // bottom navbar for mobile
import Footer from '../components/Footer';

export default function Layout() {
	return (
		<div className='font-mont'>
			{/* Top Navbar */}
			<Navbar />

			{/* Main Page Content */}
			<main className='flex-1 pt-20'>
				<Outlet />
			</main>

			{/* Bottom Navbar for mobile */}
			<div className='md:hidden'>
				<BottomNavigation />
			</div>

			{/* Footer */}
			<Footer />
		</div>
	);
}
