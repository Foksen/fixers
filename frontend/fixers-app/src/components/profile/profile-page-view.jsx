import { Box, Heading, Text } from "@chakra-ui/react";

export function ProfilePageView({ title, description, content }) {
  return (
    <Box px="16" py="12">
      <Heading textStyle="2xl">{title}</Heading>
      <Text mt="2" width="prose">
        {description}
      </Text>

      {content}
    </Box>
  );
}
