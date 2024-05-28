import WithSubnavigation from "./components/Header/Header";
import Providers from "./components/Providers";
import Smoke from "./components/Smoke/Smoke";
import styles from "./page.module.css";
import { Image, Flex, Box, Button } from "@chakra-ui/react";

export default function Home() {
  return (
    <Providers>
      <Box
        zIndex="50"
        h="100vh"
        w="100%"
        justifyContent="center"
        alignItems="center"
        boxSizing="border-box"
        overflow="hidden"
        bg="black"
      >
        <main className={styles.main}>
          <Box zIndex="25" position="relative">
            <WithSubnavigation />
          </Box>
          <Flex
            h="100vh"
            w="100%"
            justifyContent="center"
            alignItems="center"
            boxSizing="border-box"
            overflow="hidden"
            bg="black"
            flexDirection="column"
          >
            <Flex
              justifyContent={{base: "center", md: "center"}}
              flexDirection={{base: "row", md: "column"}}
              alignItems="flex-end"
              zIndex="50"
              gap="25px"
              height="100vh"
              width="100%"
              mr={{base: "0", md: "50px"}}
              boxSizing="border-box"
              mb="250px"
            >
              <Flex
              justifyContent="center"
              alignItems="center"
                w="80px"
                h="80px"
                className={`${styles.box} ${styles.shadow}`}
                _hover={{
                  transition: "ease 1s",
                  transform: "scale(1.1)",
                  backgroundColor: "transparent",
                }}
              >
                <Button
                p="0"
                  bg="transparent"
                  _hover={{
                    backgroundColor: "transparent",
                  }}
                >
                  <Image src="/X.png" w="80px" h="80px" alt="x" />
                </Button>
              </Flex>
              <Flex
              justifyContent="center"
              alignItems="center"
                w="auto"
                h="80px"
                className={`${styles.box} ${styles.shadow}`}
                _hover={{
                  transition: "ease 1s",
                  transform: "scale(1.1)",
                  backgroundColor: "transparent",
                }}
              >
                <Button
                m="0"
                p="0"
                  bg="transparent"
                  _hover={{
                    backgroundColor: "transparent",
                  }}
                >
                  <Image src="/telegram.png" w="80px" h="80px" alt="telegram" />
                </Button>
              </Flex>
            </Flex>
            <Flex
              h="100vh"
              w="100%"
              justifyContent="center"
              alignItems="center"
              position="absolute"
              bottom="0"
              overflow="hidden"
            >
              <Flex flexDirection="column">
                <Image
                  position="relative"
                  top="70px"
                  src="/pepe.png"
                  alt="Vercel Logo"
                  w={{ lg: "800px", md: "500px", base: "300px" }}
                  h={{ lg: "800px", md: "500px", base: "300px" }}
                  zIndex="5"
                />
                <Smoke />
              </Flex>
              <Image
                zIndex="1"
                position="absolute"
                src="/reflections.jpg"
                alt="Vercel Logo"
                bg="black"
                opacity={0.8}
                w="100%"
                height="100%"
              />
            </Flex>
          </Flex>
        </main>
      </Box>
    </Providers>
  );
}
