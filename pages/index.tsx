import { Flex, List, ListItem, Text } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "../components/RegisterForm";
import UserList from "../components/UsersList";

export default function Home() {
  return (
    <Flex
      as="main"
      flexDir={"column"}
      justifyContent="center"
      alignItems={"center"}
      alignContent="center"
      w="100%"
    >
      <Head>
        <title>BWAAA! a King of the Hill Podcast</title>
        <meta name="description" content="BWAAA! a King of the Hill Podcast" />
        <link rel="icon" href="/favicon.ico" />
        {/* twitter meta link */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KOTH_Podcast" />
        <meta name="twitter:creator" content="@KOTH_Podcast" />
        <meta name="twitter:title" content="@KOTH_Podcast" />
        <meta
          name="twitter:description"
          content="BWAAA! a King of the Hill Podcast"
        />
        <meta
          name="twitter:image"
          content="https://pbs.twimg.com/profile_banners/4008673220/1452974077/1500x500"
        />
      </Head>
      <Flex
        bg={"#333"}
        p={4}
        color={"#fff"}
        justifyContent={"space-between"}
        alignItems={"center"}
        as="nav"
        w="100%"
      >
        <Flex w="100%" className="icon">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="BWAAA! a King of the Hill Podcast Logo"
              width={50}
              height={50}
            />
          </Link>
        </Flex>
        <Flex w="100%">
          <Text as="h1">BWAAA! King of the Hill Podcast</Text>
        </Flex>
        <List display="flex" justifyContent={"flex-end"} flexDir="row">
          <ListItem mr={4}>
            <Link
              target={"_blank"}
              href="https://twitter.com/KOTH_Podcast"
              passHref
            >
              Twitter
            </Link>
          </ListItem>
          <ListItem mr={4}>
            <Link
              target={"_blank"}
              href="https://www.instagram.com/bwaaakoth/"
              passHref
            >
              Instagram
            </Link>
          </ListItem>
        </List>
      </Flex>
      <RegisterForm />
      <UserList />
    </Flex>
  );
}
