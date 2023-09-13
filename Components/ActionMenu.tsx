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
} from "@chakra-ui/react";
import { UserButton } from "@clerk/nextjs";
const ActionMenu = () => {
  return (
    <div className="flex justify-end mb-4 p-2 items-center">
      <div className="mr-4">
        <Menu>
          <MenuButton as={Button} colorScheme="blue">
            Choir
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuGroup defaultValue="asc" title="Tutors">
              <MenuItem value="asc">Start a New Class</MenuItem>
              <MenuItem value="desc">Schedule a New Class</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Students">
              <MenuItem value="email">Upcoming Classes</MenuItem>
              <MenuItem value="phone">View Payments</MenuItem>
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
    </div>
  );
};

export default ActionMenu;
