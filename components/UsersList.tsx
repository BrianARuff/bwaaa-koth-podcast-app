import {
  Box,
  Flex,
  List,
  ListItem,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { User } from "../pages/api/users";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  SortingFns,
  SortingState,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";
import React, { useReducer, useState } from "react";
import { spawn } from "child_process";

const fetchUsers = async () => {
  const res = await fetch("/api/users");
  return res.json();
};

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
];

const UserList = () => {
  const {
    isError,
    isLoading,
    data: usersData,
  } = useQuery({
    queryKey: ["/api/users"],
    queryFn: fetchUsers,
  });

  // const rerender = useReducer(() => ({}), {})[1];

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: usersData?.users ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  if (isLoading) {
    return <Box mt={4}>Loading users...</Box>;
  }

  if (isError) {
    return <Box mt={4}>Error fetching users, try again by refreshing page</Box>;
  }

  return (
    <Flex w="100%" maxW={"800px"} minW="300px" p={2}>
      <Table borderX={"1px solid black"} borderY="1px solid black" w="100%">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  onClick={header.column.getToggleSortingHandler()}
                  key={header.id}
                >
                  {header.isPlaceholder ? null : (
                    <>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === "asc" ? (
                        <Text
                          ml="1"
                          as="span"
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                            },
                          }}
                        >
                          ▲
                        </Text>
                      ) : header.column.getIsSorted() === "desc" ? (
                        <Text
                          ml="1"
                          as="span"
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                            },
                          }}
                        >
                          ▼
                        </Text>
                      ) : (
                        <Text
                          ml="1"
                          as="span"
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                            },
                          }}
                        >
                          &#10145;
                        </Text>
                      )}
                      {console.log(
                        "header.column.getIsSorted()",
                        header.column.getIsSorted()
                      )}
                    </>
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <>
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
              {console.log("row")}
            </>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th colSpan={table.getRowModel().rows.length}>
              <Flex justifyContent="space-between">
                <Box>
                  Showing {table.getRowModel().rows.length} of{" "}
                  {table.getRowModel().rows.length} results
                </Box>
              </Flex>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </Flex>
  );

  // return (
  //   <List p={4} w="100%">
  //     <h1>Users</h1>
  //     users
  //     {data?.users?.map((user: User) => (
  //       <ListItem py="12px" px="25px" key={user.id}>
  //         <p>{user.name}</p>
  //         <p>{user.email}</p>
  //         <hr />
  //       </ListItem>
  //     ))}
  //   </List>
  // );
};

export default UserList;
