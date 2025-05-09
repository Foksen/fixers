import { Alert, Box } from "@chakra-ui/react";
import { CategoriesTable } from "./categories-table";

export function CategoriesContent({ initialCategoriesInfos, session }) {
  return (
    <Box>
      <Alert.Root mt="5" status="info" width="fit">
        <Alert.Indicator />
        <Alert.Title>
          Чтобы удалить вид ремонта необходимо чтобы не оставалось заявок с ним
        </Alert.Title>
      </Alert.Root>

      <CategoriesTable initialCategoriesInfos={initialCategoriesInfos} session={session} />
    </Box>
  );
}
