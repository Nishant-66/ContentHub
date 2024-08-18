// import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {Navigate} from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  // State to manage the form inputs and redirect
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  // Function to handle form submission
  async function createNewPost(ev) {
    ev.preventDefault(); // Prevent the default form submission behavior

    // Create a FormData object to handle form data and file uploads
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]); // Assuming files is an array and we use the first file

    // Send a POST request to the server with the form data
    const response = await fetch('http://localhost:4000/api/blogs/post', {
      method: 'POST',
      body: data,
      credentials: 'include', // Include cookies with the request
    });

    // Redirect to the home page if the request was successful
    if (response.ok) {
      setRedirect(true);
    }
  }

  // Redirect to the home page if redirect state is true
  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form onSubmit={createNewPost}>
      {/* Input field for the post title */}
      <input
        type="text" // Corrected type from "title" to "text"
        placeholder={'Title'}
        value={title}
        onChange={ev => setTitle(ev.target.value)} 
      />
      {/* Input field for the post summary */}
      <input
        type="text" // Corrected type from "summary" to "text"
        placeholder={'Summary'}
        value={summary}
        onChange={ev => setSummary(ev.target.value)} 
      />
      {/* File input for uploading files */}
      <input
        type="file"
        onChange={ev => setFiles(ev.target.files)} 
      />
      {/* Rich text editor for the post content */}
      <Editor value={content} onChange={setContent} />
      {/* Submit button for creating the post */}
      <button style={{marginTop:'5px'}}>Create post</button>
    </form>
  );
}
