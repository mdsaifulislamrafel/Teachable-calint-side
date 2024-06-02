import { Outlet } from 'react-router-dom';
import Navbar from '../Home/Navbar';

const Main = () => {
    return (
        <div>
            <Navbar />
            <div className='mt-6'>
                <Outlet />
            </div>
            <h4>This is a footer</h4>
        </div>
    );
};

export default Main;