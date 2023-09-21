"use client";
import ActionMenu from "@/Components/ActionMenu";
import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Input,
  PinInput,
  PinInputField,
  Radio,
  RadioGroup,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

const steps = [
  { title: "First", description: "About Session" },
  { title: "Second", description: "Date & Time" },
  { title: "Third", description: "Participants & Share" },
];

const Schedule = () => {
  const toast = useToast();
  const [msg, setMsg] = useState();
  const [value, setValue] = React.useState("1");
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });
  return (
    <div className="p-4">
      <ActionMenu />
      <div className="p-12 text-white">
        <Stepper size="lg" index={activeStep}>
          {steps.map((step, index) => (
            <Step key={index} onClick={() => setActiveStep(index)}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription className="text-slate-300">
                  {step.description}
                </StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        <section className="flex justify-center items-center h-96 mt-8 pt-5">
          <div className={activeStep === 1 ? "block" : "hidden"}>
            <h2 className="text-3xl font-bold text-center mb-3">Class Topic</h2>
            <Input variant="filled" placeholder="ex:- Javascript Hoisting" />
            <h2 className="text-3xl font-bold text-center mt-6 mb-2">
              Programming Language
            </h2>
            <RadioGroup onChange={setValue} value={value}>
              <Stack direction="row">
                <Radio value="1">JavaScript</Radio>
                <Radio value="2">Python</Radio>
                <Radio value="3">C</Radio>
                <Radio value="4">Java</Radio>
                <Radio value="5">SQL</Radio>
                <Radio value="6">Rust</Radio>
              </Stack>
            </RadioGroup>
            <h2 className="text-3xl font-bold text-center mt-6 mb-2">
              Create a Secret Pin
            </h2>
            <div className="flex justify-center">
              <HStack>
                <PinInput>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </div>
            <div className="text-center mt-8">
              <Button
                rightIcon={<BsCaretRightFill />}
                colorScheme="blue"
                variant="outline"
                onClick={() => {
                  setActiveStep(2);
                }}
              >
                Next
              </Button>
            </div>
          </div>
          <div className={activeStep === 2 ? "block" : "hidden"}>
            <h2 className="text-3xl font-bold text-center mb-3">Date & Time</h2>
            <div className="flex justify-center">
              <HStack>
                <Input placeholder="Date" />
                <Input placeholder="Time" />
              </HStack>
            </div>
            <div className="flex justify-around mt-8">
              <Button
                leftIcon={<BsCaretLeftFill />}
                colorScheme="blue"
                variant="outline"
                onClick={() => {
                  setActiveStep(1);
                }}
              >
                Previous
              </Button>
              <Center height="30px">
                <Divider orientation="vertical" />
              </Center>
              <Button
                rightIcon={<BsCaretRightFill />}
                colorScheme="blue"
                variant="outline"
                onClick={() => {
                  setActiveStep(3);
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Schedule;
