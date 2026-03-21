import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';

interface CartActionsProps {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const CartActions: React.FC<CartActionsProps> = ({
  quantity,
  onDecrement,
  onIncrement,
  size = 'sm',
}) => (
  <Flex gap={2} align="center">
    <Button
      flex={1}
      colorPalette="red"
      size={size}
      variant="outline"
      aria-label="Уменьшить количество"
      onClick={onDecrement}
    >
      –
    </Button>
    <Box
      minW={size === 'lg' ? '48px' : '36px'}
      textAlign="center"
      fontWeight={size === 'lg' ? 'semibold' : 'medium'}
      fontSize={size === 'lg' ? 'lg' : 'sm'}
    >
      {quantity}
    </Box>
    <Button
      flex={1}
      colorPalette="green"
      size={size}
      variant="outline"
      aria-label="Увеличить количество"
      onClick={onIncrement}
    >
      +
    </Button>
  </Flex>
);
