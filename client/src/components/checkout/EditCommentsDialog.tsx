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
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useCheckout } from '../../context/CheckoutContext';

interface EditCommentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditCommentsDialog: React.FC<EditCommentsDialogProps> = ({
  open,
  onOpenChange,
}) => {
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
