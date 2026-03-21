import React from 'react';
import { Box } from '@chakra-ui/react';
import { LuShoppingCart } from 'react-icons/lu';
import { EmptyState } from '../../ui';

interface CartEmptyProps {
  onGoToCatalog: () => void;
}

export const CartEmpty: React.FC<CartEmptyProps> = ({ onGoToCatalog }) => (
  <EmptyState
    icon={
      <Box position="relative" color="fg.muted">
        <Box opacity={0.5} lineHeight={0}>
          <LuShoppingCart size={80} />
        </Box>
        <Box
          position="absolute"
          bottom={-4}
          right={-4}
          bg="fg.muted"
          color="bg"
          borderRadius="full"
          w={10}
          h={10}
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="xl"
          fontWeight="bold"
          aria-hidden
        >
          0
        </Box>
      </Box>
    }
    title="Ваша корзина пуста"
    description="Похоже, вы еще ничего не добавили в корзину."
    actionLabel="Перейти на главную"
    onAction={onGoToCatalog}
  />
);
