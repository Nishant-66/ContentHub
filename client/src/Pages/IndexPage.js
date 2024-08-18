import {Post} from "../Post";
import {useEffect, useState} from "react";

export function IndexPage() {
  // State to hold the list of posts fetched from the server
  const [posts, setPosts] = useState([]);

  // Fetch the list of posts when the component mounts
  useEffect(() => {
    fetch('http://localhost:4000/api/blogs/posts')
      .then(response => {
        // Parse the JSON response and update the posts state
        response.json().then(posts => {
          setPosts(posts);
        });
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <>
      {/* Check if there are any posts, then map over them to render each Post component */}
      {posts.length > 0 && posts.map(post => (
        <Post key={post._id} {...post} /> // Spread the post object as props to the Post component
      ))}
    </>
  );
}
