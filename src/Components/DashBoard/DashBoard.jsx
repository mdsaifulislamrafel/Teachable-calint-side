import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    return (
        <div className="flex h-screen">
            {/* Drawer button for smaller screens */}
            <button
                className="lg:hidden p-4 bg-orange-400 text-white"
                onClick={toggleDrawer}
            >
                ☰
            </button>
            {/* Sidebar */}
            <div className={`fixed lg:relative md:w-64 min-h-screen bg-orange-400 transition-transform duration-300 z-20 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <ul className="menu p-4">
                    <li>
                        <NavLink to="/dashboard/myEnrollClass" onClick={closeDrawer}>
                            My Enroll Class
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/profile" onClick={closeDrawer}>
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/teacherApplicationForm" onClick={closeDrawer}>
                            Teacher Application Form
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/bookings" onClick={closeDrawer}>
                            Manage Bookings
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/users" onClick={closeDrawer}>
                            All Users
                        </NavLink>
                    </li>
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/" onClick={closeDrawer}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/allClass" onClick={closeDrawer}>
                            All Classes
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* Overlay for smaller screens */}
            {isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 lg:hidden z-10"
                    onClick={toggleDrawer}
                ></div>
            )}
            {/* Main content */}
            <div className="flex-1 p-8 md:ml-64 lg:ml-0">
                <Outlet />
            </div>
        </div>
    );
};

export default DashBoard;