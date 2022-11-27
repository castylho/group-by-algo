import React, { useEffect, useState } from "react";
import { APIRes, PostByUser, State } from "./types";
import { formatData } from "./utils";

const URL = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const [state, setState] = useState<State>({
    postsByUser: {},
  });

  const fetchPosts = async () => {
    const data = await fetch(URL);
    const jsonData: APIRes[] = await data.json();
    setState({ postsByUser: formatData(jsonData) });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderPost = (propName: string, obj: PostByUser) => {
    if (!obj.hasOwnProperty(propName)) {
      return null;
    }

    return obj[propName].map((post) => (
      <div key={`${post.userId}-${post.id}-${post.title}`}>
        <p>PostId - {post.id}</p>
        <p>{post.title}</p>
        <span>{post.body}</span>
      </div>
    ));
  };

  // Add MUI (List, ListItem)
  // onclick function to open posts from userId
  // selected prop to highlight userId (selectedUserId === userId)
  return (
    <>
      <h1>Fetch data from JSON Placeholder API</h1>
      <ul>
        {Object.keys(state.postsByUser).map((userId, index) => (
          <li key={`${index}.${userId}`}>
            UserId {userId}
            {renderPost(userId, state.postsByUser)}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
