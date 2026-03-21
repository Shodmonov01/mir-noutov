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
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useCheckout, DELIVERY_OPTIONS } from '../../context/CheckoutContext';
import { formatPrice } from '../../lib/formatPrice';

interface EditDeliveryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditDeliveryDialog: React.FC<EditDeliveryDialogProps> = ({
  open,
  onOpenChange,
}) => {
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
                  <HStack justify="space-between" w="100%" gap={2}>
                    <Text as="span" textAlign="left">
                      {opt.name}
                    </Text>
                    {opt.price > 0 && (
                      <Text as="span" fontSize="sm" color="fg.muted">
                        {formatPrice(opt.price)}
                      </Text>
                    )}
                  </HStack>
                </Button>
              ))}
            </VStack>
          </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
};
