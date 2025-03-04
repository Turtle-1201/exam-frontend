import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
const API_URL = import.meta.env.VITE_API_URL;

export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/logout`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <>
      <header>
        <nav>
          <Link to="/" className="nav-link">
            Home
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <p className="text-slate-400 text-xs">Welcome back {user.name}</p>
              <Link to="/create" className="nav-link">
                New Post
              </Link>

              <Link to={`/update-user/${user.id}`} className="nav-link">
                Update Profile
              </Link>
              <form onSubmit={handleLogout}>
                <button className="nav-link">Logout</button>
              </form>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/register" className="nav-link">
                Register
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </div>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
