import {
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Button,
  Center,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import ModalJoinClass from "./ModalJoinClass";
const ActionMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex justify-end mb-4 p-2 items-center">
      <div className="mr-4">
        <Menu>
          <MenuButton as={Button} colorScheme="blue">
            Choir
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuGroup defaultValue="asc" title="Conduct">
              <MenuItem value="asc">
                <Link href="/classrooms">Start a New Class</Link>
              </MenuItem>
              <MenuItem value="desc">
                <Link href="/schedule">Schedule a New Class</Link>
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Participate">
              <MenuItem value="all">
                <Link href="/classrooms">Upcoming Classes</Link>
              </MenuItem>
              <MenuItem onClick={onOpen}>Join a Class</MenuItem>
              <MenuItem value="phone">
                <Link href="/classrooms">View Payments</Link>
              </MenuItem>
              <MenuItem value="country">My Preferences</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </div>
      <Center height="30px">
        <Divider orientation="vertical" />
      </Center>
      <div className="ml-4">
        <UserButton afterSignOutUrl="/" />
      </div>
      <ModalJoinClass isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default ActionMenu;
