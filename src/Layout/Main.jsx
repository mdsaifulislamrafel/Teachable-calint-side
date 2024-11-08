import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';

const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('/signup')
    return (
        <div>
            {noHeaderFooter || <Navbar />}
            <div className='min-h-[calc(100vh-400px)] '>
                <Outlet />
            </div>
            {noHeaderFooter || <Footer />}
        </div>
    );
};

export default Main;