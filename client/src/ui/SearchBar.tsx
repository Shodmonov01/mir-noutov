import React from 'react';
import { Badge, Box, Flex, IconButton, Input, InputGroup } from '@chakra-ui/react';
import { LuSearch, LuShoppingCart, LuUser } from 'react-icons/lu';

interface SearchBarProps {
  onProfileClick: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  cartCount?: number;
  onCartClick?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onProfileClick,
  searchValue = '',
  onSearchChange,
  cartCount = 0,
  onCartClick,
}) => (
  <Flex gap={2} align="center" w="100%">
    <IconButton
      aria-label="Профиль"
      variant="ghost"
      size="lg"
      onClick={onProfileClick}
      flexShrink={0}
    >
      <LuUser size={24} />
    </IconButton>
    <InputGroup
      flex={1}
      endElement={
        <Box color="fg.muted" opacity={0.6} display="flex" alignItems="center">
          <LuSearch size={20} />
        </Box>
      }
    >
      <Input
        placeholder="Поиск"
        value={searchValue}
        onChange={(e) => onSearchChange?.(e.target.value)}
        borderRadius="lg"
      />
    </InputGroup>
    <Flex position="relative" flexShrink={0}>
      <IconButton
        aria-label="Корзина"
        variant="ghost"
        size="lg"
        onClick={onCartClick}
      >
        <LuShoppingCart size={24} />
      </IconButton>
      {cartCount > 0 && (
        <Badge
          position="absolute"
          top={0}
          right={0}
          colorPalette="orange"
          size="sm"
          borderRadius="full"
          px={1.5}
          minW="badgeMin"
          textAlign="center"
        >
          {cartCount}
        </Badge>
      )}
    </Flex>
  </Flex>
);
