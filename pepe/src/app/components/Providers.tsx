'use client'

import { ChakraProvider } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react";
import { ReactNode } from "react";

const theme = extendTheme({});

function Providers({ children }: { children: ReactNode}) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  );
}

export default Providers;