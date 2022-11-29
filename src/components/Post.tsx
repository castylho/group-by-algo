import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Post = ({ title, body }: { title: string; body: string }) => (
  <Box>
    <Typography variant="h5">{title}</Typography>
    <Typography paragraph>{body}</Typography>
  </Box>
);

export default Post;
