import React from 'react';
import { Box, Button, CardRoot, Flex, Image, Text } from '@chakra-ui/react';
import type { Product } from '../api/mockData';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/formatPrice';
import { triggerHaptic } from '../lib/telegram';

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

const ProductImageWithFallback: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [error, setError] = React.useState(false);
  if (error) {
    return (
      <Flex
        w="100%"
        h="100%"
        bg="bg.muted"
        align="center"
        justify="center"
        color="fg.muted"
        fontSize="2xl"
      >
        ?
      </Flex>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      objectFit="cover"
      w="100%"
      h="100%"
      loading="lazy"
      onError={() => setError(true)}
    />
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
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
      <Box position="relative" aspectRatio={1} overflow="hidden" bg="bg.muted" flexShrink={0}>
        <ProductImageWithFallback src={product.image} alt={product.title} />
      </Box>
      <Flex
        p={3}
        flex={1}
        direction="column"
        minH={0}
      >
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
          <Flex gap={2} align="center">
            <Button
              flex={1}
              colorPalette="red"
              size="sm"
              variant="outline"
              aria-label="Уменьшить количество"
              onClick={handleDecrement}
            >
              –
            </Button>
            <Button
              flex={1}
              colorPalette="green"
              size="sm"
              variant="outline"
              aria-label="Увеличить количество"
              onClick={handleIncrement}
            >
              +
            </Button>
          </Flex>
        )}
        </Box>
      </Flex>
    </CardRoot>
  );
};
