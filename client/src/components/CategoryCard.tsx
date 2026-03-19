import React from 'react';
import { Box, CardRoot, Image, Text } from '@chakra-ui/react';
import type { Category } from '../api/mockData';

interface CategoryCardProps {
  category: Category;
  isSelected?: boolean;
  onClick?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  onClick,
}) => {
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick();
      }
    },
    [onClick]
  );

  return (
    <CardRoot
      flexShrink={0}
      w="80px"
      cursor={onClick ? 'pointer' : 'default'}
      variant={isSelected ? 'elevated' : 'outline'}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-pressed={onClick ? isSelected : undefined}
      transition="all 0.2s"
      _active={onClick ? { transform: 'scale(0.98)' } : undefined}
      _focusVisible={{ outline: '2px solid', outlineColor: 'blue.500', outlineOffset: '2px' }}
    >
      <Box position="relative" aspectRatio={1} overflow="hidden" borderRadius="md">
        <Image
          src={category.image}
          alt={category.name}
          objectFit="cover"
          w="100%"
          h="100%"
          loading="lazy"
        />
      </Box>
      <Text
        fontSize="xs"
        fontWeight="medium"
        textAlign="center"
        mt={1}
        lineClamp={2}
      >
        {category.name}
      </Text>
    </CardRoot>
  );
};
