"use client";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import "./Header.css";

export default function WithSubnavigation({
  onOpen,
  onOpen2,
}: {
  onOpen: () => void;
  onOpen2: () => void;
}) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        className="header"
        color={useColorModeValue("gray", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            color="white"
            onClick={onToggle}
            _hover={{ backgroundColor: "transparent" }}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          alignItems="center"
        >
          <Box h="50px" minW="240px">
            <Image alt="gentleman" src="/text.png" h="50px" minW="240px" />
          </Box>
          <Flex
            display={{ base: "none", md: "flex" }}
            ml={10}
            gap="25px"
            alignItems="center"
          >
            <Button
              bg="transparent"
              _hover={{ backgroundColor: "transparent", color: "gray.200" }}
              p="0"
              color="white"
              onClick={() => onOpen()}
            >
              Tokenomics
            </Button>
            <Button
              bg="transparent"
              _hover={{ backgroundColor: "transparent", color: "gray.200" }}
              p="0"
              color="white"
              onClick={() => onOpen2()}
            >
              Roadmap
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav onOpen={onOpen} onOpen2={onOpen2} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.200", "gray.200");
  const linkHoverColor = useColorModeValue("gray.200", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                zIndex="100"
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      zIndex="60"
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = ({
  onOpen,
  onOpen2,
}: {
  onOpen: () => void;
  onOpen2: () => void;
}) => {
  return (
    <>
      <Stack
        bg={useColorModeValue("gray.200", "gray.800")}
        p={4}
        display={{ md: "none" }}
      >
        <Button
          bg="transparent"
          _hover={{ backgroundColor: "transparent", color: "gray.200" }}
          p="0"
          color="gray.700"
          onClick={() => onOpen()}
        >
          Tokenomics
        </Button>
      </Stack>
      <Stack
        bg={useColorModeValue("gray.200", "gray.800")}
        p={4}
        display={{ md: "none" }}
      >
        <Button
          bg="transparent"
          _hover={{ backgroundColor: "transparent", color: "gray.200" }}
          p="0"
          color="gray.700"
          onClick={() => onOpen2()}
        >
          Roadmap
        </Button>
      </Stack>
    </>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Token",
    children: [
      {
        label: "Tokenomics",
        subLabel:
          "The economic framework of our token's creation, distribution, and utility",
        href: "#",
      },
      {
        label: "??????",
        subLabel: "??????????",
        href: "#",
      },
    ],
  },
  {
    label: "?",
    children: [
      {
        label: "?",
        subLabel: "?",
        href: "#",
      },
    ],
  },
];
