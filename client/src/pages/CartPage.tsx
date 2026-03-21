import React from 'react';
import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/formatPrice';
import { triggerHaptic } from '../lib/telegram';
import { PageLayout } from '../ui';
import { CartEmpty, CartItem } from '../components/cart';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, setQuantity } = useCart();

  const handleQuantityChange = React.useCallback(
    (productId: number, newQty: number) => {
      setQuantity(productId, newQty);
      triggerHaptic();
    },
    [setQuantity]
  );

  if (items.length === 0) {
    return (
      <PageLayout>
        <Flex
          p={6}
          direction="column"
          align="center"
          justify="center"
          minH="60dvh"
        >
          <CartEmpty onGoToCatalog={() => navigate('/')} />
        </Flex>
      </PageLayout>
    );
  }

  return (
    <PageLayout pb={0} flexContent>
      <Box p={4} flex={1}>
        <Heading size="lg" textAlign="left" mb={4}>
          Ваша корзина
        </Heading>
        <VStack gap={4} align="stretch">
          {items.map(({ product, quantity }) => (
            <CartItem
              key={product.id}
              product={product}
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </VStack>
      </Box>
      <Box p={4} pt={0}>
        <Button
          colorPalette="blue"
          size="lg"
          w="100%"
          onClick={() => navigate('/checkout')}
        >
          Оформить • {formatPrice(totalPrice)}
        </Button>
      </Box>
    </PageLayout>
  );
};
