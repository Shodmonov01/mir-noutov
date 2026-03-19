import React from 'react';
import {
  CloseButton,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerPositioner,
  DrawerRootProvider,
  DrawerTitle,
  Text,
  VStack,
  SwitchControl,
  SwitchRoot,
  SwitchRootProvider,
  Flex,
  useDrawer,
  useSwitch,
} from '@chakra-ui/react';
import { getWebApp } from '../lib/telegram';
import { useTheme } from '../context/ThemeContext';

interface ProfileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  open,
  onOpenChange,
  children,
}) => {
  const webApp = getWebApp();
  const user = webApp?.initDataUnsafe?.user;
  const { theme, setTheme } = useTheme();

  const drawer = useDrawer({
    open,
    onOpenChange: (e) => onOpenChange(e.open),
  });

  const switchApi = useSwitch({
    checked: theme === 'dark',
    onCheckedChange: (e) => setTheme(e.checked ? 'dark' : 'light'),
  });

  const userName = user
    ? [user.first_name, user.last_name].filter(Boolean).join(' ')
    : null;

  return (
    <DrawerRootProvider value={drawer} placement="start">
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Профиль</DrawerTitle>
            <DrawerCloseTrigger asChild>
              <CloseButton aria-label="Закрыть" size="sm" />
            </DrawerCloseTrigger>
          </DrawerHeader>
          <DrawerBody>
            {children ?? (
              <VStack align="stretch" gap={4}>
                {userName && (
                  <Text fontWeight="medium" fontSize="lg">
                    {userName}
                  </Text>
                )}
                {user?.username && (
                  <Text color="fg.muted">@{user.username}</Text>
                )}
                {!userName && (
                  <Text color="fg.muted">Войдите через Telegram</Text>
                )}
                <Flex align="center" justify="space-between" w="100%" pt={2}>
                  <Text fontSize="sm">Тёмная тема</Text>
                  <SwitchRootProvider value={switchApi}>
                    <SwitchRoot>
                      <SwitchControl />
                    </SwitchRoot>
                  </SwitchRootProvider>
                </Flex>
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </DrawerPositioner>
    </DrawerRootProvider>
  );
};
