import React from 'react';
import {
  Button,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  Field,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import {
  useCheckout,
  DELIVERY_OPTIONS,
  PAYMENT_OPTIONS,
  type AddressData,
} from '../../context/CheckoutContext';
import { formatPrice } from '../../lib/formatPrice';

interface EditPhoneDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditPhoneDialog: React.FC<EditPhoneDialogProps> = ({ open, onOpenChange }) => {
  const { phone, setPhone } = useCheckout();
  const [value, setValue] = React.useState(phone);

  React.useEffect(() => {
    if (open) setValue(phone);
  }, [open, phone]);

  const handleSave = () => {
    setPhone(value);
    onOpenChange(false);
  };

  return (
    <DialogRoot open={open} onOpenChange={(e) => onOpenChange(e.open)}>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Номер телефона</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
          <VStack gap={4} align="stretch">
            <Field.Root>
              <Field.Label>Телефон</Field.Label>
              <Input
                type="tel"
                placeholder="+998 90 123 45 67"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </Field.Root>
            <Button colorPalette="blue" w="100%" onClick={handleSave}>
              Сохранить
            </Button>
          </VStack>
        </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
};

interface EditAddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditAddressDialog: React.FC<EditAddressDialogProps> = ({ open, onOpenChange }) => {
  const { address, setAddress } = useCheckout();
  const [value, setValue] = React.useState<AddressData>(address);

  React.useEffect(() => {
    if (open) setValue(address);
  }, [open, address]);

  const handleSave = () => {
    setAddress(value);
    onOpenChange(false);
  };

  return (
    <DialogRoot open={open} onOpenChange={(e) => onOpenChange(e.open)}>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Адрес доставки</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
          <VStack gap={4} align="stretch">
            <Field.Root>
              <Field.Label>Район</Field.Label>
              <Input
                placeholder="Mirzo Ulug'bek Tumani"
                value={value.district}
                onChange={(e) => setValue((v) => ({ ...v, district: e.target.value }))}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Улица, дом</Field.Label>
              <Input
                placeholder="ул. Примерная, 1"
                value={value.street}
                onChange={(e) => setValue((v) => ({ ...v, street: e.target.value }))}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Квартира</Field.Label>
              <Input
                placeholder="42"
                value={value.apartment}
                onChange={(e) => setValue((v) => ({ ...v, apartment: e.target.value }))}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Этаж</Field.Label>
              <Input
                placeholder="5"
                value={value.floor}
                onChange={(e) => setValue((v) => ({ ...v, floor: e.target.value }))}
              />
            </Field.Root>
            <Button colorPalette="blue" w="100%" onClick={handleSave}>
              Сохранить
            </Button>
          </VStack>
        </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
};

interface EditDeliveryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditDeliveryDialog: React.FC<EditDeliveryDialogProps> = ({ open, onOpenChange }) => {
  const { deliveryId, setDeliveryId } = useCheckout();

  const handleSelect = (id: string) => {
    setDeliveryId(id);
    onOpenChange(false);
  };

  return (
    <DialogRoot open={open} onOpenChange={(e) => onOpenChange(e.open)}>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Способ доставки</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
          <VStack gap={2} align="stretch">
            {DELIVERY_OPTIONS.map((opt) => (
              <Button
                key={opt.id}
                variant={deliveryId === opt.id ? 'solid' : 'outline'}
                colorPalette={deliveryId === opt.id ? 'blue' : 'gray'}
                justifyContent="space-between"
                onClick={() => handleSelect(opt.id)}
              >
                <span>{opt.name}</span>
                {opt.price > 0 && (
                  <span style={{ fontSize: '0.875rem' }}>{formatPrice(opt.price)}</span>
                )}
              </Button>
            ))}
          </VStack>
        </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
};

interface EditPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditPaymentDialog: React.FC<EditPaymentDialogProps> = ({ open, onOpenChange }) => {
  const { paymentId, setPaymentId } = useCheckout();

  const handleSelect = (id: string) => {
    setPaymentId(id);
    onOpenChange(false);
  };

  return (
    <DialogRoot open={open} onOpenChange={(e) => onOpenChange(e.open)}>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Способ оплаты</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
          <VStack gap={2} align="stretch">
            {PAYMENT_OPTIONS.map((opt) => (
              <Button
                key={opt.id}
                variant={paymentId === opt.id ? 'solid' : 'outline'}
                colorPalette={paymentId === opt.id ? 'blue' : 'gray'}
                justifyContent="flex-start"
                onClick={() => handleSelect(opt.id)}
              >
                {opt.name}
              </Button>
            ))}
          </VStack>
        </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
};

interface EditCommentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditCommentsDialog: React.FC<EditCommentsDialogProps> = ({ open, onOpenChange }) => {
  const { comments, setComments } = useCheckout();
  const [value, setValue] = React.useState(comments);

  React.useEffect(() => {
    if (open) setValue(comments);
  }, [open, comments]);

  const handleSave = () => {
    setComments(value);
    onOpenChange(false);
  };

  return (
    <DialogRoot open={open} onOpenChange={(e) => onOpenChange(e.open)}>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Комментарий к заказу</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
          <VStack gap={4} align="stretch">
            <Field.Root>
              <Field.Label>Комментарий</Field.Label>
              <Textarea
                placeholder="Оставить комментарий к заказу"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={4}
              />
            </Field.Root>
            <Button colorPalette="blue" w="100%" onClick={handleSave}>
              Сохранить
            </Button>
          </VStack>
        </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
};
