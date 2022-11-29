import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { APIRes, PostByUser, State } from "./types";
import { formatData } from "./utils";

const URL = "https://jsonplaceholder.typicode.com/posts";

const ListHeader = (
  <ListSubheader component="div" id="nested-list-subheader">
    <Typography>Posts by UserId</Typography>
  </ListSubheader>
);

function App() {
  const [state, setState] = useState<State>({
    postsByUser: {},
    selectedUser: "",
  });

  const fetchPosts = async () => {
    const data = await fetch(URL);
    const jsonData: APIRes[] = await data.json();
    setState({ ...state, postsByUser: formatData(jsonData) });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderPost = (title: string, body: string) => {
    return (
      <>
        <Typography variant="h5">{title}</Typography>
        <Typography paragraph>{body}</Typography>
      </>
    );
  };

  const renderPostList = (userId: string, obj: PostByUser) => {
    // if (!obj.hasOwnProperty(userId)) {
    //   return null;
    // }

    return obj[userId].map((post) => (
      <List sx={{ ml: 4 }} key={`${post.userId}-${post.id}-${post.title}`}>
        {renderPost(post.title, post.body)}
      </List>
    ));
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
        sx={{ width: "100%", maxWidth: 900, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={ListHeader}
      >
        {Object.keys(state.postsByUser).map((userId, index) => {
          const isSelected = state.selectedUser === userId;

          return (
            <ListItemButton
              key={`${index}.${userId}`}
              onClick={(event) => handleListItemClick(event, userId)}
              selected={isSelected}
            >
              <ListItemText primary={`UserId ${userId}`} />
              {isSelected ? <ExpandLess /> : <ExpandMore />}
              <Collapse in={isSelected} timeout="auto" unmountOnExit>
                {renderPostList(userId, state.postsByUser)}
              </Collapse>
            </ListItemButton>
          );
        })}
      </List>
    </>
  );
}

export default App;
