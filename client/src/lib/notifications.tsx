import React from 'react';
import {
  Box,
  Toaster,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastCloseTrigger,
  ToastIndicator,
  createToaster,
} from '@chakra-ui/react';

export const toaster = createToaster({
  placement: 'top-end',
  pauseOnPageIdle: true,
});

export const AppToaster: React.FC = () => (
  <Toaster toaster={toaster}>
    {(t) => (
      <ToastRoot>
        <ToastIndicator />
        <Box flex={1} minW={0}>
          {t.title ? <ToastTitle>{t.title}</ToastTitle> : null}
          {t.description ? <ToastDescription>{t.description}</ToastDescription> : null}
        </Box>
        <ToastCloseTrigger />
      </ToastRoot>
    )}
  </Toaster>
);

export interface AddNotificationInput {
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}

export function addNotification(input: AddNotificationInput): void {
  const { title, description, type = 'success' } = input;
  toaster.create({ title, description, type });
}
