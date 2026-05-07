import { request } from '../../../lib/api';
import type { BookingDraft } from '../../../lib/bookingDraft';

export type PaymentMethod = {
  id: string;
  name: string;
  type: string;
  last4?: string;
};

export type CreatePaymentPayload = {
  reservationId: string;
  bookingDraft: BookingDraft;
  method: PaymentMethod;
  amount: number;
  currency: string;
};

export type PaymentRecord = {
  id: string | number;
  reservationId?: string | number;
  amount: number;
  currency: string;
  status: string;
  method: PaymentMethod;
  createdAt?: string;
  reference?: string;
  paidAt?: string;
};

type CreatePaymentResponse = {
  ok: boolean;
  data: PaymentRecord;
};

export const paymentApi = {
  create: (payload: CreatePaymentPayload) =>
    request<CreatePaymentResponse>('/payments', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
