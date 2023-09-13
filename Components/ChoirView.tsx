import { Box, Image } from "@chakra-ui/react";

const ChoirView = () => {
  return (
    <Box>
      <div className="sm:hidden">
        <Image
          borderRadius="full"
          boxSize="240px"
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
        />
      </div>
    </Box>
  );
};

export default ChoirView;
