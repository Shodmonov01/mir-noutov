import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import type { Product } from '../../api/mockData';
import { formatPrice } from '../../lib/formatPrice';
import { ProductImage, CartActions } from '../../ui';

interface CartItemProps {
  product: Product;
  quantity: number;
  onQuantityChange: (productId: number, newQty: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  product,
  quantity,
  onQuantityChange,
}) => {
  const handleDecrement = React.useCallback(
    () => onQuantityChange(product.id, quantity - 1),
    [product.id, quantity, onQuantityChange]
  );

  const handleIncrement = React.useCallback(
    () => onQuantityChange(product.id, quantity + 1),
    [product.id, quantity, onQuantityChange]
  );

  return (
    <Box
      bg="bg.subtle"
      borderRadius="lg"
      p={4}
      display="flex"
      gap={4}
    >
      <Box
        w="72px"
        h="72px"
        flexShrink={0}
        borderRadius="md"
        overflow="hidden"
        bg="bg.muted"
      >
        <ProductImage src={product.image} alt={product.title} />
      </Box>
      <Flex flex={1} direction="column" justify="space-between" minW={0}>
        <Text fontWeight="semibold" lineClamp={2} fontSize="sm">
          {product.title}
        </Text>
        <Text color="fg.muted" fontSize="sm">
          {formatPrice(product.price * quantity)}
        </Text>
        <Flex gap={2} align="center" mt={2}>
          <CartActions
            quantity={quantity}
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
            size="sm"
          />
        </Flex>
      </Flex>
    </Box>
  );
};
