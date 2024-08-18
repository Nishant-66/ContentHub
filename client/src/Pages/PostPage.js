import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {formatISO9075} from "date-fns";
import {UserContext} from "../UserContext";
import {Link} from 'react-router-dom';

export default function PostPage() {
  // State to hold the fetched post information
  const [postInfo, setPostInfo] = useState(null);

  // Accessing the logged-in user's information from the context
  const {userInfo} = useContext(UserContext);

  // Getting the post ID from the URL parameters
  const {id} = useParams();

  // Fetch the post data when the component mounts or when the post ID changes
  useEffect(() => {
    fetch(`http://localhost:4000/api/blogs/post/${id}`)
      .then(response => {
        // Parse the JSON response and update the postInfo state
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });
  }, [id]); // Dependency array includes 'id' to refetch data if the ID changes

  // If postInfo is still null (data not yet loaded), return an empty string to avoid rendering
  if (!postInfo) return '';

  return (
    <div className="post-page">
      {/* Display the post title */}
      <h1>{postInfo.title}</h1>

      {/* Display the formatted creation date of the post */}
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>

      {/* Display the author's username */}
      <div className="author">by @{postInfo.author.username}</div>

      {/* Conditionally render the Edit button if the logged-in user is the author of the post */}
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit this post
          </Link>
        </div>
      )}

      {/* Display the cover image for the post */}
      <div className="image">
        <img src={postInfo.cover} alt=""/>
      </div>

      {/* Display the post content, allowing HTML rendering */}
      <div className="content" dangerouslySetInnerHTML={{__html: postInfo.content}} />
    </div>
  );
}
