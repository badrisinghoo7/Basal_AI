import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h1>Job Portal</h1>
        </div>
        <div className="nav-links">
          {isLoggedIn && localStorage.getItem("role") === "user" && (
            
              <Link
                to="/apply"
                className={`nav-link ${location.pathname === '/apply' ? 'active' : ''}`}
              >
                Apply
              </Link>
            )}
            {isLoggedIn && localStorage.getItem("role") === "admin" && (
              <Link
                to="/recruiter"
                className={`nav-link ${location.pathname === '/recruiter' ? 'active' : ''}`}
              >
                Recruiter
              </Link>
            )}
        </div>
        <div className="nav-links">
          {!isLoggedIn && (
            <>
              <Link
                to="/signup"
                className={`nav-link ${location.pathname === '/signup' ? 'active' : ''}`}
              >
                Signup
              </Link>
              <Link
                to="/login"
                className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
              >
                Login
              </Link>
            </>
          )}
          {isLoggedIn && (
            <button className="nav-link logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
