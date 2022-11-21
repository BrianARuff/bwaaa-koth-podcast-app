import { Box, Flex, List, ListItem } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { User } from "../pages/api/users";

const fetchUsers = async () => {
  const res = await fetch("/api/users");
  return res.json();
};

const UserList = () => {
  const { isError, isLoading, data } = useQuery({
    queryKey: ["/api/users"],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (isError) {
    return <Box>Error</Box>;
  }

  return (
    <List px="25px" w="100%">
      <h1>Users</h1>
      users
      {data?.users?.map((user: User) => (
        <ListItem py="12px" px="25px" key={user.id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <hr />
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
