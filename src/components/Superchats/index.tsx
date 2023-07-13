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
          minW="700px"
          gap={4}
        >
          {superchats.map((message) => (
            <SuperchatsMessage key={message.id} message={message} />
          ))}
          <AlwaysScrollToBottom />
        </VStack>
        <InputGroup mt="5">
          <InputLeftElement>
            <Wrap>
              <WrapItem>
                {profile.contents != undefined && (
                  <Avatar
                    name={profile.contents.username}
                    src={profile.contents.avatar_url}
                    size="xs"
                  />
                )}
                {profile.contents == undefined && (
                  <Avatar name="Anonymous" size="xs" />
                )}
              </WrapItem>
            </Wrap>
          </InputLeftElement>
          <Input
            placeholder="Type your message here"
            onChange={handleChange}
            value={message}
            onKeyUp={handleEnter}
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
