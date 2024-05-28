import "./Smoke.css";
import { Box, Image } from "@chakra-ui/react";

const Smoke = () => {
  return (
    <Box
      position="absolute"
      zIndex={10}
      transform={{
        lg: "translate(140px,-69px)",
        md: "translate(50px,-100px)",
        base: "translate(-10px, -115px)",
      }}
      h="230px"
      w="230px"
    >
      <Box className="smoke-wrap" zIndex={10}>
        <Image
          className="smoke"
          src="/smoke4.png"
          alt="smoke"
          h="230px"
          w="230px"
        />
      </Box>
      <Box className="smoke-wrap">
        <Image
          className="smoke2"
          src="/smoke4.png"
          alt="smoke"
          h="230px"
          w="230px"
        />
      </Box>
      <Box className="smoke-wrap">
        <Image
          className="smoke3"
          src="/smoke4.png"
          alt="smoke"
          h="230px"
          w="230px"
        />
      </Box>
    </Box>
  );
};

export default Smoke;
