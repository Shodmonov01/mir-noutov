import React from 'react';
import { Box, Button, CardRoot, Flex, Image, Text } from '@chakra-ui/react';
import type { Product } from '../api/mockData';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, setQuantity, getQuantity } = useCart();
  const qty = getQuantity(product.id);

  const handleAdd = React.useCallback(() => {
    addItem(product);
  }, [addItem, product]);

  const handleDecrement = React.useCallback(() => {
    setQuantity(product.id, qty - 1);
  }, [setQuantity, product.id, qty]);

  const handleIncrement = React.useCallback(() => {
    setQuantity(product.id, qty + 1);
  }, [setQuantity, product.id, qty]);

  const priceStr = `${product.price} ${product.currency ?? 'USD'}`;

  return (
    <CardRoot variant="outline" overflow="hidden" position="relative">
      {qty > 0 && (
        <Box
          position="absolute"
          top={2}
          right={2}
          bg="orange.500"
          color="white"
          fontSize="xs"
          fontWeight="bold"
          px={2}
          py={0.5}
          borderRadius="full"
          zIndex={1}
        >
          {qty}
        </Box>
      )}
      <Box position="relative" aspectRatio={1} overflow="hidden" bg="bg.muted">
        <Image
          src={product.image}
          alt={product.title}
          objectFit="cover"
          w="100%"
          h="100%"
        />
      </Box>
      <Box p={3}>
        <Text fontWeight="medium" lineClamp={2} fontSize="sm">
          {product.title}
        </Text>
        <Text color="fg.muted" fontSize="sm" mt={1}>
          {priceStr}
        </Text>
        {qty === 0 ? (
          <Button
            mt={3}
            w="100%"
            colorPalette="blue"
            size="sm"
            onClick={handleAdd}
          >
            ДОБАВИТЬ
          </Button>
        ) : (
          <Flex gap={2} mt={3} align="center">
            <Button
              flex={1}
              colorPalette="red"
              size="sm"
              variant="outline"
              onClick={handleDecrement}
            >
              –
            </Button>
            <Button
              flex={1}
              colorPalette="yellow"
              size="sm"
              variant="outline"
              onClick={handleIncrement}
            >
              +
            </Button>
          </Flex>
        )}
      </Box>
    </CardRoot>
  );
};
