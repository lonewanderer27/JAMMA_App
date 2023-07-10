import {
  Box,
  Collapse,
  Fade,
  Flex,
  ModalBody,
  Progress,
  useDisclosure,
} from "@chakra-ui/react";
import { CircularProgress, Modal, ModalContent, Text } from "@chakra-ui/react";

import { LoadingProps } from "../types/jamma";
import { Suspense } from "react";

export default function Loading<T>({
  children,
  loading,
  fullScreen,
  circle,
}: LoadingProps<T>) {
  const { onClose } = useDisclosure();

  const fullScreenLoader = () => {
    return (
      <Modal isCentered isOpen={true} onClose={onClose}>
        <ModalContent>
          <ModalBody
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text>Loading</Text>
            <CircularProgress isIndeterminate color="green.300" m={20} />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  if (loading) {
    if (fullScreen) {
      return fullScreenLoader();
    }
    if (circle) {
      return (
        <Flex width="100%" justifyContent="center">
          <CircularProgress isIndeterminate color="green.300" m={20} />
        </Flex>
      );
    }
    return <Progress size="sm" isIndeterminate />;
  }

  if (fullScreen) {
    return (
      <Suspense fallback={fullScreenLoader()}>
        <Fade in={true}>{children}</Fade>
      </Suspense>
    );
  } else if (circle) {
    return (
      <Suspense
        fallback={
          <Box width={"100%"}>
            <CircularProgress isIndeterminate color="green.300" m={10} />
          </Box>
        }
      >
        <Collapse in={true}>{children}</Collapse>
      </Suspense>
    );
  } else {
    return (
      <Suspense
        fallback={
          <Fade in={true}>
            <Progress size="sm" isIndeterminate />
          </Fade>
        }
      >
        <Collapse in={true}>{children}</Collapse>
      </Suspense>
    );
  }
}
