import { Avatar } from "@mui/material";
import { Author } from "../types/Author";

/**
 * Avatar showing the profile image of an author
 */
export default function UserAvatar({ author }: { author?: Author }) {
  if (!author) return <Avatar alt="Deleted User">DU</Avatar>;
  return <Avatar alt={author.login} src={author.avatarUrl} />;
}
