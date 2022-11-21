import { List, ListItem } from "@chakra-ui/react";
import { User } from "../pages/api/users";

export default function UserList({ users }: { users: User[] }) {
  return (
    <List>
      {users.map((user) => (
        <ListItem key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <hr />
        </ListItem>
      ))}
    </List>
  );
}
