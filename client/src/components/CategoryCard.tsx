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
  return (
    <CardRoot
      flexShrink={0}
      w="80px"
      cursor="pointer"
      variant={isSelected ? 'elevated' : 'outline'}
      onClick={onClick}
      transition="all 0.2s"
      _active={{ transform: 'scale(0.98)' }}
    >
      <Box position="relative" aspectRatio={1} overflow="hidden" borderRadius="md">
        <Image
          src={category.image}
          alt={category.name}
          objectFit="cover"
          w="100%"
          h="100%"
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
