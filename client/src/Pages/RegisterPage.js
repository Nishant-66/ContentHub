import {useState} from "react";

// RegisterPage component for handling user registration
export default function RegisterPage() {
  // State hooks for username and password input fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  async function register(ev) {
    ev.preventDefault(); // Prevent the default form submission behavior

    // Send a POST request to the server to register the user
    const response = await fetch('http://localhost:4000/api/user/register', {
      method: 'POST',
      body: JSON.stringify({username, password}), // Send the username and password as JSON
      headers: {'Content-Type': 'application/json'}, // Set the request headers
    });

    // Check the response status and alert the user accordingly
    if (response.status === 200) {
      alert('Registration successful');
    } else {
      alert('Registration failed');
    }
  }

  // JSX for the registration form
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}/> {/* Input field for username */}
      <input type="password"
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/> {/* Input field for password */}
      <button>Register</button> {/* Submit button for registration */}
    </form>
  );
}
