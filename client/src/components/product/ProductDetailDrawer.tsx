import React from 'react';
import {
  Box,
  Button,
  CloseButton,
  DrawerBackdrop,
  Link,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerPositioner,
  DrawerRootProvider,
  DrawerTitle,
  Flex,
  Heading,
  Image,
  Text,
  useDrawer,
  VStack,
} from '@chakra-ui/react';
import { LuMapPin, LuPhone } from 'react-icons/lu';
import type { Product } from '../../dto/catalog';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../lib/formatPrice';
import { triggerHaptic } from '../../lib/telegram';
import { CartActions } from '../../ui';

interface ProductDetailDrawerProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductDetailDrawer: React.FC<ProductDetailDrawerProps> = ({
  product,
  open,
  onOpenChange,
}) => {
  const { addItem, setQuantity, getQuantity } = useCart();
  const drawer = useDrawer({
    open,
    onOpenChange: (e) => onOpenChange(e.open),
  });

  const qty = product ? getQuantity(product.id) : 0;

  const handleAdd = React.useCallback(() => {
    if (product) {
      addItem(product);
      triggerHaptic();
    }
  }, [addItem, product]);

  const handleDecrement = React.useCallback(() => {
    if (product) {
      setQuantity(product.id, qty - 1);
      triggerHaptic();
    }
  }, [setQuantity, product, qty]);

  const handleIncrement = React.useCallback(() => {
    if (product) {
      setQuantity(product.id, qty + 1);
      triggerHaptic();
    }
  }, [setQuantity, product, qty]);

  if (!product) return null;

  const priceStr = formatPrice(product.price, product.currency ?? 'UZS');

  return (
    <DrawerRootProvider value={drawer} placement="bottom">
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent maxH="90dvh">
          <DrawerHeader>
            <DrawerTitle>Товар</DrawerTitle>
            <DrawerCloseTrigger asChild>
              <CloseButton aria-label="Закрыть" size="sm" />
            </DrawerCloseTrigger>
          </DrawerHeader>
          <DrawerBody overflowY="auto" pb={6}>
            <VStack align="stretch" gap={4}>
              <Box
                position="relative"
                aspectRatio={1}
                maxH="drawerImageMax"
                mx="auto"
                w="100%"
                borderRadius="lg"
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

              <Box>
                <Flex gap={2} flexWrap="wrap" mb={2}>
                  {product.condition && (
                    <Box
                      px={2}
                      py={0.5}
                      borderRadius="md"
                      bg="blue.muted"
                      color="blue.fg"
                      fontSize="xs"
                      fontWeight="medium"
                    >
                      {product.condition}
                    </Box>
                  )}
                </Flex>
                <Heading size="md" mb={1}>
                  {product.title}
                </Heading>
                <Text fontSize="xl" fontWeight="semibold" color="blue.fg">
                  {priceStr}
                </Text>
              </Box>

              {product.description && (
                <Box>
                  <Text fontSize="sm" color="fg.muted" mb={1}>
                    Описание
                  </Text>
                  <Text fontSize="sm">{product.description}</Text>
                </Box>
              )}

              {product.specs && Object.keys(product.specs).length > 0 && (
                <Box>
                  <Text fontSize="sm" color="fg.muted" mb={2}>
                    Характеристики
                  </Text>
                  <VStack align="stretch" gap={1}>
                    {Object.entries(product.specs).map(([key, value]) => (
                      <Flex
                        key={key}
                        justify="space-between"
                        fontSize="sm"
                        py={1}
                        borderBottomWidth="1px"
                        borderColor="border"
                      >
                        <Text color="fg.muted" textTransform="capitalize">
                          {key}
                        </Text>
                        <Text fontWeight="medium">{value}</Text>
                      </Flex>
                    ))}
                  </VStack>
                </Box>
              )}

              {product.warranty && (
                <Box>
                  <Text fontSize="sm" color="fg.muted" mb={1}>
                    Гарантия
                  </Text>
                  <Text fontSize="sm">{product.warranty}</Text>
                </Box>
              )}

              {product.location && (
                <Flex align="center" gap={2} color="fg.muted" fontSize="sm">
                  <LuMapPin size={16} />
                  <Text>{product.location}</Text>
                </Flex>
              )}

              {product.contacts && product.contacts.length > 0 && (
                <Flex align="center" gap={2} flexWrap="wrap">
                  <Box color="fg.muted" lineHeight={0}>
                    <LuPhone size={16} />
                  </Box>
                  {product.contacts.map((c) => (
                    <Link key={c} href={`tel:${c}`} fontSize="sm" color="blue.fg">
                      {c}
                    </Link>
                  ))}
                </Flex>
              )}

              <Box pt={4} w="100%">
                {qty === 0 ? (
                  <Button
                    w="100%"
                    colorPalette="blue"
                    size="lg"
                    onClick={handleAdd}
                  >
                    Добавить в корзину
                  </Button>
                ) : (
                  <CartActions
                    quantity={qty}
                    onDecrement={handleDecrement}
                    onIncrement={handleIncrement}
                    size="lg"
                  />
                )}
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerPositioner>
    </DrawerRootProvider>
  );
};
