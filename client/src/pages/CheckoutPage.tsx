import React, { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  LuMapPin,
  LuMessageSquare,
  LuPhone,
  LuTruck,
  LuWallet,
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import { formatPrice } from '../lib/formatPrice';
import {
  EditPhoneDialog,
  EditAddressDialog,
  EditDeliveryDialog,
  EditPaymentDialog,
  EditCommentsDialog,
} from '../components/checkout/CheckoutEditDialogs';
import { getWebApp } from '../lib/telegram';

interface CheckoutRowProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  onClick?: () => void;
}

const CheckoutRow: React.FC<CheckoutRowProps> = ({
  icon,
  title,
  value,
  onClick,
}) => (
  <Flex
    align="center"
    gap={4}
    p={4}
    bg="bg.subtle"
    borderRadius="lg"
    cursor={onClick ? 'pointer' : 'default'}
    onClick={onClick}
    _hover={onClick ? { bg: 'bg.muted' } : undefined}
  >
    <Box color="fg.muted" flexShrink={0}>
      {icon}
    </Box>
    <Flex flex={1} direction="column" minW={0}>
      <Text fontSize="sm" color="fg.muted">
        {title}
      </Text>
      <Text fontWeight="medium" lineClamp={2}>
        {value}
      </Text>
    </Flex>
    {onClick && (
      <Text color="fg.muted" fontSize="lg">
        ›
      </Text>
    )}
  </Flex>
);

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const {
    phone,
    getAddressDisplay,
    getDeliveryOption,
    getPaymentOption,
    comments,
  } = useCheckout();

  const [dialogOpen, setDialogOpen] = useState<
    'phone' | 'address' | 'delivery' | 'payment' | 'comments' | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const productsSum = totalPrice;
  const deliveryOption = getDeliveryOption();
  const deliveryPrice = deliveryOption?.price ?? 0;
  const total = productsSum + deliveryPrice;

  const phoneDisplay = phone || 'Указать номер';
  const addressDisplay = getAddressDisplay();
  const deliveryDisplay = deliveryOption
    ? `${deliveryOption.name}${deliveryOption.price > 0 ? ` • ${formatPrice(deliveryOption.price)}` : ''}`
    : 'Выбрать';
  const paymentDisplay = getPaymentOption()?.name ?? 'Выбрать';
  const commentsDisplay = comments || 'Оставить комментарии';

  const isValid = useCallback(() => {
    if (!phone.trim()) return false;
    const addr = getAddressDisplay();
    if (!addr || addr === 'Указать адрес') return false;
    return true;
  }, [phone, getAddressDisplay]);

  const handleSubmit = useCallback(async () => {
    if (!isValid()) {
      const webApp = getWebApp();
      webApp?.showAlert?.('Заполните номер телефона и адрес доставки');
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      clearCart();
      const webApp = getWebApp();
      webApp?.showAlert?.('Заказ успешно оформлен!');
      navigate('/');
    } finally {
      setIsSubmitting(false);
    }
  }, [isValid, clearCart, navigate]);

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Box maxW="480px" mx="auto" w="100%" minH="100dvh" display="flex" flexDirection="column" pb={6}>
      <Box p={4} flex={1}>
        <Heading size="lg" textAlign="left" mb={4}>
          Оформление заказа
        </Heading>
        <VStack gap={3} align="stretch">
          <CheckoutRow
            icon={<LuPhone size={24} />}
            title="Номер телефона"
            value={phoneDisplay}
            onClick={() => setDialogOpen('phone')}
          />
          <CheckoutRow
            icon={<LuMapPin size={24} />}
            title="Адрес"
            value={addressDisplay}
            onClick={() => setDialogOpen('address')}
          />
          <CheckoutRow
            icon={<LuTruck size={24} />}
            title="Доставка"
            value={deliveryDisplay}
            onClick={() => setDialogOpen('delivery')}
          />
          <CheckoutRow
            icon={<LuWallet size={24} />}
            title="Оплата"
            value={paymentDisplay}
            onClick={() => setDialogOpen('payment')}
          />
          <CheckoutRow
            icon={<LuMessageSquare size={24} />}
            title="Комментарии"
            value={commentsDisplay}
            onClick={() => setDialogOpen('comments')}
          />
        </VStack>

        <VStack align="stretch" gap={2} mt={6} p={4} bg="bg.subtle" borderRadius="lg">
          <Flex justify="space-between">
            <Text color="fg.muted">Продукции</Text>
            <Text>{formatPrice(productsSum)}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text color="fg.muted">Доставка</Text>
            <Text>{formatPrice(deliveryPrice)}</Text>
          </Flex>
          <Text fontSize="sm" color="orange.500">
            Оплата доставки производится после получения заказа
          </Text>
          <Box borderTopWidth="1px" borderColor="border" w="100%" pt={3} mt={2}>
            <Flex justify="space-between" fontWeight="semibold" fontSize="lg">
              <Text>Итого</Text>
              <Text>{formatPrice(total)}</Text>
            </Flex>
          </Box>
        </VStack>
      </Box>

      <Box p={4} pt={0}>
        <Button
          colorPalette="blue"
          size="lg"
          w="100%"
          loading={isSubmitting}
          onClick={handleSubmit}
        >
          Завершить
        </Button>
      </Box>

      <EditPhoneDialog
        open={dialogOpen === 'phone'}
        onOpenChange={(o) => setDialogOpen(o ? 'phone' : null)}
      />
      <EditAddressDialog
        open={dialogOpen === 'address'}
        onOpenChange={(o) => setDialogOpen(o ? 'address' : null)}
      />
      <EditDeliveryDialog
        open={dialogOpen === 'delivery'}
        onOpenChange={(o) => setDialogOpen(o ? 'delivery' : null)}
      />
      <EditPaymentDialog
        open={dialogOpen === 'payment'}
        onOpenChange={(o) => setDialogOpen(o ? 'payment' : null)}
      />
      <EditCommentsDialog
        open={dialogOpen === 'comments'}
        onOpenChange={(o) => setDialogOpen(o ? 'comments' : null)}
      />
    </Box>
  );
};
