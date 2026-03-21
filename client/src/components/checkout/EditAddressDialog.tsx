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
  VStack,
} from '@chakra-ui/react';
import { useCheckout, type AddressData } from '../../context/CheckoutContext';

interface EditAddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditAddressDialog: React.FC<EditAddressDialogProps> = ({
  open,
  onOpenChange,
}) => {
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
                  onChange={(e) =>
                    setValue((v) => ({ ...v, district: e.target.value }))
                  }
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Улица, дом</Field.Label>
                <Input
                  placeholder="ул. Примерная, 1"
                  value={value.street}
                  onChange={(e) =>
                    setValue((v) => ({ ...v, street: e.target.value }))
                  }
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Квартира</Field.Label>
                <Input
                  placeholder="42"
                  value={value.apartment}
                  onChange={(e) =>
                    setValue((v) => ({ ...v, apartment: e.target.value }))
                  }
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Этаж</Field.Label>
                <Input
                  placeholder="5"
                  value={value.floor}
                  onChange={(e) =>
                    setValue((v) => ({ ...v, floor: e.target.value }))
                  }
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
