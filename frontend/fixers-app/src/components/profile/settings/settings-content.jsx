"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Field,
  Fieldset,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { SidebarProfile } from "../profile-sidebar-view";
import { SettingsActionChangeUsername } from "./actions/settings-action-change-username";
import { SettingsActionChangePassword } from "./actions/settings-action-change-password";
import { SettingsActionChangeEmail } from "./actions/settings-action-change-email";

export function SettingsContent({ session }) {
  const [username, setUsername] = useState(session?.user?.username);
  const [email, setEmail] = useState(session?.user?.email);

  return (
    <Box>
      <Alert.Root mt="5" status="warning" width="fit">
        <Alert.Indicator />
        <Alert.Title>
          После внесения изменений для корректной работы необходимо перезайти
        </Alert.Title>
      </Alert.Root>

      <Stack mt="6" maxW="2xl">
        <Fieldset.Root size="lg">
          <Fieldset.Legend>Настройки аккаунта</Fieldset.Legend>

          <Fieldset.Content mt="5" gap="5">
            <Field.Root gap="4">
              <Field.Label>Профиль</Field.Label>
              <HStack w="full" justifyContent="space-between">
                <SidebarProfile
                  size="md"
                  username={username}
                  role={session?.user?.role}
                />
                <SettingsActionChangeUsername
                  session={session}
                  setUsername={setUsername}
                />
              </HStack>
            </Field.Root>

            <Field.Root gap="2">
              <Field.Label>Почта</Field.Label>
              <HStack w="full" justifyContent="space-between">
                <Text>{email}</Text>
                <SettingsActionChangeEmail
                  session={session}
                  setEmail={setEmail}
                />
              </HStack>
            </Field.Root>

            <Field.Root gap="2">
              <Field.Label>Пароль</Field.Label>
              <HStack w="full" justifyContent="space-between">
                <Text>●●●●●●●●</Text>
                <SettingsActionChangePassword session={session} />
              </HStack>
            </Field.Root>
          </Fieldset.Content>
        </Fieldset.Root>
      </Stack>
    </Box>
  );
}
