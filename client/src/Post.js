import {formatISO9075} from "date-fns";
import {Link} from "react-router-dom";

// Post component to display a single post
export function Post({_id, title, summary, cover, content, createdAt, author}) {

  return (
    <div className="post">
      <div className="image">
        {/* Link to the detailed view of the post */}
        <Link to={`/post/${_id}`}>
          {/* Display the cover image of the post */}
          <img src={cover} alt="Post cover"/>
        </Link>
      </div>
      <div className="texts">
        {/* Link to the detailed view of the post */}
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2> {/* Post title */}
        </Link>
        <p className="info">
          {/* Display the author's username */}
          <a className="author">{author.username}</a>
          {/* Display the post's creation date */}
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        {/* Display the summary of the post */}
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
