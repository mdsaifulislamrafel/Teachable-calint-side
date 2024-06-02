import { Outlet } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';

const Main = () => {
    return (
        <div>
            <Navbar />
            <div className='min-h-[calc(100vh-76px)]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;