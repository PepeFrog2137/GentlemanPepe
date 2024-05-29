"use client";

import { useEffect, useState } from "react";
import WithSubnavigation from "./components/Header/Header";
import PieChart from "./components/PieChart/PieChart";
import Providers from "./components/Providers";
import Smoke from "./components/Smoke/Smoke";
import usePriceData from "./hooks/usePriceData";
import useWebSocket from "./hooks/useWebSocket";
import styles from "./page.module.css";
import {
  Image,
  Flex,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Text,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  useColorModeValue,
  useToast,
  ToastId,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";

// {
//   "signature": "67TRgPZ3VNy2A7m9vcEmkJJUgSkKJTUdJjrqcHvL8QkLhBfC7gdU58dVkCdWjMxNSGHM9ZNtpckjuyAj6zE12Zip",
//   "mint": "2eqLPH8CXv8MwNtMkK3tMuezPBRs4ZvoFkxDNLWpaCgE",
//   "traderPublicKey": "88b2QfYQwhvn3qo7VqwJLk3ULT3DvuUG6F4y8CG2XLpH",
//   "txType": "buy",
//   "tokenAmount": 2280931.697856,
//   "newTokenBalance": 2280931.697856,
//   "bondingCurveKey": "H5DtS68x5JQSsvovJPjFyx1XRPmV9MJ5nbfJMVcufRC6",
//   "vTokensInBondingCurve": 385918027.790921,
//   "vSolInBondingCurve": 83.41149591860889,
//   "marketCapSol": 216.13785807331809
// }

// {
//   "SOL": {
//       "id": "So11111111111111111111111111111111111111112",
//       "mintSymbol": "SOL",
//       "vsToken": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
//       "vsTokenSymbol": "USDC",
//       "price": 169.384698801
//   }
// }

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isFirst, setIsFirst] = useState();
  const toast = useToast();
  const pumpFun = useWebSocket("wss://pumpportal.fun/api/data");
  const pumpFunData = pumpFun?.data;
  const { data } = usePriceData();
  const solDataPrice = data?.SOL?.price;
  console.log(data, pumpFunData);
  const allTokens = 1000000000;
  const calculateMCInDollars = pumpFunData?.marketCapSol * solDataPrice;
  const OneTokenPrizeInDollars = calculateMCInDollars / allTokens;
  const transactionAmmountInDollars =
    pumpFunData?.tokenAmount * OneTokenPrizeInDollars;
  const transcationAmmountInSol = transactionAmmountInDollars / solDataPrice;
  const [seconds, setSeconds] = useState(0);
  const toastIdRef = React.useRef<ToastId>('');
  const isMobile =  false;

  console.log(
    calculateMCInDollars,
    transactionAmmountInDollars,
    transcationAmmountInSol,
    "gg"
  );
  const handleTimerTick = () => {
    setSeconds((prevSeconds) => prevSeconds + 1);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (pumpFunData && transcationAmmountInSol) {
      toast.closeAll();
      setSeconds(0);
      timer = setInterval(handleTimerTick, 1000);
      if (seconds === 0) {
        toastIdRef.current = toast({
          position: "bottom-right",
          title: pumpFunData?.txType === "buy" ? "BUY" : "SELL",
          description: `${transcationAmmountInSol.toFixed(5)} SOL`,
          status: pumpFunData?.txType === "buy" ? "success" : "error",
          duration: 500000,
          isClosable: true,
        });
      }
    }
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pumpFunData, transcationAmmountInSol]);

  useEffect(() => {
    if (seconds > 0) {
      toast.update(toastIdRef.current, {
        position: "bottom",
        description: `${transcationAmmountInSol.toFixed(
          5
        )} SOL - ${seconds}s`,
        status: pumpFunData?.txType === "buy" ? "success" : "error",
        duration: 500000,
        isClosable: true,
        title: pumpFunData?.txType === "buy" ? "BUY" : "SELL",
      });
    }
  },[seconds, toast]);

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
            <WithSubnavigation onOpen={onOpen} />
          </Box>
          <Box position="absolute" w="150px" h="60px"></Box>
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
              justifyContent={{ base: "center", md: "center" }}
              flexDirection={{ base: "row", md: "column" }}
              alignItems="flex-end"
              zIndex="50"
              gap="25px"
              height="100vh"
              width="100%"
              mr={{ base: "0", md: "50px" }}
              boxSizing="border-box"
              mb="250px"
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                w="80px"
                h="80px"
                transition="ease 1s"
                className={`${styles.box} ${styles.shadow}`}
                _hover={{
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
                zIndex="1000"
                transition="ease 1s"
                className={`${styles.box} ${styles.shadow}`}
                _hover={{
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
                  alt="pepe"
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
                alt="pepe reflection"
                bg="black"
                opacity={0.8}
                w="100%"
                height="100%"
              />
            </Flex>
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay
              zIndex={5}
              bg="rgba(0, 0, 0, 0.75)"
              overflowX="hidden"
            />
            <ModalContent
              zIndex={10}
              style={{ pointerEvents: "auto" }}
              boxShadow={`0px 0px 8px 0px #ffffff`}
              bg={useColorModeValue("#0F242E", "gray.900")}
              color="#fff"
              h="auto"
              minWidth={{ base: "400px", md: "700px" }}
            >
              <ModalHeader>Tokenomics</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <PieChart />
              </ModalBody>
            </ModalContent>
          </Modal>
        </main>
      </Box>
    </Providers>
  );
}
