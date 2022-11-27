import React, { useEffect, useState } from "react";

const URL = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const [state, setState] = useState({
    postsByUser: {},
  });

  const fetchPosts = async () => {
    const data = await fetch(URL);
    const jsonData = await data.json();
    console.log(jsonData);

    // setState({ postsByUser: formatData(jsonData) });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Add MUI (List, ListItem)
  // onclick function to open posts from userId
  // selected prop to highlight userId (selectedUserId === userId)
  return (
    <>
      <h1>Fetch data from JSON Placeholder API</h1>
      {JSON.stringify(state.postsByUser)}
    </>
  );
}

export default App;
