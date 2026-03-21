import React from 'react';
import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => (
  <Flex
    p={6}
    direction="column"
    align="center"
    justify="center"
    minH="60dvh"
    gap={6}
  >
    <Box position="relative" color="fg.muted">
      {icon}
    </Box>
    <VStack gap={2} textAlign="center">
      <Text fontWeight="semibold" fontSize="lg">
        {title}
      </Text>
      {description && (
        <Text color="fg.muted" fontSize="sm">
          {description}
        </Text>
      )}
    </VStack>
    {actionLabel && onAction && (
      <Button
        colorPalette="blue"
        size="lg"
        w="100%"
        maxW="280px"
        onClick={onAction}
      >
        {actionLabel}
      </Button>
    )}
  </Flex>
);
