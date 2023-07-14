import {
  Avatar,
  Box,
  BoxProps,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";
import { useEffect, useRef } from "react";

import SendIcon from "../../assets/send.svg";
import Skeletn from "../Loading2";
import SuperchatsMessage from "./message";
import { profileState } from "../../atoms/atoms";
import { useRecoilValueLoadable } from "recoil";
import { useSuperchats } from "../../hooks/superchats";

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (elementRef.current != undefined) {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });
  return <div ref={elementRef} />;
};

export default function Superchats(boxProps?: BoxProps) {
  const profile = useRecoilValueLoadable(profileState);
  const { superchats, message, setMessage, handleChange, handleEnter, send } =
    useSuperchats();

  function emojiClick(emojiData: EmojiClickData) {
    setMessage((prev) => prev + emojiData.emoji);
  }

  return (
    <Skeletn state={profile.state}>
      <Box {...boxProps}>
        <VStack
          maxH="xs"
          overflowY={"scroll"}
          justifyContent={"left"}
          minW="740px"
          gap={6}
        >
          {superchats.map((message) => (
            <SuperchatsMessage
              enableActions={false}
              key={"superchat:" + message.id}
              message={message}
              commentMode={false}
            />
          ))}
          {superchats.length != 0 && <AlwaysScrollToBottom />}
        </VStack>
        <InputGroup mt="5">
          <InputLeftElement width="100px">
            <Wrap>
              <WrapItem>
                {profile.contents != undefined && (
                  <Flex ml="3">
                    <Avatar
                      name={profile.contents.username}
                      src={profile.contents.avatar_url}
                      size="xs"
                      mr="2.5"
                    />
                    <Text color="gray.500" fontWeight={"semibold"}>
                      {profile.contents.username}
                    </Text>
                  </Flex>
                )}
                {profile.contents == undefined && (
                  <Flex>
                    <Avatar name="Anonymous" size="xs" mr="2.5" />
                    <Text color="gray.500" fontWeight={"semibold"}>
                      Anon
                    </Text>
                  </Flex>
                )}
              </WrapItem>
            </Wrap>
          </InputLeftElement>
          <Input
            placeholder="Type your message here"
            onChange={handleChange}
            value={message}
            onKeyUp={handleEnter}
            pl="170px"
            borderRadius={"none"}
          />
          <InputRightElement width="60px">
            <Flex width="100%" justifyContent="space-between" paddingX="2">
              <img
                src={SendIcon}
                onClick={() => send()}
                style={{ cursor: "pointer" }}
              />
              <Popover>
                <PopoverTrigger>
                  <Text cursor={"pointer"}>😀</Text>
                </PopoverTrigger>
                <PopoverContent>
                  <EmojiPicker
                    onEmojiClick={emojiClick}
                    autoFocusSearch={true}
                    emojiStyle={EmojiStyle.APPLE}
                  />
                </PopoverContent>
              </Popover>
            </Flex>
          </InputRightElement>
        </InputGroup>
      </Box>
    </Skeletn>
  );
}
