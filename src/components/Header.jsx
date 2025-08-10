import { useContext, useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthC";
import logo from "../assets/logo.png";
import ThemeToggleBtn from "./ui/ThemeToggleBtn";

const Header = () => {
  const { user, signoutUser } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await signoutUser();
      setShowLogout(false);
      setMenuOpen(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "font-bold text-primary underline"
            : "text-base-content hover:text-accent transition-colors"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/available-foods"
        className={({ isActive }) =>
          isActive
            ? "font-bold text-primary underline"
            : "text-base-content hover:text-accent transition-colors"
        }
      >
        Available Foods
      </NavLink>

      {user && (
        <>
          <NavLink
            to="/add-food"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-primary underline"
                : "text-base-content hover:text-accent transition-colors"
            }
          >
            Add Food
          </NavLink>
          <NavLink
            to="/manage-foods"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-primary-custom underline"
                : "text-custom hover:text-accent-custom transition-colors"
            }
          >
            Manage My Foods
          </NavLink>
          <NavLink
            to="/requested-foods"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-primary-custom underline"
                : "text-custom hover:text-accent-custom transition-colors"
            }
          >
            My Food Requests
          </NavLink>
        </>
      )}

      {!user && (
        <>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-primary-custom underline"
                : "text-custom hover:text-accent-custom transition-colors"
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-primary-custom underline"
                : "text-custom hover:text-accent-custom transition-colors"
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-primary-custom underline"
                : "text-custom hover:text-accent-custom transition-colors"
            }
          >
            Signup
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="w-full bg-secondary dark:bg-neutral text-base-content shadow-lg fixed top-0 z-50 border-b border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <img
            src={logo}
            alt="Food Sharing Logo"
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-md border-2 border-primary"
          />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-primary whitespace-nowrap">
            FoodShare
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <ul className="flex gap-6 items-center text-base font-semibold">
            {navLinks}
          </ul>
        </div>

        {/* Right Side - Theme Toggle, User Profile & Mobile Menu */}
        <div className="flex items-center gap-3">
          <ThemeToggleBtn />
          {/* User Profile (Desktop & Mobile) */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowLogout(!showLogout)}
              >
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full border-2 border-primary-custom hover:border-accent-custom transition-colors"
                />
                <span className="hidden sm:block text-base-content font-medium max-w-24 truncate">
                  {user.displayName || "User"}
                </span>
                <svg
                  className={`w-4 h-4 text-primary transition-transform ${
                    showLogout ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {showLogout && (
                <div className="absolute top-12 right-0 bg-base-100 dark:bg-neutral border border-accent rounded-lg shadow-xl py-2 min-w-40 z-20">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-base-content truncate">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-base-content/70 truncate">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-primary-custom hover:text-accent-custom transition-colors p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle mobile menu"
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-secondary dark:bg-neutral border-t border-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <ul className="flex flex-col space-y-3 text-base font-semibold">
              {navLinks}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
