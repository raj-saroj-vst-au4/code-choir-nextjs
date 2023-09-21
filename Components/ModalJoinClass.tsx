"use client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const ModalJoinClass = ({ isOpen, onClose }) => {
  const [classid, setclassid] = useState();
  const [validating, setValidating] = useState(false);
  const handleInputChange = (event) => {
    setclassid(event.target.value);
  };

  //   validate from backend pending
  const handleJoinClass = () => {
    setValidating(true);
    setTimeout(() => {
      setValidating(false);
    }, 2000);
  };
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
    >
      <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
      <ModalContent>
        <ModalHeader>Join Classroom</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Enter the session ID "
            value={classid}
            onChange={(e) => handleInputChange(e)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={validating}
            rightIcon={<AiOutlineArrowRight />}
            colorScheme="blue"
            mr={3}
            variant="outline"
            onClick={handleJoinClass}
          >
            Validate & Join
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalJoinClass;
