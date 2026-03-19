import React from 'react';
import { Box } from '@chakra-ui/react';

interface PageLayoutProps {
  children: React.ReactNode;
  /** Дополнительный padding снизу (для кнопки внизу страницы) */
  pb?: number;
  /** Контент занимает flex: 1 */
  flexContent?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  pb = 6,
  flexContent = false,
}) => (
  <Box
    maxW="480px"
    mx="auto"
    w="100%"
    minH="100dvh"
    display={flexContent ? 'flex' : 'block'}
    flexDirection={flexContent ? 'column' : undefined}
    pb={pb}
  >
    {children}
  </Box>
);
