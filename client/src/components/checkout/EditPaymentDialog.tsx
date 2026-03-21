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
  VStack,
} from '@chakra-ui/react';
import { useCheckout, PAYMENT_OPTIONS } from '../../context/CheckoutContext';

interface EditPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditPaymentDialog: React.FC<EditPaymentDialogProps> = ({
  open,
  onOpenChange,
}) => {
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
