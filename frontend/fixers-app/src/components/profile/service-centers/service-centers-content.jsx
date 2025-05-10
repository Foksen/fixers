"use client";

import { Alert, Box, Flex } from "@chakra-ui/react";
import { ServiceCentersTable } from "./service-centers-table";
import { useState } from "react";
import { ServiceCentersActionCreate } from "./actions/service-centers-action-create";

export function ServiceCentersContent({ initialServiceCentersInfos, session }) {
  const [serviceCentersInfos, setServiceCentersInfos] = useState(
    initialServiceCentersInfos
  );

  const addServiceCenterInfo = (newServiceCenterInfo) => {
    setServiceCentersInfos((prev) => [...prev, newServiceCenterInfo]);
  };

  const updateServiceCenterInfo = (id, newServiceCenterInfo) => {
    setServiceCentersInfos((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, ...newServiceCenterInfo } : cat
      )
    );
  };

  const removeServiceCenterInfo = (id) => {
    setServiceCentersInfos((prev) => prev.filter((cat) => cat.id !== id));
  };

  return (
    <Box>
      <Flex justify="space-between" flexWrap="wrap" gapY="4" align="end">
        <Alert.Root mt="5" status="info" width="fit">
          <Alert.Indicator />
          <Alert.Title>
            Чтобы удалить сервисный центр необходимо чтобы не оставалось заявок
            с ним
          </Alert.Title>
        </Alert.Root>

        <ServiceCentersActionCreate
          session={session}
          addServiceCenterInfo={addServiceCenterInfo}
        />
      </Flex>

      <ServiceCentersTable
        session={session}
        serviceCentersInfos={serviceCentersInfos}
        updateServiceCenterInfo={updateServiceCenterInfo}
        removeServiceCenterInfo={removeServiceCenterInfo}
      />
    </Box>
  );
}
