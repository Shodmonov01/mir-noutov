import React, { useCallback, useMemo, useState } from 'react';
import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import { SearchBar } from '../components/SearchBar';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailDrawer } from '../components/ProductDetailDrawer';
import { PageLayout } from '../components/PageLayout';
import { useCart } from '../context/CartContext';
import { categories, products } from '../api/mockData';
import type { Product } from '../api/mockData';

interface CatalogPageProps {
  onProfileClick: () => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ onProfileClick }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const { totalCount } = useCart();

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setDetailOpen(true);
  }, []);

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

  const isEmpty = filteredProducts.length === 0;

  return (
    <PageLayout>
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
          Продукты
        </Heading>

        {isEmpty ? (
          <Flex
            direction="column"
            align="center"
            justify="center"
            py={12}
            gap={4}
            color="fg.muted"
          >
            <LuSearch size={48} style={{ opacity: 0.5 }} />
            <Text fontSize="sm" textAlign="center">
              {searchValue.trim() || selectedCategoryId
                ? 'Ничего не найдено. Попробуйте изменить запрос или категорию.'
                : 'Нет товаров в этой категории.'}
            </Text>
          </Flex>
        ) : (
          <SimpleGrid columns={2} gap={4}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={handleProductClick}
              />
            ))}
          </SimpleGrid>
        )}
      </Flex>

      <ProductDetailDrawer
        product={selectedProduct}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </PageLayout>
  );
};
