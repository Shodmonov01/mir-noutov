import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LuShoppingCart } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/formatPrice';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, setQuantity } = useCart();

  if (items.length === 0) {
    return (
      <Box maxW="480px" mx="auto" w="100%" minH="100dvh" p={6}>
        <Flex
          direction="column"
          align="center"
          justify="center"
          minH="60dvh"
          gap={6}
        >
          <Box position="relative" color="fg.muted">
            <LuShoppingCart size={80} style={{ opacity: 0.5 }} />
            <Box
              position="absolute"
              bottom={-4}
              right={-4}
              bg="orange.500"
              color="white"
              borderRadius="full"
              w={10}
              h={10}
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="xl"
              fontWeight="bold"
            >
              ×
            </Box>
          </Box>
          <VStack gap={2} textAlign="center">
            <Heading size="lg">Ваша корзина пуста</Heading>
            <Text color="fg.muted" fontSize="sm">
              Похоже, вы еще ничего не добавили в корзину.
            </Text>
          </VStack>
          <Button
            colorPalette="blue"
            size="lg"
            w="100%"
            maxW="280px"
            onClick={() => navigate('/')}
          >
            Перейти на главную
          </Button>
        </Flex>
      </Box>
    );
  }

  return (
    <Box maxW="480px" mx="auto" w="100%" minH="100dvh" display="flex" flexDirection="column">
      <Box p={4} flex={1}>
        <Heading size="lg" textAlign="left" mb={4}>
          Ваша Корзина
        </Heading>
        <VStack gap={4} align="stretch">
          {items.map(({ product, quantity }) => (
            <Box
              key={product.id}
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
                <Image
                  src={product.image}
                  alt={product.title}
                  objectFit="cover"
                  w="100%"
                  h="100%"
                />
              </Box>
              <Flex flex={1} direction="column" justify="space-between" minW={0}>
                <Text fontWeight="semibold" lineClamp={2} fontSize="sm">
                  {product.title}
                </Text>
                <Text color="fg.muted" fontSize="sm">
                  {formatPrice(product.price * quantity)}
                </Text>
                <Flex gap={2} align="center" mt={2}>
                  <Button
                    size="sm"
                    colorPalette="red"
                    variant="outline"
                    px={3}
                    onClick={() => setQuantity(product.id, quantity - 1)}
                  >
                    –
                  </Button>
                  <Box
                    minW="36px"
                    textAlign="center"
                    fontWeight="medium"
                    fontSize="sm"
                  >
                    {quantity}
                  </Box>
                  <Button
                    size="sm"
                    colorPalette="orange"
                    variant="outline"
                    px={3}
                    onClick={() => setQuantity(product.id, quantity + 1)}
                  >
                    +
                  </Button>
                </Flex>
              </Flex>
            </Box>
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
    </Box>
  );
};
