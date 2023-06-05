import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthState,
  getUser,
  logout,
} from "./slices/UserSlice";
import { NavItem } from "./Types";

const NavLink = (props: { label: string; path: string }) => {
  const location = useLocation();
  return (
    <Link
      to={props.path}
      className={`nav-link ${location.pathname === props.path ? "active" : ""}`}
    >
      {props.label}
    </Link>
  );
};
const Layout = () => {
  const user = useSelector(getUser);
  const isLoggedIn = useSelector(getAuthState);
  const dispactch = useDispatch();
  const navigate = useNavigate();

  const NonAuthNavItems: NavItem[] = [
    { label: "Surveys", path: "/" },
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
  ];
  const AuthNavItems: NavItem[] = [
    { label: "Surveys", path: "/" },
    { label: "My Surveys", path: `/surveys?userId=${user?.id}`},
    { label: "Answers", path: "/answers" },
    { label: "Profile", path: "/profile" },
  ];

  const handleLogout = () => {
    dispactch(logout());
    navigate("/login",);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav d-flex">
              {isLoggedIn
                ? AuthNavItems.map((item) => (
                    <NavLink
                      key={`nav-link-${item.label}`}
                      label={item.label}
                      path={item.path}
                    />
                  ))
                : NonAuthNavItems.map((item) => (
                    <NavLink
                      key={`nav-link-${item.label}`}
                      label={item.label}
                      path={item.path}
                    />
                  ))}
            </div>
          </div>
          <label className="mt-3 me-2">
            <p className="text-center text-primary">
              <strong>{user?.fullname}</strong>
            </p>
          </label>
          <button
            type="button"
            className={`btn btn-primary btn-sm ${
              isLoggedIn ? "d-block" : "d-none"
            }`}
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
