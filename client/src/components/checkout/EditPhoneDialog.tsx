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
import { useCheckout } from '../../context/CheckoutContext';

interface EditPhoneDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditPhoneDialog: React.FC<EditPhoneDialogProps> = ({
  open,
  onOpenChange,
}) => {
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
