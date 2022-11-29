import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React, { useCallback, useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import Post from "./components/Post";
import { APIRes, PostByUser, State } from "./types";
import { formatData } from "./utils";

const URL = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const [state, setState] = useState<State>({
    postsByUser: {},
    selectedUser: "",
  });

  const fetchPosts = useCallback(async () => {
    const data = await fetch(URL);
    const jsonData: APIRes[] = await data.json();
    setState({ ...state, postsByUser: formatData(jsonData) });
  }, [state, setState]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const renderPostList = (userId: string, obj: PostByUser) => {
    return obj[userId].map((post, index) => {
      const isLast = index === obj[userId].length - 1;
      return (
        <List sx={{ mx: 2 }} key={`${post.userId}-${post.id}-${post.title}`}>
          <Post title={post.title} body={post.body} />
          {!isLast ? <Divider /> : null}
        </List>
      );
    });
  };

  const handleListItemClick = (ev: React.MouseEvent, userId: string) => {
    const isAlreadySelected = userId === state.selectedUser;
    setState({
      ...state,
      selectedUser: isAlreadySelected ? "" : userId,
    });
  };
  return (
    <>
      <Typography variant="h1">Fetch data from JSON Placeholder API</Typography>
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={ListHeader}
      >
        {Object.keys(state.postsByUser).map((userId, index) => {
          const isSelected = state.selectedUser === userId;

          return (
            <>
              <ListItemButton
                key={`${index}.${userId}`}
                onClick={(ev) => handleListItemClick(ev, userId)}
                selected={isSelected}
              >
                <ListItemText primary={`UserId ${userId}`} />
                {isSelected ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={isSelected} timeout="auto" unmountOnExit>
                {renderPostList(userId, state.postsByUser)}
              </Collapse>
            </>
          );
        })}
      </List>
    </>
  );
}

export default App;
