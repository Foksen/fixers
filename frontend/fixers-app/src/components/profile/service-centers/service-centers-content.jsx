import { Alert, Box } from "@chakra-ui/react";
import { ServiceCentersTable } from "./service-centers-table";

export function ServiceCentersContent({ initialServiceCentersInfos, session }) {
  return (
    <Box>
      <Alert.Root mt="5" status="info" width="fit">
        <Alert.Indicator />
        <Alert.Title>
          Чтобы удалить сервисный центр необходимо чтобы не оставалось заявок с
          ним
        </Alert.Title>
      </Alert.Root>

      <ServiceCentersTable
        initialServiceCentersInfos={initialServiceCentersInfos}
        session={session}
      />
    </Box>
  );
}
