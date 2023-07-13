import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

import Skeletn from "../../Loading2";
import { Superchats } from "../../../types/jamma";
import { profileState } from "../../../atoms/atoms";
import { useProfile } from "../../../hooks/profiles";
import { useRecoilValueLoadable } from "recoil";

export default function SuperchatsMessage(props: { message: Superchats }) {
  const profile = useRecoilValueLoadable(profileState);
  const { data, isLoading } = useProfile(props.message.profile as string);

  return (
    <Skeletn loading={profile.state == "loading" || isLoading}>
      <Flex width="98%">
        <Flex minWidth="150px" justifyContent={"left"}>
          {/* authenticated user */}
          {data != undefined && isLoading == false && (
            <Flex justifyContent={"left"}>
              <Avatar
                mr="2.5"
                name={data.username as string}
                src={data.avatar_url as string}
                size="xs"
              />
              <Text>{data.username}</Text>
            </Flex>
          )}
          {/* anonymous user */}
          {data == undefined && isLoading == false && (
            <Flex>
              <Avatar name="Anon" size="xs" mr="2.5" />
              <Text>Anon</Text>
            </Flex>
          )}
        </Flex>
        <Flex ml="2.5">
          <Box>{props.message.message}</Box>
        </Flex>
      </Flex>
    </Skeletn>
  );
}
