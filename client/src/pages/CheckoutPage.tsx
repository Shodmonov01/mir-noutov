import React from 'react';
import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  LuMapPin,
  LuMessageSquare,
  LuPhone,
  LuTruck,
  LuWallet,
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { catalogKeys } from '../api/queryKeys';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import { formatPrice } from '../lib/formatPrice';
import { addNotification } from '../lib/notifications';
import { getWebApp } from '../lib/telegram';
import { PageLayout, CheckoutRow } from '../ui';
import {
  EditPhoneDialog,
  EditAddressDialog,
  EditDeliveryDialog,
  EditPaymentDialog,
  EditCommentsDialog,
} from '../components/checkout';
import { CheckoutSummary } from '../components/checkout/CheckoutSummary';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { items, totalPrice, clearCart } = useCart();
  const {
    phone,
    getAddressDisplay,
    getDeliveryOption,
    getPaymentOption,
    comments,
  } = useCheckout();

  const [dialogOpen, setDialogOpen] = React.useState<
    'phone' | 'address' | 'delivery' | 'payment' | 'comments' | null
  >(null);
  const [validationError, setValidationError] = React.useState(false);

  const phoneInvalid = !phone.trim();
  const addressInvalid =
    !getAddressDisplay() || getAddressDisplay() === 'Указать адрес';

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
  const commentsDisplay = comments || 'Оставить комментарий';

  const isValid = React.useCallback(() => {
    if (!phone.trim()) return false;
    const addr = getAddressDisplay();
    if (!addr || addr === 'Указать адрес') return false;
    return true;
  }, [phone, getAddressDisplay]);

  const { mutate: submitOrder, isPending: isSubmitting } = useMutation({
    mutationFn: async () => {
      await new Promise((r) => setTimeout(r, 800));
    },
    onSuccess: () => {
      clearCart();
      void queryClient.invalidateQueries({ queryKey: catalogKeys.all });
      addNotification({ title: 'Заказ успешно оформлен!' });
      navigate('/');
    },
  });

  const handleSubmit = React.useCallback(() => {
    if (!isValid()) {
      setValidationError(true);
      const webApp = getWebApp();
      webApp?.showAlert?.('Заполните номер телефона и адрес доставки');
      return;
    }
    setValidationError(false);
    submitOrder();
  }, [isValid, submitOrder]);

  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items.length, navigate]);

  React.useEffect(() => {
    if (validationError && isValid()) {
      setValidationError(false);
    }
  }, [validationError, isValid]);

  if (items.length === 0) {
    return null;
  }

  return (
    <PageLayout pb={0} flexContent>
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
            hasError={validationError && phoneInvalid}
          />
          <CheckoutRow
            icon={<LuMapPin size={24} />}
            title="Адрес"
            value={addressDisplay}
            onClick={() => setDialogOpen('address')}
            hasError={validationError && addressInvalid}
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

        <CheckoutSummary
          productsSum={productsSum}
          deliveryPrice={deliveryPrice}
          total={total}
        />
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
    </PageLayout>
  );
};
