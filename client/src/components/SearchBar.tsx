import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Flex, IconButton, Input, InputGroup } from '@chakra-ui/react';
import { LuSearch, LuShoppingCart, LuUser } from 'react-icons/lu';

interface SearchBarProps {
  onProfileClick: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  cartCount?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onProfileClick,
  searchValue = '',
  onSearchChange,
  cartCount = 0,
}) => {
  const navigate = useNavigate();

  return (
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
      <InputGroup flex={1} endElement={<LuSearch size={20} style={{ opacity: 0.6 }} />}>
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
          onClick={() => navigate('/cart')}
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
            minW="18px"
            textAlign="center"
          >
            {cartCount}
          </Badge>
        )}
      </Flex>
    </Flex>
  );
};
