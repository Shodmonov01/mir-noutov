import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

interface CheckoutRowProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  onClick?: () => void;
  hasError?: boolean;
}

export const CheckoutRow: React.FC<CheckoutRowProps> = ({
  icon,
  title,
  value,
  onClick,
  hasError,
}) => {
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick();
      }
    },
    [onClick]
  );

  return (
    <Flex
      align="center"
      gap={4}
      p={4}
      bg="bg.subtle"
      borderWidth={hasError ? 2 : 0}
      borderColor={hasError ? 'red.500' : 'transparent'}
      borderRadius="lg"
      cursor={onClick ? 'pointer' : 'default'}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      _hover={onClick ? { bg: 'bg.muted' } : undefined}
      _focusVisible={
        onClick
          ? {
              outlineWidth: 'focusRing',
              outlineStyle: 'solid',
              outlineColor: 'blue.500',
              outlineOffset: 'focusRing',
            }
          : undefined
      }
    >
      <Box color="fg.muted" flexShrink={0}>
        {icon}
      </Box>
      <Flex flex={1} direction="column" minW={0}>
        <Text fontSize="sm" color="fg.muted">
          {title}
        </Text>
        <Text fontWeight="medium" lineClamp={2}>
          {value}
        </Text>
      </Flex>
      {onClick && (
        <Text color="fg.muted" fontSize="lg">
          ›
        </Text>
      )}
    </Flex>
  );
};
