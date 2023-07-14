import { Flex, HStack, Image, Text } from "@chakra-ui/react";
import { downvote, unvote, upvote } from "../../utils/superchats";
import { useDownvote, useUpvote } from "../../hooks/superchats";

import Flag from "bootstrap-icons/icons/flag.svg";
import FlagFill from "bootstrap-icons/icons/flag-fill.svg";
import HandThumbsDown from "bootstrap-icons/icons/hand-thumbs-down.svg";
import HandThumbsDownFill from "bootstrap-icons/icons/hand-thumbs-down-fill.svg";
import HandThumbsUp from "bootstrap-icons/icons/hand-thumbs-up.svg";
import HandThumbsUpFill from "bootstrap-icons/icons/hand-thumbs-up-fill.svg";
import Skeletn from "../Loading2";
import { Superchats } from "../../types/jamma";

export function SuperchatActions(props: {
  message: Superchats;
  superchat_id: number;
  profile_id: string;
}) {
  const { upvotes, upvoted, handleUpvote } = useUpvote(
    props.superchat_id,
    props.profile_id
  );
  const { downvotes, downvoted } = useDownvote(
    props.superchat_id,
    props.profile_id
  );

  // const handleUpvote = () => {
  //   // you can only upvote once
  //   // hence if you try to upvote again, it will unupvote
  //   if (upvoted.data?.profile == props.profile_id) {
  //     // unupvote
  //     (async () => {
  //       const { data } = await unvote(props.superchat_id, props.profile_id);
  //       console.log(data);
  //     })();
  //   } else {
  //     console.log("upvoting");
  //     (async () => {
  //       const { data } = await upvote(props.superchat_id, props.profile_id);
  //       console.log(data);
  //     })();
  //   }
  // };

  const handleDownvote = () => {
    // you can only downvote once
    // hence if you try to downvote again, it will undownvote
    if (downvoted.data?.profile == props.profile_id) {
      // undownvote
      (async () => {
        const { data } = await unvote(props.superchat_id, props.profile_id);
        console.log(data);
      })();
    } else {
      console.log("downvoting");
      (async () => {
        const { data } = await downvote(props.superchat_id, props.profile_id);
        console.log(data);
      })();
    }
  };

  return (
    <HStack gap={5}>
      <HStack gap={1}>
        <Image
          src={upvoted ? HandThumbsUpFill : HandThumbsUp}
          style={{ cursor: "pointer" }}
          onClick={() => handleUpvote()}
        />
        <Text>{upvotes}</Text>
      </HStack>
      <HStack gap={1}>
        {downvoted.isLoading == false && (
          <Image
            src={
              downvoted.data?.profile == props.profile_id &&
              props.message.profile != undefined
                ? HandThumbsDownFill
                : HandThumbsDown
            }
            style={{ cursor: "pointer" }}
            onClick={() => handleDownvote()}
          />
        )}
        {downvotes.isLoading == false && <Text>{downvotes.count}</Text>}
      </HStack>
      <Flex>
        <Image src={Flag} />
      </Flex>
    </HStack>
  );
}
