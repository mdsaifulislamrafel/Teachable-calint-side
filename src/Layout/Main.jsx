import { Outlet } from 'react-router-dom';
import Navbar from '../Home/Navbar';

const Main = () => {
    return (
        <div>
            <Navbar />
            <h1>This is a Header</h1>
            <Outlet />
            <h4>This is a footer</h4>
        </div>
    );
};

export default Main;