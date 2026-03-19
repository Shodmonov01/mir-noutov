import React, { createContext, useCallback, useContext, useState } from 'react';

export interface DeliveryOption {
  id: string;
  name: string;
  price: number;
}

export interface PaymentOption {
  id: string;
  name: string;
}

export interface AddressData {
  district: string;
  street: string;
  apartment: string;
  floor: string;
}

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  { id: 'courier', name: 'Доставка курьером', price: 30000 },
  { id: 'pickup', name: 'Самовывоз', price: 0 },
];

export const PAYMENT_OPTIONS: PaymentOption[] = [
  { id: 'payme', name: 'PayMe' },
  { id: 'cash', name: 'Наличные' },
];

interface CheckoutContextValue {
  phone: string;
  setPhone: (v: string) => void;
  address: AddressData;
  setAddress: (v: Partial<AddressData>) => void;
  deliveryId: string;
  setDeliveryId: (v: string) => void;
  paymentId: string;
  setPaymentId: (v: string) => void;
  comments: string;
  setComments: (v: string) => void;
  getDeliveryOption: () => DeliveryOption | undefined;
  getPaymentOption: () => PaymentOption | undefined;
  getAddressDisplay: () => string;
}

const defaultAddress: AddressData = {
  district: '',
  street: '',
  apartment: '',
  floor: '',
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [phone, setPhoneState] = useState('');
  const [address, setAddressState] = useState<AddressData>(defaultAddress);
  const [deliveryId, setDeliveryIdState] = useState<string>(DELIVERY_OPTIONS[0]?.id ?? '');
  const [paymentId, setPaymentIdState] = useState<string>(PAYMENT_OPTIONS[0]?.id ?? '');
  const [comments, setCommentsState] = useState('');

  const setPhone = useCallback((v: string) => setPhoneState(v), []);
  const setDeliveryId = useCallback((v: string) => setDeliveryIdState(v), []);
  const setPaymentId = useCallback((v: string) => setPaymentIdState(v), []);
  const setComments = useCallback((v: string) => setCommentsState(v), []);

  const setAddress = useCallback((v: Partial<AddressData>) => {
    setAddressState((prev) => ({ ...prev, ...v }));
  }, []);

  const getDeliveryOption = useCallback(
    () => DELIVERY_OPTIONS.find((o) => o.id === deliveryId),
    [deliveryId]
  );

  const getPaymentOption = useCallback(
    () => PAYMENT_OPTIONS.find((o) => o.id === paymentId),
    [paymentId]
  );

  const getAddressDisplay = useCallback(() => {
    const parts = [address.district, address.street, address.apartment, address.floor].filter(
      Boolean
    );
    if (parts.length === 0) return 'Указать адрес';
    return parts.join(', ');
  }, [address]);

  const value: CheckoutContextValue = {
    phone,
    setPhone,
    address,
    setAddress,
    deliveryId,
    setDeliveryId,
    paymentId,
    setPaymentId,
    comments,
    setComments,
    getDeliveryOption,
    getPaymentOption,
    getAddressDisplay,
  };

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
};

export function useCheckout(): CheckoutContextValue {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckout must be used within CheckoutProvider');
  return ctx;
}
