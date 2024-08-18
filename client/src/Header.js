import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "./UserContext";

// Header component to display navigation and user information
export default function Header() {
  // Access setUserInfo and userInfo from UserContext
  const {setUserInfo, userInfo} = useContext(UserContext);

  // Fetch user profile information on component mount
  useEffect(() => {
    fetch('http://localhost:4000/api/user/profile', {
      credentials: 'include', // Include cookies in the request
    })
      .then(response => response.json()) // Parse JSON response
      .then(userInfo => {
        setUserInfo(userInfo); // Update userInfo in context
      });
  }, [setUserInfo]); // Dependency array to avoid unnecessary re-fetching

  // Function to handle user logout
  function logout() {
    fetch('http://localhost:4000/api/user/logout', {
      credentials: 'include', // Include cookies in the request
      method: 'POST', // Send a POST request to log out
    });
    setUserInfo(null); // Clear userInfo from context
  }

  // Extract username from userInfo
  const username = userInfo?.username;

  return (
    <header>
      {/* Link to the homepage */}
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {/* Conditional rendering based on user login status */}
        {username ? (
          <>
            {/* Links for logged-in users */}
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        ) : (
          <>
            {/* Links for guests */}
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
