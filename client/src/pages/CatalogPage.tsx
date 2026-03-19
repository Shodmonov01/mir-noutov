import { useMemo, useState } from 'react';
import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { SearchBar } from '../components/SearchBar';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { categories, products } from '../api/mockData';

interface CatalogPageProps {
  onProfileClick: () => void;
  sidebarOpen?: boolean;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  onProfileClick,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const { totalCount } = useCart();

  const filteredProducts = useMemo(() => {
    let list = products;
    if (selectedCategoryId) {
      list = list.filter((p) => p.categoryId === selectedCategoryId);
    }
    if (searchValue.trim()) {
      const q = searchValue.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.description?.toLowerCase().includes(q) ?? false)
      );
    }
    return list;
  }, [selectedCategoryId, searchValue]);

  return (
    <Box maxW="480px" mx="auto" w="100%" minH="100dvh" pb={6}>
      <Flex direction="column" gap={4} p={4}>
        <SearchBar
          onProfileClick={onProfileClick}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          cartCount={totalCount}
        />

        <Flex gap={3} overflowX="auto" pb={2} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isSelected={selectedCategoryId === cat.id}
              onClick={() =>
                setSelectedCategoryId((prev) => (prev === cat.id ? null : cat.id))
              }
            />
          ))}
        </Flex>

        <Heading size="md" textAlign="left">
          Продукции
        </Heading>

        <SimpleGrid columns={2} gap={4}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>
      </Flex>
    </Box>
  );
};
