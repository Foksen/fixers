"use client";

import { Alert, Box, Flex } from "@chakra-ui/react";
import { CategoriesTable } from "./categories-table";
import { useState } from "react";
import { CategoriesActionCreate } from "./actions/categories-action-create";

export function CategoriesContent({ initialCategoriesInfos, session }) {
  const [categoriesInfos, setCategoriesInfos] = useState(
    initialCategoriesInfos
  );

  const addCategoryInfo = (newCategoryInfo) => {
    setCategoriesInfos((prev) => [...prev, newCategoryInfo]);
  };

  const updateCategoryInfo = (id, newCategoryInfo) => {
    setCategoriesInfos((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...newCategoryInfo } : cat))
    );
  };

  const removeCategoryInfo = (id) => {
    setCategoriesInfos((prev) => prev.filter((cat) => cat.id !== id));
  };

  return (
    <Box>
      <Flex justify="space-between" flexWrap="wrap" gapY="4" align="end">
        <Alert.Root mt="5" status="info" width="fit">
          <Alert.Indicator />
          <Alert.Title>
            Чтобы удалить вид ремонта необходимо чтобы не оставалось заявок с
            ним
          </Alert.Title>
        </Alert.Root>

        <CategoriesActionCreate
          session={session}
          addCategoryInfo={addCategoryInfo}
        />
      </Flex>

      <CategoriesTable
        session={session}
        categoriesInfos={categoriesInfos}
        updateCategoryInfo={updateCategoryInfo}
        removeCategoryInfo={removeCategoryInfo}
      />
    </Box>
  );
}
