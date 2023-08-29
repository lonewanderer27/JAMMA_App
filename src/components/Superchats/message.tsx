import { Avatar, Box, Flex, Text, VStack } from "@chakra-ui/react";

import Skeletn from "../Loading2";
import { SuperchatActions } from "./actions";
import { Superchats } from "../../types/jamma";
import dayjs from "dayjs";
import { memo } from "react";
import { profileState } from "../../atoms/atoms";
import relativeTime from "dayjs/plugin/relativeTime";
import { useProfile } from "../../hooks/profiles";
import { useRecoilValueLoadable } from "recoil";

dayjs.extend(relativeTime);

function SuperchatsMessage(props: {
  message: Superchats;
  commentMode: boolean;
  enableActions: boolean;
}) {
  const profile = useRecoilValueLoadable(profileState);
  const { data, isLoading } = useProfile(props.message.profile as string);

  if (props.commentMode) {
    return (
      <Flex width="98%">
        {data != undefined && (
          <Avatar
            mr="2.5"
            name={data.username as string}
            src={data.avatar_url as string}
            size="xs"
          />
        )}
        <VStack minWidth="150px" textAlign="left">
          <Flex alignContent={"center"}>
            {data != undefined && (
              <Text color="gray.500" fontWeight={"semibold"}>
                {data.username}
              </Text>
            )}
            <Text ml="2" fontSize="xs">
              {dayjs(props.message.created_at).fromNow()}
            </Text>
          </Flex>
          <Flex textAlign="left">
            <Text>{props.message.message}</Text>
          </Flex>
        </VStack>
        <Box ml="auto">
          {props.enableActions == true && profile != undefined && (
            <SuperchatActions
              message={props.message}
              superchat_id={props.message.id}
              profile_id={props.message.profile as string}
            />
          )}
        </Box>
      </Flex>
    );
  }

  return (
    <Skeletn loading={isLoading}>
      {profile.state != "loading" && (
        <Flex width="98%">
          <Flex minWidth="150px">
            {/* authenticated user */}
            {data != undefined && isLoading == false && (
              <Flex justifyContent={"left"}>
                <Avatar
                  mr="2.5"
                  name={data.username as string}
                  src={data.avatar_url as string}
                  size="xs"
                />
                <Text color="gray.500" fontWeight={"semibold"} noOfLines={1}>
                  {data.username}
                </Text>
              </Flex>
            )}
            {/* anonymous user */}
            {data == undefined && isLoading == false && (
              <Flex>
                <Avatar name="Anon" size="xs" mr="2.5" />
                <Text color="gray.500" fontWeight={"semibold"}>
                  Anon
                </Text>
              </Flex>
            )}
          </Flex>
          <Flex ml="2.5">
            <Text noOfLines={1}>{props.message.message}</Text>
          </Flex>
          <Flex ml="auto">
            <Text ml="10" color="gray.500" fontSize="xs">
              {dayjs(props.message.created_at).fromNow()}
            </Text>
          </Flex>
          <Box ml="auto">
            {props.enableActions == true && profile != undefined && (
              <SuperchatActions
                message={props.message}
                superchat_id={props.message.id}
                profile_id={props.message.profile as string}
              />
            )}
          </Box>
        </Flex>
      )}
    </Skeletn>
  );
}

export default memo(SuperchatsMessage);
