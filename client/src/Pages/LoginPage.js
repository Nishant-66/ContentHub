import {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import {UserContext} from "../UserContext";

// LoginPage component for handling user login
export default function LoginPage() {
  // State hooks for username, password, and redirect flag
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  // Access setUserInfo function from UserContext to update user information globally
  const {setUserInfo} = useContext(UserContext);

  // Function to handle form submission
  async function login(ev) {
    ev.preventDefault(); // Prevent the default form submission behavior

    // Send a POST request to the server to log in the user
    const response = await fetch('http://localhost:4000/api/user/login', {
      method: 'POST',
      body: JSON.stringify({username, password}), // Send the username and password as JSON
      headers: {'Content-Type': 'application/json'}, // Set the request headers
      credentials: 'include', // Include credentials such as cookies in the request
    });

    // If the login is successful, update user information and set the redirect flag
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo); // Store the user information in the context
        setRedirect(true); // Set redirect flag to true to navigate to the home page
      });
    } else {
      alert('Wrong credentials'); // Alert the user if login fails
    }
  }

  // If redirect is true, navigate to the home page
  if (redirect) {
    return <Navigate to={'/'} />
  }

  // JSX for the login form
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}/> {/* Input field for username */}
      <input type="password"
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/> {/* Input field for password */}
      <button>Login</button> {/* Submit button for login */}
    </form>
  );
}
