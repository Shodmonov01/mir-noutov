import React from 'react';
import { Flex, Heading, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { SearchBar, CategoryCard, PageLayout } from '../ui';
import { ProductCard, ProductDetailDrawer } from '../components/product';
import { useCart } from '../context/CartContext';
import { useCategories, useProducts } from '../hooks/useCatalog';
import type { Product } from '../dto/catalog';

const IconMutedWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Flex opacity={0.5} color="fg.muted" align="center" justify="center">
    {children}
  </Flex>
);

interface CatalogPageProps {
  onProfileClick: () => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ onProfileClick }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState('');
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [detailOpen, setDetailOpen] = React.useState(false);
  const { totalCount } = useCart();

  const { data: categories = [], isPending: categoriesPending } = useCategories();
  const { data: products = [], isPending: productsPending } = useProducts();
  const catalogPending = categoriesPending || productsPending;

  const handleProductClick = React.useCallback((product: Product) => {
    setSelectedProduct(product);
    setDetailOpen(true);
  }, []);

  const filteredProducts = React.useMemo(() => {
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
  }, [selectedCategoryId, searchValue, products]);

  const isEmpty = !catalogPending && filteredProducts.length === 0;

  return (
    <PageLayout>
      <Flex direction="column" gap={4} p={4}>
        <SearchBar
          onProfileClick={onProfileClick}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          cartCount={totalCount}
          onCartClick={() => navigate('/cart')}
        />

        <Flex gap={3} overflowX="auto" pb={2} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
          {catalogPending
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} w="categoryChip" h="categoryChip" borderRadius="md" flexShrink={0} />
              ))
            : categories.map((cat) => (
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

        {catalogPending ? (
          <SimpleGrid columns={2} gap={4}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} h={48} borderRadius="lg" />
            ))}
          </SimpleGrid>
        ) : isEmpty ? (
          <Flex
            direction="column"
            align="center"
            justify="center"
            py={12}
            gap={4}
            color="fg.muted"
          >
            <IconMutedWrap>
              <LuSearch size={48} />
            </IconMutedWrap>
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
