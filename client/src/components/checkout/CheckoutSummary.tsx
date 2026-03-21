import React from 'react';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { formatPrice } from '../../lib/formatPrice';

interface CheckoutSummaryProps {
  productsSum: number;
  deliveryPrice: number;
  total: number;
}

export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  productsSum,
  deliveryPrice,
  total,
}) => (
  <VStack align="stretch" gap={2} p={4} bg="bg.subtle" borderRadius="lg">
    <Flex justify="space-between">
      <Text color="fg.muted">Продукты</Text>
      <Text>{formatPrice(productsSum)}</Text>
    </Flex>
    <Flex justify="space-between">
      <Text color="fg.muted">Доставка</Text>
      <Text>{formatPrice(deliveryPrice)}</Text>
    </Flex>
    <Text fontSize="sm" color="orange.fg">
      Оплата доставки производится после получения заказа
    </Text>
    <Box borderTopWidth="1px" borderColor="border" w="100%" pt={3} mt={2}>
      <Flex justify="space-between" fontWeight="semibold" fontSize="lg">
        <Text>Итого</Text>
        <Text>{formatPrice(total)}</Text>
      </Flex>
    </Box>
  </VStack>
);
