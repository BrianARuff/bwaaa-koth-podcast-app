import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const name = watch("name");
  const email = watch("email");

  const queryClient = useQueryClient();

  const {
    data: postUserData,
    isError,
    isLoading,
    mutate,
  } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: uuid(),
          name,
          email,
        }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/users"], (oldData: any) => {
        return {
          users: [...oldData.users, data.user],
        };
      });
    },
  });

  const onSubmit = () => mutate();

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Flex
      as="form"
      w="100%"
      maxW={["100%", "100%", "100%", "100%", "750px"]}
      minW={["100%", "100%", "100%", "100%", "300px"]}
      flexDir={"column"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl mt={4} isInvalid={Boolean(errors.name)}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          w="100%"
          placeholder="Name"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <FormHelperText mb="3">
            <FormErrorMessage>Password is required</FormErrorMessage>
          </FormHelperText>
        )}
      </FormControl>

      <FormControl mt={4} isInvalid={Boolean(errors.email)}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          width={"100%"}
          placeholder="Email Address"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <FormHelperText mb="3">
            <FormErrorMessage>Email is required</FormErrorMessage>
          </FormHelperText>
        )}
      </FormControl>

      <FormControl mt={4} isInvalid={Boolean(Object.entries(errors).length)}>
        <Button
          disabled={Boolean(Object.entries(errors).length)}
          bgColor={"green.300"}
          w="100%"
          type="submit"
        >
          Submit
        </Button>
      </FormControl>
    </Flex>
  );
}
