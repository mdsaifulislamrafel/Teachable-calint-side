import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const signOut = () => {
    logOut();
  };

  return (
    <div className="navbar fixed top-0 z-10 bg-opacity-30 max-w-screen-xl bg-slate-500 w-full flex flex-wrap items-center justify-between p-4">
      <img
        src="https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=600"
        className="w-14 h-14 rounded-full"
        alt="Logo"
      />
      <div className="flex-1">
        <a className="btn btn-ghost uppercase text-2xl font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient">
          Teach:able
        </a>
      </div>
      <div className="flex-none gap-2">
        <ul className="menu menu-horizontal px-1 hidden sm:flex">
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/allClass'}>All Classes</Link>
          </li>
        </ul>
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src={
                    user.photoURL ||
                    'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={'/dashboard/profile'} className="justify-between">
                  Dashboard
                </Link>
              </li>
              <li onClick={signOut}>
                <a>Logout</a>
              </li>
              <li className="block sm:hidden">
                <Link to={'/'}>Home</Link>
              </li>
              <li className="block sm:hidden">
                <Link to={'/allClass'}>All Classes</Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link to={'/login'} className="btn btn-ghost">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
