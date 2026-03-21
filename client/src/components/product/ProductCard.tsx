import React from 'react';
import { Box, Button, CardRoot, Flex, Text } from '@chakra-ui/react';
import type { Product } from '../../api/mockData';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../lib/formatPrice';
import { triggerHaptic } from '../../lib/telegram';
import { ProductImage, CartActions } from '../../ui';

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
}) => {
  const { addItem, setQuantity, getQuantity } = useCart();
  const qty = getQuantity(product.id);

  const handleAdd = React.useCallback(() => {
    addItem(product);
    triggerHaptic();
  }, [addItem, product]);

  const handleDecrement = React.useCallback(() => {
    setQuantity(product.id, qty - 1);
    triggerHaptic();
  }, [setQuantity, product.id, qty]);

  const handleIncrement = React.useCallback(() => {
    setQuantity(product.id, qty + 1);
    triggerHaptic();
  }, [setQuantity, product.id, qty]);

  const priceStr = formatPrice(product.price, product.currency ?? 'UZS');

  const handleCardClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (onProductClick && !(e.target as HTMLElement).closest('button')) {
        onProductClick(product);
      }
    },
    [onProductClick, product]
  );

  return (
    <CardRoot
      variant="outline"
      overflow="hidden"
      position="relative"
      cursor={onProductClick ? 'pointer' : undefined}
      onClick={handleCardClick}
      display="flex"
      flexDirection="column"
      h="100%"
    >
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
      {product.condition && (
        <Box
          position="absolute"
          top={2}
          left={2}
          px={2}
          py={0.5}
          borderRadius="md"
          bg="blue.muted"
          color="blue.fg"
          fontSize="xs"
          fontWeight="medium"
          zIndex={1}
        >
          {product.condition}
        </Box>
      )}
      <Box
        position="relative"
        aspectRatio={1}
        overflow="hidden"
        bg="bg.muted"
        flexShrink={0}
      >
        <ProductImage
          src={product.image}
          alt={product.title}
          fallbackIcon={<Text fontSize="2xl">?</Text>}
        />
      </Box>
      <Flex p={3} flex={1} direction="column" minH={0}>
        <Text fontWeight="medium" lineClamp={2} fontSize="sm">
          {product.title}
        </Text>
        {product.location && (
          <Text color="fg.muted" fontSize="xs" mt={0.5} lineClamp={1}>
            {product.location}
          </Text>
        )}
        <Text color="fg.muted" fontSize="sm" mt={1}>
          {priceStr}
        </Text>
        <Box mt="auto" pt={3}>
          {qty === 0 ? (
            <Button
              w="100%"
              colorPalette="blue"
              size="sm"
              onClick={handleAdd}
            >
              ДОБАВИТЬ
            </Button>
          ) : (
            <CartActions
              quantity={qty}
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
              size="sm"
            />
          )}
        </Box>
      </Flex>
    </CardRoot>
  );
};
