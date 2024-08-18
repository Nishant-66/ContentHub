import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../Editor";

// EditPost component for editing an existing post
export default function EditPost() {
  const {id} = useParams(); // Extract post ID from URL parameters
  const [title, setTitle] = useState(''); // State for post title
  const [summary, setSummary] = useState(''); // State for post summary
  const [content, setContent] = useState(''); // State for post content
  const [files, setFiles] = useState(''); // State for file uploads
  const [redirect, setRedirect] = useState(false); // State for redirection

  // Fetch post data when the component mounts
  useEffect(() => {
    fetch('http://localhost:4000/api/blogs/post/' + id)
      .then(response => response.json()) // Parse JSON response
      .then(postInfo => {
        setTitle(postInfo.title); // Set state with fetched data
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
  }, [id]); // Dependency array includes 'id' to refetch if 'id' changes

  // Function to handle post update submission
  async function updatePost(ev) {
    ev.preventDefault(); // Prevent default form submission behavior
    const data = new FormData(); // Create a FormData object to handle file uploads
    data.set('title', title); // Add title, summary, content, and ID to FormData
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]); // Add file to FormData if present
    }
    const response = await fetch('http://localhost:4000/api/blogs/post'+id, {
      method: 'PUT', // Use PUT method to update post
      body: data, // Send FormData in the request body
      credentials: 'include', // Include cookies in the request
    });
    if (response.ok) {
      setRedirect(true); // Set redirect to true if update is successful
    }
  }

  // Redirect to the updated post page if redirect is true
  if (redirect) {
    return <Navigate to={'/post/' + id} />;
  }

  // JSX for the edit post form
  return (
    <form onSubmit={updatePost}>
      <input type="text"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} /> {/* Input for post title */}
      <input type="text"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} /> {/* Input for post summary */}
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} /> {/* Input for file upload */}
      <Editor onChange={setContent} value={content} /> {/* Editor component for post content */}
      <button style={{marginTop: '5px'}}>Update post</button> {/* Submit button */}
    </form>
  );
}
